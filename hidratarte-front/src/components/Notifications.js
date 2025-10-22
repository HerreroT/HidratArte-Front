import { useEffect, useState } from "react";
import API from "../axiosConfig";
import { toast } from "react-toastify";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadNotifications = async (controller) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get("/main/model/notifications/", { signal: controller?.signal });
      const list = Array.isArray(data) ? data : (data?.results ?? []);
      setNotifications(list);
    } catch (e) {
      if (e?.name === 'CanceledError') return;
      console.error(e);
      setError("No se pudieron cargar las notificaciones");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    const controller = new AbortController();
    loadNotifications(controller);
  };

  const markAllAsRead = async () => {
    try {
      // Intentar endpoint real si existiera
      await API.post("/main/model/notifications/mark-all-read/");
      toast.success("Notificaciones marcadas como leídas");
      window.dispatchEvent(new Event('notifications:updated'));
      const controller = new AbortController();
      await loadNotifications(controller);
    } catch (e) {
      // Fallback local: si no hay endpoint, simular `read=true` localmente
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      window.dispatchEvent(new Event('notifications:updated'));
      toast.info("Marcado local: implementar endpoint mark-all-read en backend");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadNotifications(controller);
    return () => controller.abort();
  }, []);

  const hasItems = notifications.length > 0;
  const unreadCount = notifications.filter((n) => n && n.read === false).length;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Notificaciones</h3>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={handleRetry} disabled={loading}>
            {loading ? 'Cargando...' : 'Reintentar'}
          </button>
          {hasItems && (
            <button className="btn btn-primary btn-sm" onClick={markAllAsRead}>
              Marcar todas como leídas
              {unreadCount > 0 ? ` (${unreadCount})` : ''}
            </button>
          )}
        </div>
      </div>

      {loading && <p className="text-muted">Cargando...</p>}
      {error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>{error}</span>
          <button className="btn btn-sm btn-light" onClick={handleRetry}>Reintentar</button>
        </div>
      )}

      {!loading && !error && !hasItems && (
        <div className="text-center text-muted py-5">No tenés notificaciones por ahora</div>
      )}

      {!loading && !error && hasItems && (
        <ul className="list-group">
          {notifications.map((n) => (
            <li key={n.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{n.message}</span>
              {typeof n.read === 'boolean' && (
                <span className={`badge bg-${n.read ? 'secondary' : 'warning'}`}>{n.read ? 'leída' : 'nueva'}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
