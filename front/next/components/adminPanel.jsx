import React, { useState, useEffect, use } from 'react';
import { RiAdminLine } from "react-icons/ri";
import { FaRegMap } from "react-icons/fa";
import { TbMapExclamation } from "react-icons/tb";
import { MdReportOff } from "react-icons/md";
import { getMaps } from '../services/communicationManager';
import { getReportedMaps } from '../services/communicationManager';
import { getUsers } from '../services/communicationManager';
import { destroyMap } from '../services/communicationManager';
import { downloadFile } from '../services/communicationManager';
import { destroyReport } from '../services/communicationManager';
import { updateUser } from '../services/communicationManager';
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";
import { TiTimesOutline } from "react-icons/ti";
import { GrUserAdmin } from "react-icons/gr";
import { LuUser2 } from "react-icons/lu";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { CiSquareCheck } from "react-icons/ci";
import { TbMapSearch } from "react-icons/tb";
import { RiUserSearchLine } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

import './styles.css';

function AdminPanel() {
    const URL = 'https://chromaticbond.cat:8000';
    const [maps, setMaps] = useState([]);
    const [reportedMaps, setReportedMaps] = useState([]);
    const [allUsers, setUsers] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [searchReportedMapById, setSearchReportedMapById] = useState('');
    const [searchUsersById, setsearchUsersById] = useState('');
    const [searchMapsById, setSearchMapsById] = useState('');
    //new
    const [selectedState, setSelectedState] = useState('');
    const [selectReason, setSelectReason] = useState('');
    const [selectedMap, setSelectedMap] = useState(null);

    const [currentPageMaps, setCurrentPageMaps] = useState(1);
    const [currentPageReportedMaps, setCurrentPageReportedMaps] = useState(1);
    const [currentPageUsers, setCurrentPageUsers] = useState(1);
    const usersPerPage = 4;
    const mapsPerPage = 3;

    const reasons = ['mapa incomplet', 'no vàlid', 'obscè', 'contingut inapropiat', 'contingut duplicat', 'contingut violent', 'contingut sexual'];

    //users
    const filterByIdAndNameUsers = allUsers.filter(user => user.id.toString().includes(searchUsersById) || user.name.toLowerCase().includes(searchUsersById.toLowerCase()));
    const indexOfLastUser = currentPageUsers * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filterByIdAndNameUsers.slice(indexOfFirstUser, indexOfLastUser);

    //maps
    const filterMapsByState = maps.filter(map => (selectedState ? map.state === selectedState : true));

    const handleSelectFilterStateMapsChange = (e) => {

        setSelectedState(e.target.value);
        setCurrentPageMaps(1);
    }
    const filterByIdAndNameAndUser = filterMapsByState.filter(map => map.name.toLowerCase().includes(searchMapsById.toLowerCase()));
    const indexOfLastMap = currentPageMaps * mapsPerPage;
    const indexOfFirstMap = indexOfLastMap - mapsPerPage;
    const currentMaps = filterByIdAndNameAndUser.slice(indexOfFirstMap, indexOfLastMap);

    //reportedMaps
    const filterMapsReportedByReason = reportedMaps.filter(map => ((selectReason === "" || map.reason === selectReason)));

    const handleSelectFilterReasonMapsReportedChange = (e) => {
        const selectedValue = e.target.value;
        setSelectReason(selectedValue);
        setCurrentPageReportedMaps(1);
    }

    const filterByIdAndReasonReportedMaps = filterMapsReportedByReason.filter(map => map.map_id.toString().includes(searchReportedMapById));
    const indexOfLastReportedMap = currentPageReportedMaps * mapsPerPage;
    const indexOfFirstReportedMap = indexOfLastReportedMap - mapsPerPage;
    const currentReportedMaps = filterByIdAndReasonReportedMaps.slice(indexOfFirstReportedMap, indexOfLastReportedMap);

    try {
        const userLocal = JSON.parse(localStorage.getItem('user'));
        var userID = userLocal.id;
        var userName = userLocal.name;
        var tokenLocal = userLocal.token;
    } catch (error) {
        //console.error('Error getting user:', error);
    }

    const handleDeleteMap = async (mapID) => {

        try {
            await destroyMap(mapID, userID, tokenLocal);
            setMaps(maps.filter(map => map.id !== mapID));
        } catch (error) {
            //console.error('Error deleting map:', error);
        }
    }

    const handleDownloadFile = async (mapID, mapName) => {
        try {
            await downloadFile(mapID, mapName, userID, tokenLocal);
        } catch (error) {
            //console.error('Error downloading map:', error);
        }
    }

    const handleDeleteReport = async (mapID) => {
        try {
            await destroyReport(mapID, userID, tokenLocal);
            setReportedMaps(reportedMaps.filter(map => map.id !== mapID));
        } catch (error) {
            //console.error('Error deleting report:', error);
        }
    }

    const handleUserAdmin = async (userID) => {
        try {
            const formData = new FormData();
            formData.append('admin', true);
            formData.append('user_id', userID);
            updateUser(formData, tokenLocal);
            setUsers(allUsers.map(user => user.id === userID ? { ...user, admin: 1 } : user));

        } catch (error) {
            //console.error('Error updating user:', error);
        }
    }

    const handleUserNotAdmin = async (userID) => {
        try {
            const formData = new FormData();
            formData.append('admin', false);
            formData.append('user_id', userID);
            updateUser(formData, tokenLocal);
            setUsers(allUsers.map(user => user.id === userID ? { ...user, admin: 0 } : user));
        } catch (error) {
            //console.error('Error updating user:', error);
        }
    }

    useEffect(() => {
        getMaps()
            .then((data) => setMaps(data))

        const userLocal = JSON.parse(localStorage.getItem('user'));

        let userID = userLocal.id;
        let tokenLocal = userLocal.token;

        getReportedMaps(tokenLocal, userID)
            .then((data) => setReportedMaps(data))

        getUsers(tokenLocal, userID)
            .then((data) => {
                setUsers(data);
            })

    }, []);

    const handleIconClick = (iconName) => {
        setSelectedIcon(iconName);
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
        <div className="min-h-screen w-full bg-gradient-to-r from-blue-500 from-15% via-red-500 via-60% to-yellow-500">
            <div className='flex flex-inline min-h-screen w-full items-center'>
                <div className="grid grid-cols items-center justify-center min-h-screen w-1/6 min-w-[100px] bg-sky-800">
                    <div>
                        <RiAdminLine className='icons' onClick={() => handleIconClick('allUsers')} />
                    </div>
                    <div>
                        <FaRegMap className='icons' onClick={() => handleIconClick('maps')} />
                    </div>
                    <div>
                        <TbMapExclamation className='icons' onClick={() => handleIconClick('reportedMaps')} />
                    </div>
                </div>

                {!selectedIcon && (
                    <div className='flex flex-col items-center justify-center mx-auto'>
                        <div className=''>
                            <IoSettingsOutline style={{ fontSize: '4em', color: 'white' }} />
                        </div>
                        <h1 className="animated-text text-white text-6xl m-5 mb-9">Hola, {userName}</h1>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 m-5 mt-9 w-2/3'>
                            <div className="flex flex-inline p-4 rounded-lg bg-white">
                                <div className='mr-4 my-auto'>
                                    <RiUserSearchLine style={{ fontSize: '2em' }} />
                                </div>
                                <p className=''>Pots administrar els usuaris filtrant-los per ID i veure si és administrador o no.</p>
                            </div>

                            <div className="flex flex-inline p-4 rounded-lg bg-white">
                                <div className='mr-4 my-auto'>
                                    <TbMapSearch style={{ fontSize: '2em' }} />
                                </div>
                                <p className=''>Pots administrar els mapes, filtrar-los per ID i per estat, descarregar l'arxiu i eliminar el mapa.</p>
                            </div>

                            <div className="flex flex-inline p-4 rounded-lg bg-white">
                                <div className='mr-4 my-auto'>
                                    <TbReportSearch style={{ fontSize: '2em' }} />
                                </div>
                                <p className=''>Pots administrar els mapes reportats, veien tots el reports per mapa i en general.</p>
                            </div>
                        </div>
                    </div>
                )}

                {selectedIcon === 'maps' && (
                    <div className="container">
                        <div className='container-icon-maps mt-9'>
                            <FaRegMap style={{ fontSize: '12em', color: '#FFFFFF' }} />
                        </div>
                        <div>

                            <div className='container-filter-users'>
                                <input
                                    type="text"
                                    placeholder='Buscar por ID'
                                    value={searchMapsById}
                                    onChange={handleSearchChangeMaps}
                                    className='input-search'
                                />
                                <select
                                    className='dropdown-menu'
                                    onChange={handleSelectFilterStateMapsChange}
                                    style={{
                                        color: '#333', // color del texto
                                        backgroundColor: '#fff', // color de fondo
                                        border: '1px solid #ccc', // borde
                                        borderRadius: '4px', // bordes redondeados
                                        padding: '10px', // espacio interior
                                        fontSize: '16px', // tamaño del texto
                                        width: '150px', // ancho
                                    }}

                                >
                                    <option value="">Todos</option>
                                    {
                                        [...new Set(maps.map(map => map.state))].map((state, index) =>
                                            <option key={index} value={state}>{state}</option>
                                        )
                                    }
                                </select>

                            </div>

                            <div className='users-view'>
                                <div className='arrow-left-right'>
                                    {currentPageMaps !== 1 && !searchMapsById && (
                                        <div className="container-icon-arrow-maps">
                                            <button onClick={() => setCurrentPageMaps(currentPageMaps - 1)} disabled={currentPageMaps === 1}><IoIosArrowDropleft style={{ fontSize: '2.5em', color: '#FFFFFF' }} /></button>
                                        </div>
                                    )}
                                </div>
                                {filterByIdAndNameAndUser.length > 0 ? (
                                    <ul className='lista-users'>
                                        {currentMaps.length > 0 && currentMaps.map((map) => (
                                            <li key={map.id} className='info-maps'>
                                                <div className='info-map_container-img'>
                                                    <img className="info-map-img" src={`${URL}${map.image}`} style={{ width: '250px', height: '150px', borderRadius: '7%' }} />
                                                </div>
                                                <span>{map.name}</span>
                                                {allUsers.length > 0 && (
                                                    <span>{allUsers.find(user => user.id === map.user_id).name}</span>
                                                )}
                                                <div className='grid-container-iconos'>
                                                    <div style={{ position: 'relative' }}>
                                                        <MdOutlineReportProblem style={{ color: 'orange', fontSize: '3em' }} />
                                                        <span style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            right: 0,
                                                            padding: '0.1em',
                                                            paddingLeft: '0.2em',
                                                            paddingRight: '0.2em',
                                                            backgroundColor: 'orange',
                                                            color: 'white',
                                                            borderRadius: '30%',
                                                        }}>
                                                            {map.reports}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <MdOutlineFileDownload style={{ color: 'green', fontSize: '3em', cursor: 'pointer' }} onClick={() => handleDownloadFile(map.id, map.name)} />
                                                    </div>
                                                    <div>
                                                        <RiDeleteBinLine style={{ color: 'red', fontSize: '2.8em', cursor: 'pointer' }} onClick={() => handleDeleteMap(map.id)} />
                                                    </div>
                                                    {map.state === 'pending' && (
                                                        <div>
                                                            <button onClick={() => handleApproveMap(map.id)} style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', width: '100px' }}>Aprobar</button>
                                                        </div>
                                                    )}
                                                    {map.state === 'Reported' && (
                                                        <div>
                                                            <MdReportOff style={{ color: '#BF0A1D', fontSize: '3.1em', display: 'flex' }} />
                                                        </div>
                                                    )}
                                                    {map.state === 'approved' && (
                                                        <div>
                                                            <CiSquareCheck style={{ color: 'rgba(13, 129, 41 , 0.957)', fontSize: '3.1em', display: 'flex' }} />
                                                        </div>
                                                    )}


                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div>
                                        {searchMapsById && <p>No s'han trobat mapes amb aquest ID</p>}
                                        <ul className='lista-users'></ul>
                                    </div>
                                )}
                                <div className='arrow-left-right'>
                                    {indexOfLastMap < filterByIdAndNameAndUser.length && !searchMapsById && (
                                        <div className="container-icon-arrow-maps">
                                            <button onClick={() => setCurrentPageMaps(currentPageMaps + 1)} disabled={indexOfLastMap >= maps.length}><IoIosArrowDropright style={{ fontSize: '2.5em', color: '#FFFFFF' }} /></button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedIcon === 'reportedMaps' && (
                    <div className='container'>
                        <div className='container-icon-report mt-9'>
                            <MdOutlineReportProblem style={{ fontSize: '12em', color: '#FFFFFF' }} />
                        </div>
                        <div>
                            <div className='container-filter-users'>
                                <input
                                    type="text"
                                    placeholder='Search map reported by ID'
                                    value={searchReportedMapById}
                                    onChange={handleSearchChangeReportedMaps}
                                    className='input-search'
                                />
                            </div>
                            <div className='users-view'>
                                <div className='arrow-left-right'>
                                    {currentPageReportedMaps !== 1 && !searchReportedMapById && (
                                        <div className="container-icon-arrow-reportedMaps">
                                            <button onClick={() => setCurrentPageReportedMaps(currentPageReportedMaps - 1)} disabled={currentPageReportedMaps === 1}><IoIosArrowDropleft style={{ fontSize: '2.5em', color: '#BF0A1D' }} /></button>
                                        </div>
                                    )}
                                </div>

                                {filterByIdAndReasonReportedMaps.length > 0 ? (
                                    <ul className='lista-users'>
                                        {[...new Set(currentReportedMaps.map(map => map.map_id))].map((mapId) => {
                                            const map = currentReportedMaps.find(map => map.map_id === mapId);
                                            return (
                                                <div className='info-all'>
                                                    <div key={map.id} className='info-reportedMap'>
                                                        <span> ID - {map.map_id} </span>
                                                        {allUsers.length > 0 && (
                                                            <span>Creador - {allUsers.find(user => user.id === map.user_id).name}</span>
                                                        )}
                                                        <button className='button-verReportes' onClick={() => setSelectedMap(map)}>
                                                            <p>Veure Reports</p>
                                                        </button>


                                                    </div>
                                                    {selectedMap && selectedMap.map_id === map.map_id && (
                                                        <div>
                                                            <h2>Reports para el mapa {selectedMap.map_id}</h2>
                                                            <hr style={{ padding: '10px 10px 10px 10px' }}></hr>
                                                            <ul style={{ listStyleType: 'none', paddingLeft: 0 }} className='container-lista-reports'>
                                                                {filterByIdAndReasonReportedMaps.filter(report => report.map_id === selectedMap.map_id).map((report, index) => (
                                                                    <li key={index} style={{ marginBottom: '10px' }} className='lista-reports'>
                                                                        <span>{index + 1}</span>
                                                                        <span>{report.reason}</span>
                                                                        <button className='cancel-report' onClick={() => handleDeleteReport(map.id)}>Cancelar reports</button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '10px' }}>
                                                                <button className='button-cerrar' onClick={() => setSelectedMap(null)}>Tancar</button>
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>
                                            )
                                        })}
                                    </ul>
                                ) : (
                                    <div>
                                        {searchReportedMapById && <p>No s'han trobat mapes amb aquest ID</p>}
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
                    <div className="container ">
                        <div className="container-icon-users mt-9">
                            <RiAdminLine style={{ fontSize: '12em', color: '#FFFFFF' }} />
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
                                                <p className="mr-3">{user.name}</p>
                                                <p className="ml-3">{user.email}</p>
                                                <p className="">{user.admin === 1 ? <TiTickOutline style={{ fontSize: '2em', color: 'rgba(13, 129, 41 , 0.757)' }} /> : <TiTimesOutline style={{ fontSize: '2em', color: 'rgba(138, 10, 10, 0.757)' }} />}</p>
                                                <div>
                                                    {user.admin === 0 ? (
                                                        <button style={{ color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', boxShadow: '0 0 10px rgba(13, 129, 41 , 0.957)' }} onClick={() => handleUserAdmin(user.id)}>Fer administrador</button>
                                                    ) : (
                                                        <button style={{ color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', boxShadow: '0 0 10px rgba(138, 10, 10, 0.957)' }} onClick={() => handleUserNotAdmin(user.id)}>Quitar administrador</button>

                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div>
                                        {searchUsersById && <p>No s'han trobat usuaris amb aquest ID</p>}
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
        </div>
    )

}

export default AdminPanel;