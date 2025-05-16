import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10">
            {/* Heading */}
            <h1 className="text-4xl font-semibold text-blue-600">Top Doctors to Book</h1>
            <p className="sm:w-2/3 text-center text-gray-600 text-md">
                Browse through our extensive list of trusted doctors and book your appointment with ease.
            </p>

            {/* Doctors Grid */}
            <div className="w-full grid [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] gap-6 pt-6 px-4 sm:px-0">
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/appointment/${item._id}`)}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition transform hover:scale-105 shadow-md hover:shadow-xl bg-white"
                    >
                        {/* Doctor Image */}
                        <img className="w-full h-60 object-cover bg-blue-100" src={item.image} alt={item.name} />
                        
                        {/* Doctor Info */}
                        <div className="p-4 text-center">
                            <div className="flex justify-center items-center gap-2 text-sm text-green-500">
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                <p className="font-medium">Available</p>
                            </div>
                            <p className="text-gray-900 text-lg font-semibold mt-2">{item.name}</p>
                            <p className="text-gray-600 text-md">{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* More Button */}
            <button
                onClick={() => {
                    navigate('/doctors');
                    scrollTo(0, 0);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-14 py-3 rounded-full mt-10 transition transform hover:scale-105 shadow-md"
            >
                View More
            </button>
        </div>
    );
};

export default TopDoctors;
