function Footer() {
  return (
    <footer
      className="footer mt-auto py-3"
      style={{
        background: "#2C3E50",
        color: "white",
        textAlign: "center",
      }}
    >
      <div className="container">
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} My-Duka. All rights reserved.
        </p>
        <div className="footer-links mt-1">
          <a
            href="/about"
            style={{ color: "#1ABC9C", margin: "0 8px", textDecoration: "none" }}
          >
            About
          </a>
          |
          <a
            href="/contact"
            style={{ color: "#F39C12", margin: "0 8px", textDecoration: "none" }}
          >
            Contact
          </a>
          |
          <a
            href="/privacy"
            style={{ color: "#E74C3C", margin: "0 8px", textDecoration: "none" }}
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
