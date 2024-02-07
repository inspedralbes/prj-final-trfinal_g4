import React, { useEffect, useState } from 'react';
export const Hi = (props) => {
   
    const username = localStorage.getItem('username');
    return (

        <div>
            <h1>Hi {username}</h1>
        </div>
    )
}