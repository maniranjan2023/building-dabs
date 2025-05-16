import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, backendUrl, token, getDoctorData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const navigate = useNavigate();

    // Fetch doctor info
    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId);
        setDocInfo(docInfo);
    };

    // Get available slots for booking
    const getAvailableSlots = async () => {
        setDocSlots([]); // Reset slots
        let today = new Date();
        let allSlots = [];

        for (let i = 0; i < 7; ++i) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0);

            if (i === 0) {
                let now = new Date();
                if (now.getHours() >= 10) {
                    currentDate.setHours(now.getHours() + (now.getMinutes() > 30 ? 1 : 0));
                    currentDate.setMinutes(now.getMinutes() > 30 ? 0 : 30);
                } else {
                    currentDate.setHours(10, 0);
                }
            } else {
                currentDate.setHours(10, 0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
                let isSlotAvailable = !(docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime));

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    });
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            allSlots.push(timeSlots);
        }
        setDocSlots(allSlots);
    };

    // Book an appointment
    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Login to book appointment');
            return navigate('/login');
        }

        try {
            const date = new Date(docSlots[slotIndex][0].datetime);
            let slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

            const { data } = await axios.post(
                `${backendUrl}/api/user/book-appointment`,
                { docId, slotDate, slotTime },
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.success) {
                toast.success(data.message);
                await getDoctorData();
                navigate('/My-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    return (
        docInfo && (
            <div className="px-6 py-8">
                {/* Doctor Details Section */}
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Doctor Image */}
                    <div>
                        <img className="w-full sm:max-w-72 rounded-lg bg-blue-500" src={docInfo.image} alt={docInfo.name} />
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-md">
                        <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                            {docInfo.name}
                            <img className="w-5" src={assets.verified_icon} alt="Verified" />
                        </p>
                        <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                            <p>
                                {docInfo.degree} - {docInfo.speciality}
                            </p>
                            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
                        </div>

                        {/* Doctor About Section */}
                        <div className="mt-3">
                            <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                                About <img src={assets.info_icon} alt="Info" />
                            </p>
                            <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
                        </div>

                        <p className="text-gray-500 font-medium mt-4">
                            Appointment fee: <span className="text-gray-600">${docInfo.fees}</span>
                        </p>
                    </div>
                </div>

                {/* Booking Slots Section */}
                <div className="sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-700">
                    <p>Booking Slots</p>

                    {/* Days Selection */}
                    <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                        {docSlots.length > 0 &&
                            docSlots.map((items, index) =>
                                items[0] ? (
                                    <div
                                        key={index}
                                        onClick={() => setSlotIndex(index)}
                                        className={`text-center py-4 px-4 min-w-16 rounded-full cursor-pointer transition ${
                                            slotIndex === index ? 'bg-blue-500 text-white' : 'border border-gray-200'
                                        }`}
                                    >
                                        <p>{daysOfWeek[items[0].datetime.getDay()]}</p>
                                        <p>{items[0].datetime.getDate()}</p>
                                    </div>
                                ) : null
                            )}
                    </div>

                    {/* Time Slots */}
                    <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                        {docSlots.length > 0 &&
                            docSlots[slotIndex].map((item, index) => (
                                <p
                                    key={index}
                                    onClick={() => setSlotTime(item.time)}
                                    className={`text-sm font-light px-5 py-2 rounded-full cursor-pointer transition ${
                                        item.time === slotTime ? 'bg-blue-500 text-white' : 'text-gray-400 border border-gray-300'
                                    }`}
                                >
                                    {item.time.toLowerCase()}
                                </p>
                            ))}
                    </div>

                    {/* Book Appointment Button */}
                    <button
                        onClick={bookAppointment}
                        className="bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6"
                    >
                        Book an Appointment
                    </button>
                </div>

                {/* Related Doctors Section */}
                <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
            </div>
        )
    );
};

export default Appointment;
