import { useState, useEffect, useCallback } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Products() {
  const token = localStorage.getItem("access_token");
  const BACKEND_URL = "http://localhost:8000";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [message, setMessage] = useState("");

  const loadProducts = useCallback(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
          }
          const text = await res.text();
          throw new Error(`Request failed: ${res.status}, ${text}`);
        }
        return res.json();
      })
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // -------- DATATABLE FIX --------
  useEffect(() => {
    if (products.length > 0) {
      // Destroy existing DataTable if initialized
      if ($.fn.DataTable.isDataTable("#productsTable")) {
        $("#productsTable").DataTable().destroy();
      }
      // Re-initialize
      requestAnimationFrame(() => {
        $("#productsTable").DataTable({
          pageLength: 10,
          scrollY: "400px",
          scrollCollapse: true,
          fixedHeader: true,
        });
      });
    }
  }, [products]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !buyingPrice || !sellingPrice) return;

    try {
      const res = await fetch(`${BACKEND_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          buying_price: parseFloat(buyingPrice),
          selling_price: parseFloat(sellingPrice),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to add product");
      }

      setName("");
      setBuyingPrice("");
      setSellingPrice("");
      setShowModal(false);
      setMessage("Product added successfully");
      loadProducts();
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      console.error(err);
      setMessage(`Error: ${err.message}`);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading products...</p>;

  const navbarColor = "#2C3E50";

  return (
    <div className="ProductsPage d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container flex-grow-1 mt-4">
        {message && <div className="alert alert-success">{message}</div>}

        <button
          className="btn mb-3"
          style={{ backgroundColor: navbarColor, color: "#fff", fontWeight: "bold", borderRadius: "8px" }}
          onClick={() => setShowModal(true)}
        >
          + Add Product
        </button>

        {/* ADD PRODUCT MODAL */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1050,
            }}
          >
            <div
              style={{
                background: navbarColor,
                padding: "20px",
                borderRadius: "16px",
                width: "400px",
                color: "#fff",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="modal-title">Add Product</h5>
                <button className="btn btn-light btn-sm" onClick={() => setShowModal(false)}>
                  X
                </button>
              </div>

              <form onSubmit={handleAddProduct}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Buying Price"
                  value={buyingPrice}
                  onChange={(e) => setBuyingPrice(e.target.value)}
                  required
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Selling Price"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  required
                />

                <div className="d-flex justify-content-end">
                  <button className="btn btn-light me-2" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#fff", color: navbarColor, fontWeight: "bold" }}
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PRODUCTS TABLE */}
        <div className="table-responsive">
          <table id="productsTable" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Buying Price</th>
                <th>Selling Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.buying_price}</td>
                  <td>{p.selling_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
