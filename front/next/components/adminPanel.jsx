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
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;

    const [currentPageMaps, setCurrentPageMaps] = useState(1);
    const mapsPerPage = 3;

    const filterByIdAndNameUsers = allUsers.filter(user => user.id.toString().includes(searchUsersById) || user.name.toLowerCase().includes(searchUsersById.toLowerCase()));
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filterByIdAndNameUsers.slice(indexOfFirstUser, indexOfLastUser);

    const filterByIdAndReasonReportedMaps = reportedMaps.filter(map => map.map_id.toString().includes(searchReportedMapById) || map.reason.toLowerCase().includes(searchReportedMapById.toLowerCase()));
    const indexOfLastReportedMap = currentPageMaps * mapsPerPage;
    const indexOfFirstMap = indexOfLastReportedMap - mapsPerPage;
    const currentReportedMaps = filterByIdAndReasonReportedMaps.slice(indexOfFirstMap, indexOfLastReportedMap);

    const filterByIdAndNameAndUser = maps.filter(map => map.id.toString().includes(searchReportedMapById) || map.name.toLowerCase().includes(searchReportedMapById.toLowerCase()) || allUsers.find(user => user.id === map.user_id).name.toLowerCase().includes(searchReportedMapById.toLowerCase()));
    const indexOfLastMap = currentPageMaps * mapsPerPage;
    const indexOfFirstReportedMap = indexOfLastMap - mapsPerPage;
    useEffect(() => {
        getMaps()
            .then((data) => setMaps(data))
            .catch((error) => console.error('Error fetching maps:', error));
        const userID = localStorage.getItem('userID');
        let token = localStorage.getItem('token');
        token = token.replace(/"/g, '');

        getReportedMaps(token, userID)
            .then((data) => setReportedMaps(data))
            .catch((error) => console.error('Error fetching reported maps:', error));
        getUsers(token, userID)

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
            // console.log("map id", mapId);
            await destroyMap(mapId);
            // console.log("Map deleted");
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
            // console.log("Map downloaded!!!");
        } catch (error) {
            console.error('Error downloading map:', error);
        }
    }

    const handleSearchChange = (e) => {
        setsearchUsersById(e.target.value);
        setCurrentPage(1);
    }

    const filterByIdReportedMaps = searchReportedMapById ? reportedMaps.filter(map => map.map_id.toString().includes(searchReportedMapById)) : reportedMaps;

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
                <div className="container">
                    <div className='container-icon-maps'>
                        <FaRegMap style={{ fontSize: '12em', color: '#D5671C' }} />
                    </div>
                    {currentMaps.length > 0 && (
                        <div>
                            <div className='users-view'>
                                <div className='arrow-left-right'>
                                    {currentPageMaps !== 1 && (
                                        <div className="container-icon-arrow-maps">
                                            <button onClick={() => setCurrentPageMaps(currentPageMaps - 1)} disabled={currentPageMaps === 1}><IoIosArrowDropleft style={{ fontSize: '2.5em', color: '#D5671C' }} /></button>
                                        </div>
                                    )}
                                </div>
                                <ul className='lista-users'>

                                    {currentMaps.map((map) => (
                                        <li key={map.id} className='info-maps'>
                                            <div className='info-map_container-img'>
                                                <img className="info-map-img" src={`http://localhost:8000/${map.image}`} style={{ width: '250px', height: '150px', borderRadius: '7%' }} />
                                            </div>


                                            <span>{map.name}</span>
                                            <span>{map.description}</span>
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
                                <div className='arrow-left-right'>
                                    {indexOfLastReportedMap < maps.length && (
                                        <div className="container-icon-arrow-maps">
                                            <button onClick={() => setCurrentPageMaps(currentPageMaps + 1)} disabled={indexOfLastReportedMap >= maps.length}><IoIosArrowDropright style={{ fontSize: '2.5em', color: '#D5671C' }} /></button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
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
                                onChange={(e) => setSearchReportedMapById(e.target.value)}
                                className='input-search'
                            />
                        </div>

                        <div className='users-view'>
                            <div className='arrow-left-right'>
                                {currentPage !== 1 && !searchReportedMapById && (
                                    <div className="container-icon-arrow-users">
                                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><IoIosArrowDropleft style={{ fontSize: '2.5em', color: '#BF0A1D' }} /></button>
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
                                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastReportedMap >= reportedMaps.length}><IoIosArrowDropright style={{ fontSize: '2.5em', color: '#BF0A1D' }} /></button>
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
                                onChange={handleSearchChange}
                                className='input-search'
                            />
                        </div>

                        <div className='users-view'>
                            <div className='arrow-left-right'>
                                {currentPage !== 1 && !searchUsersById && (
                                    <div className="container-icon-arrow-users">
                                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><IoIosArrowDropleft style={{ fontSize: '2.5em', color: '#2C66E3' }} /></button>
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
                                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastUser >= allUsers.length}><IoIosArrowDropright style={{ fontSize: '2.5em', color: '#2C66E3' }} /></button>
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