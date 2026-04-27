import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>&copy; {new Date().getFullYear()} Eco News & Action Hub. Empowering a greener future.</p>
        <div className="footer-social">
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-github"></i></a>
        </div>
      </div>
    </footer>
  );
}
