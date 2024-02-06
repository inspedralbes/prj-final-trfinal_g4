import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { io } from "socket.io-client";
import './App.css';

const Layout = () => {
    useEffect(() => {
        const socket = io('http://localhost:5176');

        socket.emit('connection');

        return () => {
            socket.disconnect();
        };
    }, []);

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
