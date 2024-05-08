import React, { useState, useEffect, use } from 'react';
import { RiAdminLine } from "react-icons/ri";
import { FaRegMap } from "react-icons/fa";
import { TbMapExclamation } from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { getMaps } from '../services/communicationManager';
import { getReportedMaps } from '../services/communicationManager';
import { getUsers } from '../services/communicationManager';
function AdminPanel() {
    const [maps, setMaps] = useState([]);
    const [reportedMaps, setReportedMaps] = useState([]); // Add reportedMaps state
    const [allUsers, setUsers] = useState([]); // Add users state
    const [selectedIcon, setSelectedIcon] = useState(null);

    useEffect(() => {
        getMaps()
            .then((data) => setMaps(data))
            .catch((error) => console.error('Error fetching maps:', error));

        getReportedMaps()
            .then((data) => setReportedMaps(data))
            .catch((error) => console.error('Error fetching reported maps:', error));

        getUsers()
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users: ', error))

    }, []);

    const handleIconClick = (iconName) => {
        setSelectedIcon(iconName);
    }

    return (
        <div className="flex  items-center h-screen bg-teal-900">
            <div className="grid grid-rows-5 w-48 h-screen bg-teal-700">
                <div className='flex flex-col items-center justify-center'>
                    <MdOutlineAdminPanelSettings style={{ color: 'white', fontSize: '4.5em', display: 'flex', cursor: 'pointer' }} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <RiAdminLine style={{ color: 'white', fontSize: '4.5em', display: 'flex', cursor: 'pointer' }} onClick={() => handleIconClick('allUsers')} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <FaRegMap style={{ color: 'white', fontSize: '4.5em', display: 'flex', cursor: 'pointer' }} onClick={() => handleIconClick('maps')} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <TbMapExclamation style={{ color: 'white', fontSize: '4.5em', display: 'flex', cursor: 'pointer' }} onClick={() => handleIconClick('reportedMaps')} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <GoGraph style={{ color: 'white', fontSize: '4.5em', display: 'flex', cursor: 'pointer' }} />
                </div>
            </div>

            {selectedIcon === 'maps' && (
                <div className="flex flex-grow justify-center items-center">
                    {maps.length > 0 && (
                        <ul>
                            {maps.map((map) => (
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
            )}

            {selectedIcon === 'reportedMaps' && (
                <div className="flex-grow">
                    {reportedMaps.length > 0 && (
                        <ul>
                            {reportedMaps.map((map) => (
                                <div key={map.id}>
                                    <p>{map.map_id}</p>
                                    <p>{map.user_id}</p>
                                    <p>{map.reason}</p>
                                </div>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {selectedIcon === 'allUsers' && (
                <div className="">
                    <div className="">
                        {allUsers.length > 0 && (
                            <ul className='grid grid-cols-3'>
                                {allUsers.map((user) => (
                                    <li key={user.id} className=" text-white ">
                                        <p className="">{user.name}</p>
                                        <p className="">{user.email}</p>
                                        <p className="">{user.admin}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}








        </div>
    )

}

export default AdminPanel;