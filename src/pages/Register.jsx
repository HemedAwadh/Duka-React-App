import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BACKEND_URL = "http://localhost:8000";

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Simple frontend validation
    if (!fullName || !email || !password) {
      setMessage("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // FastAPI sends detail in case of error
        throw new Error(data.detail || "Registration failed");
      }

      // Save token in localStorage
      localStorage.setItem("access_token", data.access_token);

      // Redirect to products page
      navigate("/products");
    } catch (err) {
      console.error("Registration error:", err);
      setMessage(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <form onSubmit={handleRegister} className="card p-4 shadow-sm">
            <h3 className="mb-4 text-center">Register</h3>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {message && (
              <div className="mt-3 text-center text-danger">{message}</div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
