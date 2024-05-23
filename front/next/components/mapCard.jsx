import React, {useState} from 'react';
import { BiSolidLike } from "react-icons/bi";
import { MdReport } from "react-icons/md";
import { BiSolidDislike } from "react-icons/bi";
import { likeMap, reportMap } from '../services/communicationManager';

const MapCard = ({ map }) => {
    const URL = 'http://localhost:8000';
    const [reason, setReason] = useState('');

    const addLikeMap = () => {
        likeMap(map.id).then((data) => {
            console.log(data);
        });
    };

    const addReportMap = () => {
        const reportData = {
            map_id: map.id,
            reason: reason
        };

        reportMap(reportData).then((data) => {
            console.log(data);
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 lg:min-w-[320px]">
            <h2 className="text-xl font-bold mb-2">{map.name}</h2>
            <p className="text-gray-500">{map.description}</p>
            <img src={URL + map.image} alt={map.name} className="mt-4 rounded-lg h-40 w-160 mx-auto" />
            <div className="flex justify-between mt-4">
                <span className="text-gray-600">Autoria: {map.user}</span>
            </div>
            <div className="flex justify-between mt-4">
                <div className='flex flex-inline gap-2'>
                    <button className="flex items-center bg-blue-500 text-white rounded-lg px-3 py-2" onClick={addLikeMap}>
                        <BiSolidLike className='hover:animate-bounce'/>
                    </button>
                    <button className="flex items-center bg-blue-500 text-white rounded-lg px-3 py-2" onClick={addLikeMap}>
                        <BiSolidDislike className='hover:animate-bounce'/>
                    </button>
                </div>
                <button className="flex items-center bg-red-500 text-white rounded-lg px-4 py-2" onClick={addReportMap}>
                    <MdReport className='mr-2' />
                    Reportar
                </button>
            </div>
        </div>
    );
};

export default MapCard;