import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', userData.address);
            formData.append('dob', userData.dob);
            formData.append('gender', userData.gender);
            image && formData.append('image', image);

            const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
                headers: { authorization: `Bearer ${token}` },
            });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    return (
        userData && (
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                    {isEdit ? (
                        <label htmlFor="image" className="relative cursor-pointer">
                            <img className="w-36 h-36 rounded-full object-cover border-2 border-blue-300 shadow-md opacity-75 hover:opacity-100 transition-all" 
                                 src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                            <img className="absolute bottom-2 right-2 w-10 bg-white rounded-full shadow-md" src={assets.upload_icon} alt="Upload" />
                            <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
                        </label>
                    ) : (
                        <img className="w-36 h-36 rounded-full object-cover border-2 border-gray-300 shadow-md" src={userData.image} alt="" />
                    )}
                </div>

                {/* Name */}
                <div className="text-center mt-4">
                    {isEdit ? (
                        <input className="bg-gray-100 text-2xl font-semibold text-center border border-gray-300 rounded-lg p-2 w-3/4"
                            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                            value={userData.name}
                            type="text" />
                    ) : (
                        <p className="text-2xl font-semibold text-gray-800">{userData.name}</p>
                    )}
                </div>

                <hr className="bg-gray-300 my-4" />

                {/* Contact Information */}
                <div>
                    <p className="text-blue-600 font-semibold">Contact Information</p>
                    <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-gray-700">
                        <p className="font-medium">Email:</p>
                        <p className="text-blue-500">{userData.email}</p>

                        <p className="font-medium">Phone:</p>
                        {isEdit ? (
                            <input className="bg-gray-100 border rounded-lg p-1" type="text" 
                                value={userData.phone} 
                                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))} />
                        ) : (
                            <p className="text-blue-500">{userData.phone}</p>
                        )}

                        <p className="font-medium">Address:</p>
                        {isEdit ? (
                            <div className="space-y-1">
                                <input className="bg-gray-100 border rounded-lg p-1 w-full" type="text" 
                                    value={userData.address.line1}
                                    onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                                <input className="bg-gray-100 border rounded-lg p-1 w-full" type="text" 
                                    value={userData.address.line2}
                                    onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                            </div>
                        ) : (
                            <p className="text-gray-500">{userData.address.line1}<br />{userData.address.line2}</p>
                        )}
                    </div>
                </div>

                <hr className="bg-gray-300 my-4" />

                {/* Basic Information */}
                <div>
                    <p className="text-blue-600 font-semibold">Basic Information</p>
                    <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-gray-700">
                        <p className="font-medium">Gender:</p>
                        {isEdit ? (
                            <select className="bg-gray-100 border rounded-lg p-1 w-24" 
                                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))} 
                                value={userData.gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : (
                            <p className="text-gray-500">{userData.gender}</p>
                        )}

                        <p className="font-medium">Birthday:</p>
                        {isEdit ? (
                            <input className="bg-gray-100 border rounded-lg p-1" type="date" 
                                value={userData.dob}
                                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))} />
                        ) : (
                            <p className="text-gray-500">{userData.dob}</p>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center mt-8">
                    {isEdit ? (
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
                            onClick={updateUserProfileData}>
                            Save Information
                        </button>
                    ) : (
                        <button className="bg-gray-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-600 transition-all"
                            onClick={() => setIsEdit(true)}>
                            Edit
                        </button>
                    )}
                </div>
            </div>
        )
    );
};

export default MyProfile;
