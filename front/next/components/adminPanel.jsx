import React, { useState, useEffect, use } from 'react';
import { RiAdminLine } from "react-icons/ri";
import { FaRegMap } from "react-icons/fa";
import { TbMapExclamation } from "react-icons/tb";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { getMaps } from '../services/communicationManager';
import { getReportedMaps } from '../services/communicationManager';
import { getUsers } from '../services/communicationManager';
import { destroyMap } from '../services/communicationManager';
import { downloadFile } from '../services/communicationManager';
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { TiTickOutline } from "react-icons/ti";
import { TiTimesOutline } from "react-icons/ti";
import { GrUserAdmin } from "react-icons/gr";
import { LuUser2 } from "react-icons/lu";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import './styles.css';

function AdminPanel() {
    const [maps, setMaps] = useState([]);
    const [reportedMaps, setReportedMaps] = useState([]);
    const [allUsers, setUsers] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [searchReportedMapById, setSearchReportedMapById] = useState('');
    const [searchUsersById, setsearchUsersById] = useState('');
    const [searchMapsById, setSearchMapsById] = useState('');
    const [currentPageMaps, setCurrentPageMaps] = useState(1);
    const [currentPageReportedMaps, setCurrentPageReportedMaps] = useState(1);
    const [currentPageUsers, setCurrentPageUsers] = useState(1);
    const usersPerPage = 4;
    const mapsPerPage = 3;

    const filterByIdAndNameUsers = allUsers.filter(user => user.id.toString().includes(searchUsersById) || user.name.toLowerCase().includes(searchUsersById.toLowerCase()));
    const indexOfLastUser = currentPageUsers * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filterByIdAndNameUsers.slice(indexOfFirstUser, indexOfLastUser);

    const filterByIdAndReasonReportedMaps = reportedMaps.filter(map => map.map_id.toString().includes(searchReportedMapById));
    const indexOfLastReportedMap = currentPageReportedMaps * mapsPerPage;
    const indexOfFirstReportedMap = indexOfLastReportedMap - mapsPerPage;
    const currentReportedMaps = filterByIdAndReasonReportedMaps.slice(indexOfFirstReportedMap, indexOfLastReportedMap);

    const filterByIdAndNameAndUser = maps.filter(map => map.name.toLowerCase().includes(searchMapsById.toLowerCase()));
    const indexOfLastMap = currentPageMaps * mapsPerPage;
    const indexOfFirstMap = indexOfLastMap - mapsPerPage;
    const currentMaps = filterByIdAndNameAndUser.slice(indexOfFirstMap, indexOfLastMap);

    useEffect(() => {
        getMaps()
            .then((data) => setMaps(data))
            .then((data) => console.log("data", data))
            .catch((error) => console.error('Error fetching maps:', error));

        const userLocal = JSON.parse(localStorage.getItem('user'));
        let userID = userLocal.id;
        let tokenLocal = userLocal.token;

        getReportedMaps(tokenLocal, userID)
            .then((data) => setReportedMaps(data))
            .catch((error) => console.error('Error fetching reported maps:', error));
        
        getUsers(tokenLocal, userID)
            .then((data) => {
                console.log("data", data);
                setUsers(data);
            })
            .catch((error) => console.error('Error fetching users: ', error))

    }, []);

    const handleIconClick = (iconName) => {
        setSelectedIcon(iconName);
    }

    const handleDeleteMap = async (mapId) => {
        try {
            await destroyMap(mapId);
            setMaps(maps.filter(map => map.id !== mapId));
        } catch (error) {
            console.error('Error deleting map:', error);
        }
    }

    const handleCancelReport = async (mapId) => {
        try {
            console.log("map id", mapId);
            await destroyReport(mapId)
            setReportedMaps(reportedMaps.filter(map => map.id !== mapId));
        } catch (error) {
            console.error('Error deleting map:', error);
        }
    }

    const handleDownloadFile = async (mapId, mapName) => {
        try {
            await downloadFile(mapId, mapName);
        } catch (error) {
            console.error('Error downloading map:', error);
        }
    }

    const handleSearchChangeUsers = (e) => {
        setsearchUsersById(e.target.value);
        setCurrentPageUsers(1);
    }

    const handleSearchChangeMaps = (e) => {
        setSearchMapsById(e.target.value);
        setCurrentPageMaps(1);
    }

    const handleSearchChangeReportedMaps = (e) => {
        setSearchReportedMapById(e.target.value);
        setCurrentPageReportedMaps(1);
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
            </div>

            {selectedIcon === 'maps' && (
                <div className="container">
                    <div className='container-icon-maps'>
                        <FaRegMap style={{ fontSize: '12em', color: '#D5671C' }} />
                    </div>
                    <div>
                        <div className='container-filter-users'>
                            <input
                                type="text"
                                placeholder='Search by name and ID'
                                value={searchMapsById}
                                onChange={handleSearchChangeMaps}
                                className='input-search'
                            />
                        </div>
                        <div className='users-view'>
                            <div className='arrow-left-right'>
                                {currentPageMaps !== 1 && !searchMapsById && (
                                    <div className="container-icon-arrow-maps">
                                        <button onClick={() => setCurrentPageMaps(currentPageMaps - 1)} disabled={currentPageMaps === 1}><IoIosArrowDropleft style={{ fontSize: '2.5em', color: '#D5671C' }} /></button>
                                    </div>
                                )}
                            </div>
                            {filterByIdAndNameAndUser.length > 0 ? (
                                <ul className='lista-users'>
                                    {currentMaps.length > 0 && currentMaps.map((map) => (
                                        <li key={map.id} className='info-maps'>
                                            <div className='info-map_container-img'>
                                                <img className="info-map-img" src={`http://localhost:8000${map.image}`} style={{ width: '250px', height: '150px', borderRadius: '7%' }} />
                                            </div>
                                            <span>{map.name}</span>
                                            {allUsers.length > 0 && (
                                                <span>{allUsers.find(user => user.id === map.user_id).name}</span>
                                            )}
                                            <div className='grid-container-iconos'>
                                                <div>
                                                    <MdOutlineReportProblem style={{ color: 'orange', fontSize: '3em', cursor: 'pointer' }} />
                                                </div>
                                                <div>
                                                    <MdOutlineFileDownload style={{ color: 'green', fontSize: '3em', cursor: 'pointer' }} onClick={() => handleDownloadFile(map.id, map.name)} />
                                                </div>
                                                <div>
                                                    <RiDeleteBinLine style={{ color: 'red', fontSize: '2.8em', cursor: 'pointer' }} onClick={() => handleDeleteMap(map.id)} />
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div>
                                    {searchMapsById && <p>No se encontraron mapas con ese ID</p>}
                                    <ul className='lista-users'></ul>
                                </div>
                            )}
                            <div className='arrow-left-right'>
                                {indexOfLastMap < filterByIdAndNameAndUser.length && !searchMapsById && (
                                    <div className="container-icon-arrow-maps">
                                        <button onClick={() => setCurrentPageMaps(currentPageMaps + 1)} disabled={indexOfLastMap >= maps.length}><IoIosArrowDropright style={{ fontSize: '2.5em', color: '#D5671C' }} /></button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedIcon === 'reportedMaps' && (
                <div className='container'>
                    <div className='container-icon-report'>
                        <MdOutlineReportProblem style={{ fontSize: '12em', color: '#BF0A1D' }} />
                    </div>
                    <div>
                        <div className='container-filter-users'>
                            <input
                                type="text"
                                placeholder='Search by map id and Reason'
                                value={searchReportedMapById}
                                onChange={handleSearchChangeReportedMaps}
                                className='input-search'
                            />
                        </div>
                        <div className='users-view'>
                            <div className='arrow-left-right'>
                                {currentPageReportedMaps !== 1 && !searchReportedMapById && (
                                    <div className="container-icon-arrow-users">
                                        <button onClick={() => setCurrentPageReportedMaps(currentPageReportedMaps - 1)} disabled={currentPageReportedMaps === 1}><IoIosArrowDropleft style={{ fontSize: '2.5em', color: '#BF0A1D' }} /></button>
                                    </div>
                                )}
                            </div>
                            {filterByIdAndReasonReportedMaps.length > 0 ? (
                                <ul className='lista-users'>
                                    {currentReportedMaps.length > 0 && currentReportedMaps.map((map) => (
                                        <div key={map.id} className='info-reportedMap'>
                                            <span> {map.map_id} </span>
                                            {allUsers.length > 0 && (
                                                <span>{allUsers.find(user => user.id === map.user_id).name}</span>
                                            )}
                                            <span> {map.reason} </span>
                                            <button style={{ backgroundColor: '#BF0A1D', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleCancelReport(map.id)}>Cancelar reporte</button>
                                        </div>
                                    ))}
                                </ul>
                            ) : (
                                <div>
                                    {searchReportedMapById && <p>No se encontraron mapas con ese ID</p>}
                                    <ul className='lista-reportes'></ul>
                                </div>
                            )}
                            <div className='arrow-left-right'>
                                {indexOfLastReportedMap < filterByIdAndReasonReportedMaps.length && !searchReportedMapById && (
                                    <div className="container-icon-arrow-reportedMaps">
                                        <button onClick={() => setCurrentPageReportedMaps(currentPageReportedMaps + 1)} disabled={indexOfLastReportedMap >= reportedMaps.length}><IoIosArrowDropright style={{ fontSize: '2.5em', color: '#BF0A1D' }} /></button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedIcon === 'allUsers' && (
                <div className="container">
                    <div className="container-icon-users">
                        <RiAdminLine style={{ fontSize: '12em', color: '#2C66E3' }} />
                    </div>
                    <div>
                        <div className='container-filter-users'>
                            <input
                                type="text"
                                placeholder='Search by name and ID'
                                value={searchUsersById}
                                onChange={handleSearchChangeUsers}
                                className='input-search'
                            />
                        </div>

                        <div className='users-view'>
                            <div className='arrow-left-right'>
                                {currentPageUsers !== 1 && !searchUsersById && (
                                    <div className="container-icon-arrow-users">
                                        <button onClick={() => setCurrentPageUsers(currentPageUsers - 1)} disabled={currentPageUsers === 1}><IoIosArrowDropleft style={{ fontSize: '2.5em', color: '#2C66E3' }} /></button>
                                    </div>
                                )}
                            </div>
                            {filterByIdAndNameUsers.length > 0 ? (
                                <ul className='lista-users'>
                                    {currentUsers.length > 0 && currentUsers.map((user) => (
                                        <li key={user.id} className="info-users">
                                            <div>
                                                {user.admin === 0 ? (
                                                    <LuUser2 style={{ fontSize: '2em', color: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0 0 10px rgba(217, 213, 209, 0.88)' }} />
                                                ) : (
                                                    <GrUserAdmin style={{ fontSize: '2em', color: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0 0 10px rgba(217, 213, 209, 0.88)' }} />
                                                )
                                                }
                                            </div>
                                            <p className="">{user.name}</p>
                                            <p className="">{user.email}</p>
                                            <p className="">{user.admin === 1 ? <TiTickOutline style={{ fontSize: '2em', color: 'rgba(13, 129, 41 , 0.757)' }} /> : <TiTimesOutline style={{ fontSize: '2em', color: 'rgba(138, 10, 10, 0.757)' }} />}</p>
                                            <div>
                                                {user.admin === 0 ? (
                                                    <button style={{ color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', boxShadow: '0 0 10px rgba(13, 129, 41 , 0.957)' }}>Hacer admin</button>
                                                ) : (
                                                    <button style={{ color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', boxShadow: '0 0 10px rgba(138, 10, 10, 0.957)' }}>Quitar admin</button>

                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div>
                                    {searchUsersById && <p>No se encontraron usuarios con ese ID</p>}
                                    <ul className='lista-users'></ul>
                                </div>
                            )}

                            <div className='arrow-left-right'>
                                {indexOfLastUser < filterByIdAndNameUsers.length && !searchUsersById && (
                                    <div className="container-icon-arrow-users">
                                        <button onClick={() => setCurrentPageUsers(currentPageUsers + 1)} disabled={indexOfLastUser >= allUsers.length}><IoIosArrowDropright style={{ fontSize: '2.5em', color: '#2C66E3' }} /></button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            )}

        </div>
    )

}

export default AdminPanel;