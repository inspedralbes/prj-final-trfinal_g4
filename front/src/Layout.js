import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Landing } from "./componentes/Landing";
import { io } from "socket.io-client";
import './App.css';

const Layout = () => {

    let mostrarLanding;
    
    if(localStorage.getItem("mostrarLanding")==true){
        mostrarLanding = true;
    } else {
        mostrarLanding = false; 
    }
    
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
                        <a href="/login" className="login" onClick={localStorage.setItem("mostrarLanding", false)}>
                            <button >Login</button>
                        </a>
                        <a href="/register" className="register" onClick={localStorage.setItem("mostrarLanding", false)}>
                            <button>Register</button>
                        </a>
                        <a href="/hi" className="hi" onClick={localStorage.setItem("mostrarLanding", false)}>
                            <button>Hi</button>
                        </a>
                    </ul>
                </nav>
            </header>
            {mostrarLanding ? (
                <Landing/>
            ): (
                <Outlet/>
            )}
            
        </div>
    )
};

export { Layout };
