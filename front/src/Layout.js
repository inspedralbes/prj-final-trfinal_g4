//ENCABEZADO DE LA PÁGINA (HEADER)

import { useEffect } from "react";
import { Outlet} from "react-router-dom";
import { Landing } from "./componentes/Landing";
import { io } from "socket.io-client";
import './App.css';

const Layout = () => {

    let mostrarLanding;

    if (localStorage.getItem('mostrarLanding') === true) {
        mostrarLanding = true;
        }else{
            mostrarLanding = false;
        }

    useEffect(() => {
        const socket = io('http://localhost:3727');

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
                        <a href="/login" onClick={localStorage.setItem("mostrarLanding", false)} className="login">
                            <button>Login</button>
                        </a>
                        <a href="/register" onClick={localStorage.setItem("mostrarLanding", false)} className="register">
                            <button>Register</button>
                        </a>
                        {/* <a href="/hi" onClick={localStorage.setItem("mostrarLanding", false)}>
                            <button>Chat</button>
                        </a> */}
                    </ul>
                </nav>
            </header>
            {mostrarLanding ? (
                <Landing/>
                ): (
                <Outlet />
                )}
        </div>
    )
};

export { Layout };
