// src/admin/AdminProducts.js
import { useEffect, useState } from "react";
import API from "../axiosConfig";

const endpoint = "/main/model/products/";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "agua",
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  // edición rápida de stock
  const [stockId, setStockId] = useState(null);
  const [stockValue, setStockValue] = useState(0);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get(endpoint);
      const list = Array.isArray(data) ? data : data?.results ?? [];
      setProducts(list);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
        category: form.category,
      };
      if (Number.isNaN(payload.price) || Number.isNaN(payload.stock)) {
        alert("Revisá precio/stock.");
        return;
      }

      if (editingId) {
        await API.put(`${endpoint}${editingId}/`, payload);
      } else {
        await API.post(endpoint, payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch (e) {
      console.error(e);
      alert("No se pudo guardar el producto");
    }
  };

  const edit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name ?? "",
      description: p.description ?? "",
      price: p.price ?? "",
      stock: p.stock ?? "",
      category: p.category ?? "agua",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const del = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    try {
      await API.delete(`${endpoint}${id}/`);
      await load();
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar");
    }
  };

  const applyStock = async (id) => {
    const value = parseInt(stockValue, 10);
    if (Number.isNaN(value)) return alert("Stock inválido");
    try {
      await API.post(`${endpoint}${id}/set-stock/`, { stock: value });
      setStockId(null);
      await load();
    } catch (e) {
      console.error(e);
      alert("No se pudo actualizar el stock");
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-3">Productos</h3>

      {/* Formulario */}
      <form className="border rounded p-3 mb-4" onSubmit={submit}>
        <div className="row g-2">
          <div className="col-md-3">
            <input
              className="form-control"
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              name="description"
              placeholder="Descripción"
              value={form.description}
              onChange={onChange}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Precio"
              value={form.price}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              name="category"
              value={form.category}
              onChange={onChange}
            >
              <option value="agua">Agua</option>
              <option value="jugo">Jugo</option>
              <option value="gaseosa">Gaseosa</option>
              <option value="alcohol">Alcohol</option>
            </select>
          </div>
          <div className="col-md-1">
            <input
              className="form-control"
              name="stock"
              type="number"
              min="0"
              step="1"
              placeholder="Stock"
              value={form.stock}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-md-12 col-lg-1 d-grid">
            <button className="btn btn-primary" type="submit">
              {editingId ? "Guardar" : "Crear"}
            </button>
          </div>
        </div>
      </form>

      {loading && <p className="text-muted">Cargando...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>${Number(p.price).toFixed(2)}</td>

                {/* Categoría visible */}
                <td>{p.category}</td>

                {/* Stock con editor inline */}
                <td>
                  {stockId === p.id ? (
                    <div className="input-group input-group-sm" style={{ maxWidth: 180 }}>
                      <input
                        type="number"
                        className="form-control"
                        value={stockValue}
                        onChange={(e) => setStockValue(e.target.value)}
                      />
                      <button
                        className="btn btn-success"
                        onClick={() => applyStock(p.id)}
                        type="button"
                      >
                        OK
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => setStockId(null)}
                        type="button"
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="me-2">{p.stock}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          setStockId(p.id);
                          setStockValue(p.stock ?? 0);
                        }}
                        type="button"
                      >
                        Editar
                      </button>
                    </>
                  )}
                </td>

                {/* Acciones */}
                <td>
                  <div className="btn-group btn-group-sm">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => edit(p)}
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => del(p.id)}
                      type="button"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!loading && products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  Sin productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;




