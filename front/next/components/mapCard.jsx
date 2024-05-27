import React, { useState } from 'react';
import { BiSolidLike } from "react-icons/bi";
import { MdReport } from "react-icons/md";
import { BiSolidDislike } from "react-icons/bi";
import { likeMap, dislikeMap, reportMap } from '../services/communicationManager';
import useStore from '../src/store';

const MapCard = ({ map }) => {
    const URL = 'http://localhost:8000';
    const [reason, setReason] = useState([]);
    const [otherReasons, setOtherReasons] = useState('');
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    var likesMap = map.likes;

    const addLikeMap = () => {
        const mapData = {
            map_id: map.id
        };

        likeMap(mapData).then((data) => {
            console.log(data);
            setLiked(true);
            setDisliked(false);
        });

        likesMap = likesMap + 1;
    };

    const addDislikeMap = () => {
        const mapData = {
            map_id: map.id
        };

        dislikeMap(mapData).then((data) => {
            console.log(data);
            setLiked(false);
            setDisliked(true);
        });

        likesMap = likesMap - 1;
    };

    const addReportMap = () => {
        
        if (reason.length == 0 && otherReasons == '') {
            return;
        } else if (reason.length == 0 && otherReasons != '') {
            const addOtherReason = 'Altres motius: ' + otherReasons;
            reason.push(addOtherReason);
        } else if (reason.length > 0 && otherReasons != '') {
            const addOtherReason = 'Altres motius: ' + otherReasons;
            reason.push(addOtherReason);
        }

        var reportData = {};

        if ( useStore.getState().user.id == null ) {
            reportData = {
                map_id: map.id,
                reason: JSON.stringify(reason)
            };

            reportMap(reportData).then((data) => {
                console.log(data);
                setShowModal(false); 
            });
        } else {
            reportData = {
                map_id: map.id,
                reason: JSON.stringify(reason),
                user_id: useStore.getState().user.id
            };

            reportMap(reportData).then((data) => {
                console.log(data);
                setShowModal(false); 
            });
        }

        
    
    };

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const checked = event.target.checked;

        if (checked && !reason.includes(value)) {
            setReason([...reason, value]);
        } else if (!checked && reason.includes(value)) {
            setReason(reason.filter((r) => r !== value));
        }
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
                    <button
                        className={`flex items-center rounded-lg px-3 py-2 ${liked ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                        onClick={!liked ? addLikeMap : null}
                        disabled={liked}
                    >
                        {likesMap}
                        <BiSolidLike className='ml-1 hover:animate-bounce' />
                    </button>
                    <button
                        className={`flex items-center rounded-lg px-3 py-2 ${disliked ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                        onClick={!disliked ? addDislikeMap : null}
                        disabled={disliked}
                    >
                        <BiSolidDislike className='hover:animate-bounce' />
                    </button>
                </div>
                <button className="flex items-center bg-red-500 text-white rounded-lg px-4 py-2" onClick={() => setShowModal(true)}>
                    <MdReport className='mr-2' />
                    Reportar
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg lg:min-w-[550px] md:min-w-[450px]">
                        <h2 className="text-2xl font-bold mb-4">Reportar Mapa</h2>
                        <p className="text-gray-500 mb-4">Indica els motius pels quals vols reportar aquest mapa:</p>
                        <div className='m-4'>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    value="mapa incomplet"
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                Mapa incomplet
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    value="no vàlid"
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                No vàlid
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    value="obscè"
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                Obscè
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    value="contingut inapropiat"
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                Contingut inapropiat
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    value="contingut duplicat"
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                Contingut duplicat
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    value="contingut violent"
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                Contingut violent
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    value="contingut sexual"
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                Contingut sexual
                            </label>
                        </div>
                        <textarea
                            value={otherReasons}
                            onChange={(e) => setOtherReasons(e.target.value)}
                            placeholder="Escriu altres motius..."
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <div className="flex justify-end">
                            <button className="bg-gray-500 text-white rounded-lg px-4 py-2 mr-2" onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                            <button className="bg-red-500 text-white rounded-lg px-4 py-2" onClick={addReportMap}>
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapCard;