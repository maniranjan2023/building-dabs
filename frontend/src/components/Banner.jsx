import React from 'react'
import {assets} from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();
    
    return (
        <div className='relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl shadow-xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 right-20 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white opacity-5 rounded-full"></div>
            </div>

            {/* Content Container */}
            <div className="relative flex flex-wrap z-10">
                {/* ---left side--- */}
                <div className='flex-1 py-12 sm:py-14 md:py-16 lg:py-24 lg:pl-5'>
                    <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white'>
                        <h1 className='mb-2 md:mb-4'>Book Appointment</h1>
                        <p className='text-blue-100 mb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
                            with <span className='text-white font-extrabold'>100+ trusted doctors</span>
                        </p>
                        <p className='mt-4 text-base sm:text-lg text-blue-100 font-normal max-w-lg'>
                            Get the best healthcare experience with our qualified medical professionals. Schedule your visit today!
                        </p>
                    </div>
                    
                    <div className='mt-8 flex flex-col sm:flex-row gap-4'>
                        <button 
                            onClick={() => {navigate('/login'); scrollTo(0,0)}} 
                            className='inline-flex items-center justify-center bg-white text-blue-600 px-8 py-3.5 rounded-full text-base font-medium shadow-lg hover:shadow-xl hover:bg-blue-50 transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50'
                        >
                            Create Account
                        </button>
                        
                        <button 
                            onClick={() => {navigate('/doctors'); scrollTo(0,0)}} 
                            className='inline-flex items-center justify-center bg-blue-700 bg-opacity-30 text-white px-8 py-3.5 rounded-full text-base font-medium border border-white border-opacity-20 hover:bg-opacity-40 transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50'
                        >
                            Find Doctors
                        </button>
                    </div>
                    
                    <div className='mt-8 flex items-center gap-6'>
                        <div className='flex -space-x-2'>
                            <img className='w-10 h-10 rounded-full border-2 border-white' src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                            <img className='w-10 h-10 rounded-full border-2 border-white' src="https://randomuser.me/api/portraits/men/46.jpg" alt="User" />
                            <img className='w-10 h-10 rounded-full border-2 border-white' src="https://randomuser.me/api/portraits/women/45.jpg" alt="User" />
                        </div>
                        <div className='text-white'>
                            <p className='font-medium'>Trusted by 10,000+ patients</p>
                            <div className='flex items-center mt-1'>
                                <div className='flex text-yellow-300'>
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                </div>
                                <span className='ml-1 text-sm text-blue-100'>4.9/5</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* ---right side--- */}
                <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                    <div className='absolute -bottom-10 -right-5 w-full max-w-md'>
                        <div className='relative'>
                            <div className='absolute -top-10 -left-10 w-32 h-32 bg-blue-400 rounded-full opacity-30 animate-pulse'></div>
                            <img 
                                className='w-full relative z-10 transform transition-transform duration-700 hover:scale-105' 
                                src={assets.appointment_img} 
                                alt="Doctor with patient" 
                            />
                            
                            {/* Feature callouts */}
                            <div className='absolute top-10 -left-6 bg-white py-2 px-4 rounded-lg shadow-lg flex items-center gap-2 animate-bounce'>
                                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className='text-sm font-medium text-gray-700'>24/7 Service</span>
                            </div>
                            
                            <div className='absolute bottom-24 -right-4 bg-white py-2 px-4 rounded-lg shadow-lg flex items-center gap-2 animate-pulse'>
                                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className='text-sm font-medium text-gray-700'>Trusted Doctors</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner