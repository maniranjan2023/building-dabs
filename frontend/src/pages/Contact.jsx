import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { MapPin, Phone, Mail, Briefcase } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 md:px-16 lg:px-24 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
        {/* Image Section */}
        <div className="relative w-full md:w-2/5">
          <div className="absolute -inset-4 bg-blue-600/20 rounded-lg transform -rotate-3 transition-transform"></div>
          <img 
            className="relative w-full rounded-lg shadow-2xl transform transition-transform hover:scale-105 duration-300" 
            src={assets.contact_image} 
            alt="Contact Us" 
          />
        </div>

        {/* Contact Information Section */}
        <div className="w-full md:w-3/5 space-y-12">
          {/* Office Information */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              Our Office
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-gray-600">
                  <p className="font-medium">8727 William Station</p>
                  <p>Suite 350, Washington, USA</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-blue-600" />
                  (415) 555-0132
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-blue-600" />
                  mani@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Career Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              Career at Prescripto
            </h2>
            <p className="text-gray-600 mb-6">
              Learn more about our team and Job Openings
            </p>
            <button className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-lg border border-blue-600 text-blue-600 font-medium transition-colors duration-300 hover:bg-blue-600 hover:text-white">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
