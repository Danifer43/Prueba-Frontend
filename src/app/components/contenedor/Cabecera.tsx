import logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";
import "../../../assets/css/Cabecera.css"; 

export const Cabecera = () => {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" className="logo" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/services">Servicios</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown">
                                Productos
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/list">Listar</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/admin">Administrar</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="navbar-right">
                        <Link className="btn-login" to="/signin">Contacto</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
