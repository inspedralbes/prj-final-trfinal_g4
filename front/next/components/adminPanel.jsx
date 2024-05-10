import React, { useState, useEffect, use } from 'react';
import { RiAdminLine } from "react-icons/ri";
import { FaRegMap } from "react-icons/fa";
import { TbMapExclamation } from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { getMaps } from '../services/communicationManager';
import { getReportedMaps } from '../services/communicationManager';
import { getUsers } from '../services/communicationManager';
import { destroyMap } from '../services/communicationManager';
import { downloadFile } from '../services/communicationManager';
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import './styles.css';

function AdminPanel() {
    const [maps, setMaps] = useState([]);
    const [reportedMaps, setReportedMaps] = useState([]);
    const [allUsers, setUsers] = useState([]);
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

    const handleDeleteMap = async (mapId) => {
        try {
            // console.log("map id", mapId);
            await destroyMap(mapId);
            // console.log("Map deleted");
            setMaps(maps.filter(map => map.id !== mapId));
        } catch (error) {
            console.error('Error deleting map:', error);
        }
    }

    const handleDownloadFile = async (mapId) => {
        try {
            await downloadFile(mapId);
            // console.log("Map downloaded!!!");
        } catch (error) {
            console.error('Error downloading map:', error);
        }
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
                <div className="container-maps">
                    {maps.length > 0 && (
                        <ul className='Grid_content_maps'>
                            {maps.map((map) => (
                                <div key={map.id} className='info-map'>
                                    <div className='info-map_container-img'>
                                        <img className="info-map-img" src={`http://localhost:8000/${map.image}`} style={{ width: '250px', height: '200px', borderRadius: '7%' }} />
                                    </div>
                                    <div className="info-map_container-datos">

                                        <p>Name: <span>{map.name}</span></p>
                                        <p>Description: <span>{map.description}</span></p>
                                        {allUsers.length > 0 && (
                                            <p>Owner: <span>{allUsers.find(user => user.id === map.user_id).name}</span></p>
                                        )}
                                        <div className='grid-container-iconos'>
                                            <div>
                                                <MdOutlineReportProblem style={{ color: 'orange', fontSize: '3em', cursor: 'pointer' }} />
                                            </div>
                                            <div>

                                                <MdOutlineFileDownload style={{ color: 'green', fontSize: '3em', cursor: 'pointer' }} onClick={() => handleDownloadFile(map.id)} />
                                            </div>
                                            <div>
                                                <RiDeleteBinLine style={{ color: 'red', fontSize: '2.8em', cursor: 'pointer' }} onClick={() => handleDeleteMap(map.id)} />
                                            </div>

                                        </div>


                                    </div>


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
                            <ul className=''>
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