import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom" style={{ background: "#2C3E50" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/">My-Duka</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link className="nav-link text-white fw-bold" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" to="/sales">Sales</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" to="/payments">Payments</Link></li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item mx-1">
                  <Link
                    to="/login"
                    className="btn fw-bold"
                    style={{
                      background: "linear-gradient(135deg, #1ABC9C, #16A085)",
                      color: "white",
                      borderRadius: "10px",
                      padding: "6px 15px",
                      fontSize: "1rem",
                    }}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  <Link
                    to="/register"
                    className="btn fw-bold"
                    style={{
                      background: "linear-gradient(135deg, #F39C12, #E67E22)",
                      color: "white",
                      borderRadius: "10px",
                      padding: "6px 15px",
                      fontSize: "1rem",
                    }}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn fw-bold"
                  style={{
                    background: "linear-gradient(135deg, #E74C3C, #C0392B)",
                    color: "white",
                    borderRadius: "10px",
                    padding: "6px 15px",
                    fontSize: "1rem",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
