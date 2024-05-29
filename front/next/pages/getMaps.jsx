
import React, { useEffect, useState } from 'react';
import { getMaps } from '../services/communicationManager';
import { Link } from 'react-router-dom';
import AdminPanel from '../components/adminPanel';
function getMapsComponent() {
    const [maps, setMaps] = useState([]);

    useEffect(() => {
        getMaps()
            .then(data => {
                setMaps(data);
            })

    }, []);

    return (
        <div>
            <div className="flex-grow">
                <div>
                    <ul>
                        {maps.length > 0 && maps.map(map => ( // Add conditional statement to check if maps array is not empty
                            <div key={map.id}>
                                <img src={`http://localhost:8000/${map.image}`} style={{ width: '400px', height: '250px', borderRadius: '10%' }} />
                                <p>{map.name}</p>
                                <p>{map.description}</p>
                                <p>{map.user_id}</p>
                            </div>
                        ))}
                    </ul>

                </div>
            </div>

        </div>
    )
}

export default getMapsComponent;