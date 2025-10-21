import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axiosConfig';
import { CartContext } from '../CartContext';
import { toast } from 'react-toastify';

function CheckoutShipping() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    API.get('/main/model/payment-methods/')
      .then(res => mounted && setPaymentMethods(res.data))
      .catch(() => {})
    return () => (mounted = false);
  }, []);

  const handleSubmit = async () => {
    if (cartItems.length === 0) return toast.error('No hay items en el carrito');
    const shipping_address = `${street || ''} ${number || ''}`.trim() + (city ? `, ${city}` : '') + (province ? `, ${province}` : '') + (postalCode ? `, CP ${postalCode}` : '');
    const payload = {
      items: cartItems.map(it => ({ product_id: it.productId || it.id, qty: it.qty })),
      shipping_address,
      payment_method_id: selectedPayment,
    };
    try {
      setLoading(true);
      const { data } = await API.post('/main/model/checkout/', payload);
      toast.success('Orden creada correctamente');
      // Esperar a que el carrito se vacíe en el servidor y estado local
      try {
        await clearCart();
      } catch (e) {
        // Si falló limpiar el carrito localmente, igual seguimos
        console.warn('clearCart failed', e);
      }
      navigate(`/order/confirmation/${data.order_id}`);
    } catch (err) {
      console.error('checkout err', err);
      toast.error(err?.response?.data?.detail || 'No se pudo procesar la orden');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Confirmar envío y pago</h2>

      <div className="row">
        <div className="col-md-6">
          <h5>Dirección de envío</h5>
          <div className="mb-2"><input className="form-control" placeholder="Calle" value={street} onChange={(e) => setStreet(e.target.value)} /></div>
          <div className="mb-2"><input className="form-control" placeholder="Nro" value={number} onChange={(e) => setNumber(e.target.value)} /></div>
          <div className="mb-2"><input className="form-control" placeholder="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} /></div>
          <div className="mb-2"><input className="form-control" placeholder="Provincia" value={province} onChange={(e) => setProvince(e.target.value)} /></div>
          <div className="mb-2"><input className="form-control" placeholder="C.P." value={postalCode} onChange={(e) => setPostalCode(e.target.value)} /></div>
        </div>

        <div className="col-md-6">
          <h5>Método de pago</h5>
          {paymentMethods.length === 0 ? (
            <div className="d-flex gap-2">
              <button className={`btn ${selectedPayment === 'mercadopago' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setSelectedPayment('mercadopago')}>MercadoPago</button>
              <button className={`btn ${selectedPayment === 'debito' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setSelectedPayment('debito')}>Débito</button>
              <button className={`btn ${selectedPayment === 'credito' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setSelectedPayment('credito')}>Crédito</button>
            </div>
          ) : (
            <select className="form-select" value={selectedPayment || ''} onChange={(e) => setSelectedPayment(e.target.value)}>
              <option value=''>Seleccionar</option>
              {paymentMethods.map(pm => (<option key={pm.id} value={pm.id}>{pm.name}</option>))}
            </select>
          )}

          <div className="mt-4">
            <button className="btn btn-success" disabled={loading} onClick={handleSubmit}>{loading ? 'Procesando...' : 'Pagar y crear orden'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutShipping;
