import React, { useState, useEffect, use } from 'react';
import { RiAdminLine } from "react-icons/ri";
import { FaRegMap } from "react-icons/fa";
import { TbMapExclamation } from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import axios from 'axios';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
// import { getUsers } from '../services/communicationManager';
import { getMaps } from '../services/communicationManager';
import { set } from 'zod';

function AdminPanel() {
    const [maps, setMaps] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState(null);

    useEffect(() => {
        getMaps()
            .then(data => {
                setMaps(data);
                console.log('maps getMaps: ', data);
            })

    }, []);

    const handleIconClick = (iconName) => {
        setSelectedIcon(iconName);
    }


    return (
        <div className="flex justify-center items-center h-screen bg-teal-900">
            <div className="grid grid-rows-5 w-48 h-screen bg-teal-700">
                <div className='flex flex-col items-center justify-center'>
                    <MdOutlineAdminPanelSettings style={{ color: 'white', fontSize: '4.5em', display: 'flex', cursor: 'pointer' }} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <RiAdminLine style={{ color: 'white', fontSize: '4.5em', display: 'flex', cursor: 'pointer' }} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <FaRegMap style={{ color: 'white', fontSize: '4.5em', display: 'flex', cursor: 'pointer' }} onClick={() => handleIconClick('maps')} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <TbMapExclamation style={{ color: 'white', fontSize: '4.5em', display: 'flex', cursor: 'pointer' }} onClick={() => handleIconClickMapsReported('maps')} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <GoGraph style={{ color: 'white', fontSize: '4.5em', display: 'flex', cursor: 'pointer' }} />
                </div>
            </div>

            <div className="flex-grow">
                <div>
                    {selectedIconMaps === 'maps' && (
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
                    )}
                </div>
            </div>
        </div>
    )

}

export default AdminPanel;