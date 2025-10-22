// src/hooks/useNotificationsCounter.js
import { useCallback, useEffect, useRef, useState } from "react";
import API from "../axiosConfig";

// Polls notifications and returns an unread count.
// If the backend does not provide a `read` field, the count will be 0 and the badge will be hidden.
export default function useNotificationsCounter(enabled = true) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  const fetchCount = useCallback(async (signal) => {
    if (!enabled) return;
    try {
      setLoading(true);
      setError(null);
      const { data } = await API.get("/main/model/notifications/", { signal });
      const list = Array.isArray(data) ? data : (data?.results ?? []);

      let unread = 0;
      if (list.length > 0) {
        const hasRead = Object.prototype.hasOwnProperty.call(list[0], "read");
        if (hasRead) {
          unread = list.filter((n) => n && n.read === false).length;
        } else {
          // Backend no soporta `read` todavía => ocultar badge
          unread = 0;
        }
      }
      setCount(unread);
    } catch (err) {
      // axios abort uses name 'CanceledError'
      if (err?.name === "CanceledError") return;
      setError("No se pudo obtener notificaciones");
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const refresh = useCallback(() => {
    const controller = new AbortController();
    fetchCount(controller.signal);
    return () => controller.abort();
  }, [fetchCount]);

  useEffect(() => {
    if (!enabled) return;
    const abort = refresh();

    // Poll cada ~75s
    timerRef.current = setInterval(() => {
      refresh();
    }, 75000);

    // Actualizar al volver a la pestaña
    const onVis = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVis);

    // Escuchar eventos globales para refrescar inmediatamente
    const onUpdated = () => refresh();
    window.addEventListener("notifications:updated", onUpdated);

    return () => {
      abort?.();
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("notifications:updated", onUpdated);
    };
  }, [enabled, refresh]);

  return { count, loading, error, refresh };
}

