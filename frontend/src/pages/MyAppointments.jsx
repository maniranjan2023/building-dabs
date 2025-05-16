import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyAppointments = () => {
    const { backendUrl, token, getDoctorData } = useContext(AppContext);
    const [appointment, setAppointment] = useState([]);
    
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
    };

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/appointment`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (data.success) {
                setAppointment(data.appointment.reverse());
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, 
                { appointmentId }, 
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
                getDoctorData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <p className="pb-4 mt-8 text-2xl font-semibold text-gray-800 border-b">My Appointments</p>

            <div className="mt-4 space-y-6">
                {appointment.length > 0 ? (
                    appointment.map((item, index) => (
                        <div className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-4 border" key={index}>
                            {/* Doctor's Image */}
                            <div className="flex-shrink-0">
                                <img className="w-32 h-32 object-cover rounded-lg shadow-md" src={item.docData.image} alt="Doctor" />
                            </div>

                            {/* Appointment Details */}
                            <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                                <p className="text-lg font-semibold text-gray-900">{item.docData.name}</p>
                                <p className="text-gray-600">{item.docData.speciality}</p>

                                <p className="text-gray-700 font-medium mt-2">Address:</p>
                                <p className="text-sm text-gray-500">{item.docData.address?.line1}</p>
                                <p className="text-sm text-gray-500">{item.docData.address?.line2}</p>

                                <p className="text-gray-800 font-medium mt-2">
                                    Date & Time: <span className="text-gray-700">{slotDateFormat(item.slotDate)} | {item.slotTime}</span>
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-3 mt-4 sm:mt-0">
                                {!item.cancelled && (
                                    <button className="px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all">
                                        Pay Online
                                    </button>
                                )}
                                {!item.cancelled && (
                                    <button 
                                        onClick={() => cancelAppointment(item._id)}
                                        className="px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-all"
                                    >
                                        Cancel Appointment
                                    </button>
                                )}
                                {item.cancelled && (
                                    <button className="px-5 py-2 text-sm font-medium text-red-500 border border-red-500 rounded-lg shadow-md cursor-not-allowed">
                                        Appointment Cancelled
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center mt-6">No Appointments Found</p>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;
