import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counters, setCounters] = useState({ doctors: 0, patients: 0, specialties: 0 });
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const navigate = useNavigate();

    const features = [
        {
            name: "Trusted",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            name: "Over 50+ videos",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.515a1.75 1.75 0 01-1.75 1.75h-1.5c-.078 0-.155-.005-.23-.015H4.48c-.075.01-.152.015-.23.015h-1.5A1.75 1.75 0 011 15.265V4.75zm16.5 7.385V11.01a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zm-15 2.005v1.125a.25.25 0 00.25.25h1.5a.25.25 0 00.25-.25v-1.125a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25zm2-4.24v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V11.01a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25zm13-2.005V7.88a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zM4.25 7.63a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V7.88a.25.25 0 01.25-.25h1.5zm0-3.13a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25h1.5zm11.5 1.625a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5zm-9 3.125a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            name: "400 ratings",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.381-1.831-4.401z" clipRule="evenodd" />
                </svg>
            )
        }
    ];

    useEffect(() => {
        setIsVisible(true);
        const doctorsTarget = 500;
        const patientsTarget = 50;
        const specialtiesTarget = 20;
        const duration = 2000;
        const steps = 50;
        const interval = duration / steps;
        let currentStep = 0;

        const counterInterval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounters({
                doctors: Math.floor(progress * doctorsTarget),
                patients: Math.floor(progress * patientsTarget),
                specialties: Math.floor(progress * specialtiesTarget)
            });

            if (currentStep >= steps) {
                clearInterval(counterInterval);
                setCounters({
                    doctors: doctorsTarget,
                    patients: patientsTarget,
                    specialties: specialtiesTarget
                });
            }
        }, interval);

        const handleEsc = (event) => {
            if (event.keyCode === 27) setVideoModalOpen(false);
        };

        window.addEventListener('keydown', handleEsc);
        return () => {
            clearInterval(counterInterval);
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = videoModalOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [videoModalOpen]);

    return (
        <div className="w-full max-w-screen-xl mx-auto bg-white rounded-lg px-8 md:px-14 lg:px-28 py-16 shadow-sm">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    Book an Appointment with Trusted Doctors
                </h1>
                <p className={`text-gray-600 text-lg md:text-xl mb-10 max-w-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    Browse our extensive list of trusted doctors and schedule your appointment hassle-free.
                </p>

                {/* Counters */}
                <div className={`flex flex-wrap justify-center gap-8 mb-10 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
                        <span className="text-blue-600 text-3xl font-bold">{counters.doctors}+</span>
                        <span className="text-gray-500">Doctors</span>
                    </div>
                    <div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
                        <span className="text-blue-600 text-3xl font-bold">{counters.patients}k+</span>
                        <span className="text-gray-500">Patients</span>
                    </div>
                    <div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
                        <span className="text-blue-600 text-3xl font-bold">{counters.specialties}+</span>
                        <span className="text-gray-500">Specialties</span>
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                            <div className="text-blue-600">{feature.icon}</div>
                            <span className="text-gray-700 font-medium">{feature.name}</span>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className={`relative mb-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 delay-700`}>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-70 blur-lg animate-pulse"></div>
                    <Button
                        variant="default"
                        size="lg"
                        onClick={() => navigate('/doctors')}
                        className="px-10 py-6 rounded-full text-lg font-medium shadow-lg relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-pink-500 hover:to-purple-600 border-0 hover:scale-105 transition-all duration-500 group overflow-hidden"
                    >
                        <span className="relative z-10">Book Appointment</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce relative z-10" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                    </Button>
                </div>

                {/* Video Thumbnail */}
                <div className={`w-full transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <button onClick={() => setVideoModalOpen(true)} className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden group bg-gray-200 shadow-lg focus:outline-none">
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                            <div className="w-24 h-24 rounded-full bg-white bg-opacity-90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-xl font-medium bg-gradient-to-t from-black to-transparent">
                            See how our booking system works in action
                        </div>
                    </button>
                </div>
            </div>

            {/* Video Modal */}
            {videoModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
                    <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden">
                        <Button variant="outline" size="icon" onClick={() => setVideoModalOpen(false)} className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white bg-opacity-90 text-gray-800 hover:bg-opacity-100 transition-all shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Button>
                        <div className="relative pb-[56.25%]">
                            <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Video Player" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
