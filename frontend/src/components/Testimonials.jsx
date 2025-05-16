import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Marquee } from "@/components/magicui/marquee";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Patient",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    text: "The online appointment booking system made it so easy to find the right doctor. The consultation was professional and thorough. Highly recommended!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Patient",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    text: "I've been using this platform for all my medical appointments. The doctors are excellent and the booking process is seamless. Great experience every time!",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "New Patient",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    text: "Found a specialist for my condition within minutes. The whole process from booking to consultation was smooth and professional. Thank you!",
  }
];

const Testimonials = () => {
  return (
     <section className="py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
        What Our Patients Say
      </h2>
      <Marquee pauseOnHover={true} speed={50}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 mx-4 w-80 flex-shrink-0 hover:scale-105 transform transition-all duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">“{testimonial.message}”</p>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Testimonials;