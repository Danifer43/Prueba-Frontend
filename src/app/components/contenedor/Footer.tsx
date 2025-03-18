import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import "../../../assets/css/Footer.css";

// Importar íconos de FontAwesome
import "@fortawesome/fontawesome-free/css/all.min.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Columna 1: Logo y Redes Sociales */}
                    <div className="footer-column">
                        <img src={logo} alt="Logo" className="logo-footer" />
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                    {/* Columna 2: Enlaces de navegación */}
                    <div className="footer-column">
                        <h3>Navegación</h3>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/services">Servicios</Link></li>
                            <li><Link to="/products">Productos</Link></li>
                            <li><Link to="/about">Nosotros</Link></li>
                            <li><Link to="/contact">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Columna 3: Información de contacto */}
                    <div className="footer-column">
                        <h3>Contacto</h3>
                        <p><i className="fas fa-map-marker-alt"></i> Calle Ejemplo #123, Ciudad</p>
                        <p><i className="fas fa-phone"></i> +123 456 7890</p>
                        <p><i className="fas fa-envelope"></i> contacto@empresa.com</p>
                    </div>

                </div>

                {/* Copyright */}
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Empresa. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};
