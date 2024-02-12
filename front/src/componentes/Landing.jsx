// import { useEffect, useState } from "react";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5176');

export const Landing = () => {

    return (
        <div>
            <a href="#">
                <Button variant="success">Crear Partida</Button>{' '}
            </a>
            <a href="#">
                <button>Unirse</button>
            </a>
            
        </div>
    );
}