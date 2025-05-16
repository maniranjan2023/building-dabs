import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Filter, Stethoscope } from 'lucide-react';

const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  const specialties = [
    'General-physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 md:px-16 lg:px-24 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your <span className="text-blue-600">Doctor</span>
        </h1>
        <p className="text-gray-600 text-lg">Browse through our specialized doctors.</p>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-8">
        <button 
          className={`flex items-center gap-2 py-2 px-4 rounded-lg text-sm transition-all sm:hidden ${
            showFilter ? 'bg-blue-600 text-white' : 'bg-white border border-blue-200'
          }`} 
          onClick={() => setShowFilter(prev => !prev)}
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>

        <div className={`w-full sm:w-64 space-y-3 ${showFilter ? 'block' : 'hidden sm:block'}`}>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              Specialties
            </h2>
            <div className="space-y-2">
              {specialties.map((spec) => (
                <div
                  key={spec}
                  onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    speciality === spec 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  {spec.replace('-', ' ')}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="w-full max-w-md mx-auto group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img 
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-300" 
                  src={item.image} 
                  alt={item.name} 
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Available</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-blue-600 text-sm font-medium">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;