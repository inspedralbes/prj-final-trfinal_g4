import React, { useEffect, useState } from 'react';

export const Hi = (props) => {
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        const storedUsernames = localStorage.getItem('usernames');
        if (storedUsernames) {
            setUsernames(JSON.parse(storedUsernames));
        }
    }, []);

    return (
        <div>
            {usernames.map((username, index) => (
                <h1 key={index}>Hi {username}</h1>
            ))}
        </div>
    );
};
            