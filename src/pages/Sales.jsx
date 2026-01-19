import { useState, useEffect, useCallback } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Sales() {
  const token = localStorage.getItem("access_token");
  const BACKEND_URL = "https://api.mydukaapp.co.ke";

  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [saleMessage, setSaleMessage] = useState("");

  const [selectedSale, setSelectedSale] = useState(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [transactionNumber, setTransactionNumber] = useState("");
  const [payMessage, setPayMessage] = useState("");
  const [payProcessing, setPayProcessing] = useState(false);

  /* ---------------- LOAD PRODUCTS ---------------- */
  useEffect(() => {
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
      .catch(console.error);
  }, [token]);

  /* ---------------- LOAD SALES ---------------- */
  const loadSales = useCallback(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/sales`, {
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
      .then(setSales)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    loadSales();
  }, [loadSales]);

  /* ---------------- DATATABLE ---------------- */
  useEffect(() => {
    if (sales.length > 0) {
      if ($.fn.DataTable.isDataTable("#salesTable")) {
        $("#salesTable").DataTable().destroy();
      }
      requestAnimationFrame(() => {
        $("#salesTable").DataTable({
          pageLength: 10,
          scrollY: "400px",
          scrollCollapse: true,
          fixedHeader: true,
        });
      });
    }
  }, [sales]);

  /* ---------------- ADD SALE ---------------- */
  const handleAddSale = (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    fetch(`${BACKEND_URL}/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pid: selectedProduct, quantity: Number(quantity) }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Request failed: ${res.status}, ${text}`);
        }
        return res.json();
      })
      .then(() => {
        setShowSaleModal(false);
        setSelectedProduct("");
        setQuantity("");
        setSaleMessage("Sale recorded successfully.");
        loadSales();
        setTimeout(() => setSaleMessage(""), 4000);
      })
      .catch((err) => {
        console.error(err);
        setSaleMessage(`Error: ${err.message}`);
      });
  };

  /* ---------------- M-PESA PAYMENT ---------------- */
  const handleMpesaPayment = async () => {
    if (!selectedSale) return;
    setPayProcessing(true);
    setPayMessage("Processing payment...");

    try {
      let phone = transactionNumber.trim().replace(/\D/g, "");
      if (phone.startsWith("0")) phone = "254" + phone.slice(1);
      else if (phone.startsWith("7")) phone = "254" + phone;
      else if (phone.startsWith("+254")) phone = phone.slice(1);
      else if (!phone.startsWith("254")) phone = "254" + phone;

      const res = await fetch(`${BACKEND_URL}/mpesa/stkpush`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: selectedSale.amount,
          phone_number: phone,
          sale_id: selectedSale.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPayMessage(data.detail || data.error || "Payment initiation failed");
        setPayProcessing(false);
        return;
      }

      setPayMessage("Payment initiated. Complete it on your phone.");

      const interval = setInterval(async () => {
        try {
          const checkRes = await fetch(
            `${BACKEND_URL}/mpesa/checker/${selectedSale.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const checkData = await checkRes.json();

          if (checkData.trans_code) {
            setSales((prevSales) =>
              prevSales.map((s) =>
                s.id === selectedSale.id ? { ...s, ...checkData } : s
              )
            );

            setShowPayModal(false);
            setSelectedSale(null);
            setTransactionNumber("");
            setPayProcessing(false);
            setPayMessage("");

            clearInterval(interval);
          }
        } catch (err) {
          console.error("Error checking payment:", err);
        }
      }, 5000);
    } catch (err) {
      console.error(err);
      setPayMessage("Payment failed");
      setPayProcessing(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading sales...</p>;

  const navbarColor = "#2C3E50"; // updated color
  const buttonColor = navbarColor;

  return (
    <div className="SalesPage d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container flex-grow-1 mt-4">
        {saleMessage && (
          <div className="alert alert-success">{saleMessage}</div>
        )}

        {/* ADD SALE BUTTON */}
        <button
          className="btn mb-3"
          style={{
            backgroundColor: buttonColor,
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
          onClick={() => setShowSaleModal(true)}
        >
          + Add Sale
        </button>

        {/* ADD SALE MODAL */}
        {showSaleModal && (
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
                <h5 className="modal-title">Add Sale</h5>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => setShowSaleModal(false)}
                >
                  X
                </button>
              </div>

              <form onSubmit={handleAddSale}>
                <select
                  className="form-select mb-2"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  required
                >
                  <option value="">Select product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  className="form-control mb-3"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-light me-2"
                    onClick={() => setShowSaleModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#fff",
                      color: navbarColor,
                      fontWeight: "bold",
                    }}
                  >
                    Save Sale
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SALES TABLE */}
        <div className="table-responsive">
          <table
            id="salesTable"
            className="table table-bordered table-striped"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Date</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.product_name}</td>
                  <td>{s.quantity}</td>
                  <td>{s.amount ?? "Pending"}</td>
                  <td>{new Date(s.created_at).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: buttonColor,
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "6px",
                      }}
                      onClick={() => {
                        setSelectedSale(s);
                        setShowPayModal(true);
                      }}
                    >
                      Pay Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAY NOW MODAL */}
        {showPayModal && selectedSale && (
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
                <h5 className="modal-title">Pay Sale #{selectedSale.id}</h5>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => setShowPayModal(false)}
                >
                  X
                </button>
              </div>

              <p>Amount: {selectedSale.amount ?? "Pending"}</p>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Phone Number"
                value={transactionNumber}
                onChange={(e) => setTransactionNumber(e.target.value)}
              />
              {payMessage && (
                <p className="text-success mt-2">{payMessage}</p>
              )}

              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-light me-2"
                  onClick={() => setShowPayModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#fff",
                    color: navbarColor,
                    fontWeight: "bold",
                  }}
                  onClick={handleMpesaPayment}
                  disabled={payProcessing}
                >
                  {payProcessing ? "Processing..." : "Pay via M-Pesa"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Sales;
