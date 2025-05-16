import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { Users, Target, Zap, Clock, Palette } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 md:px-16 lg:px-24 py-16">
      {/* About Us Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">
          About <span className="text-blue-600">Us</span>
        </h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
        <div className="relative w-full md:w-2/5">
          <div className="absolute -inset-4 bg-blue-600/20 rounded-lg transform rotate-3 transition-transform group-hover:rotate-6"></div>
          <img 
            className="relative w-full rounded-lg shadow-2xl transform transition-transform hover:scale-105 duration-300" 
            src={assets.about_image} 
            alt="About Us" 
          />
        </div>
        <div className="flex flex-col gap-8 md:w-3/5">
          <p className="text-gray-600 text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio repudiandae sed optio quam voluptate sequi nemo ipsam odio explicabo quas.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aliquam nam aliquid facilis. At excepturi fuga minus quas laboriosam provident.
          </p>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Our Vision
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium molestiae vitae, facilis deserunt corrupti nemo voluptate distinctio, cupiditate veritatis.
            </p>
          </div>
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          Why <span className="text-blue-600">Choose Us</span>
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            icon: <Zap className="w-8 h-8" />,
            title: 'Efficiency',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit consequatur.'
          },
          {
            icon: <Clock className="w-8 h-8" />,
            title: 'Convenience',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit consequatur.'
          },
          {
            icon: <Palette className="w-8 h-8" />,
            title: 'Personalization',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit consequatur.'
          }
        ].map((item, index) => (
          <div 
            key={index} 
            className="group bg-white px-8 py-12 text-center flex flex-col items-center gap-4 rounded-2xl shadow-lg border border-blue-100 hover:border-blue-500 transition-all duration-300 hover:transform hover:-translate-y-2"
          >
            <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-500 transition-colors duration-300">
              <div className="text-blue-500 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
