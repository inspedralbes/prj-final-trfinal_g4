import React, { useState, useEffect, use } from 'react';
import { RiAdminLine } from "react-icons/ri";
import { FaRegMap } from "react-icons/fa";
import { TbMapExclamation } from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { getUsers } from '../services/communicationManager';
import { getMaps } from '../services/communicationManager';
import { set } from 'zod';

function AdminPanel() {

    const [users, setUsers] = useState([]);
    const [maps, setMaps] = useState([]);
    // const [token, setToken] = localStorage.getItem('token');
    useEffect(() => {
        getUsers()
            .then(data => {
                setUsers(data);
                console.log('users setUsers: ', data);
            })

        getMaps()
            .then(data => {
                setMaps(data);
                console.log('maps setMaps: ', data);
        })
        // .catch(error => {
        //     console.error('error fetching users: ', error);
        // });

    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-teal-900">
            <div className="flex flex-col w-48 h-screen bg-teal-700">
                <div className='flex flex-col items-center justify-center'>
                    <MdOutlineAdminPanelSettings style={{ color: 'white', fontSize: '4.5em', display: 'flex' }} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <RiAdminLine style={{ color: 'white', fontSize: '4.5em', display: 'flex' }} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <FaRegMap style={{ color: 'white', fontSize: '4.5em', display: 'flex' }} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <TbMapExclamation style={{ color: 'white', fontSize: '4.5em', display: 'flex' }} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <GoGraph style={{ color: 'white', fontSize: '4.5em', display: 'flex' }} />
                </div>
            </div>
            <div className="flex-grow">
                <div>
                    <h2>maps</h2>
                    <ul>

                        {/* {users.map(user => (
                            <li key={id}>
                                <p>{name}</p>
                                <p>{email}</p>
                                <p>{admin ? 'Si' : 'No'}</p>
                            </li>
                        ))} */}
                    </ul>
                </div>
            </div>
        </div>
    )

}

export default AdminPanel;