import { Outlet, Link } from "react-router-dom";
import './App.css';

const Layout = () => {
    return (
        <div>
            <h1 className="titol">CHROMATIC BOND</h1>
            <header>
                <nav>
                    <ul className="button-container">
                        <a href="/login" className="login">
                            <button>Login</button>
                        </a>
                        <a href="/register" className="register">
                            <button>Register</button>
                        </a>
                        <a href="/hi">
                            <button>Hi</button>
                        </a>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </div>
    )
};

export { Layout };