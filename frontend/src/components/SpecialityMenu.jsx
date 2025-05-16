import React from 'react';
import { specialityData } from '../assets/assets_frontend/assets';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Brain, 
  Stethoscope,
  Bone, 
  Baby, 
  UserRound, 
  Eye, 

  Pill, 
  HeartPulse 
} from 'lucide-react';

// Comprehensive specialty images mapping
const specialtyImages = {
  Cardiology: "/images/specialties/cardiology.jpg",
  Neurology: "/images/specialties/neurology.jpg",
  Dermatology: "/images/specialties/dermatology.jpg",
  Orthopedics: "/images/specialties/orthopedics.jpg",
  Pediatrics: "/images/specialties/pediatrics.jpg",
  Gynecology: "/images/specialties/gynecology.jpg",
  Ophthalmology: "/images/specialties/ophthalmology.jpg",
  Dentistry: "/images/specialties/dentistry.jpg",
  "General Medicine": "/images/specialties/general-medicine.jpg",
  Psychiatry: "/images/specialties/psychiatry.jpg",
  Urology: "/images/specialties/urology.jpg",
  ENT: "/images/specialties/ent.jpg",
  Endocrinology: "/images/specialties/endocrinology.jpg",
  Pulmonology: "/images/specialties/pulmonology.jpg",
  Gastroenterology: "/images/specialties/gastroenterology.jpg",
  Rheumatology: "/images/specialties/rheumatology.jpg",
  Oncology: "/images/specialties/oncology.jpg",
  Nephrology: "/images/specialties/nephrology.jpg",
};

// Fallback icons for each specialty
const specialtyIcons = {
  Cardiology: <Heart className="w-12 h-12" />,
  Neurology: <Brain className="w-12 h-12" />,
  Dermatology: <UserRound className="w-12 h-12" />,
  Orthopedics: <Bone className="w-12 h-12" />,
  Pediatrics: <Baby className="w-12 h-12" />,
  Gynecology: <UserRound className="w-12 h-12" />,
  Ophthalmology: <Eye className="w-12 h-12" />,
  Dentistry: <Eye className="w-12 h-12" />,
  "General Medicine": <Stethoscope className="w-12 h-12" />,
  Psychiatry: <Brain className="w-12 h-12" />,
  default: <HeartPulse className="w-12 h-12" />,
};

// Placeholder images - use these when no specialty-specific image is available
const placeholderImages = [
  "/images/placeholders/medical-1.jpg",
  "/images/placeholders/medical-2.jpg",
  "/images/placeholders/medical-3.jpg",
  "/images/placeholders/medical-4.jpg",
  "/images/placeholders/medical-5.jpg",
];

const SpecialityMenu = () => {
  // Enhance specialtyData with images ensuring every card has image content
  const enhancedSpecialtyData = specialityData.map((item, index) => {
    // Get specialty-specific image or select a placeholder based on index
    const placeholderImage = placeholderImages[index % placeholderImages.length];
    
    return {
      ...item,
      imageUrl: item.imageUrl || specialtyImages[item.speciality] || placeholderImage,
      icon: item.icon || specialtyIcons[item.speciality] || specialtyIcons.default
    };
  });

  return (
    <div className="w-full py-12 px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Find by Speciality</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse through our extensive list of trusted doctors and schedule your appointment with ease.
        </p>
      </div>
      
      {/* Speciality List - Fixed to 3 cards per row on all screen sizes except mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {enhancedSpecialtyData.map((item, index) => (
          <Link 
            key={index} 
            to={`/doctors?speciality=${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          >
            <Card className="h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              {/* Card Image - Every card will now have an image */}
              <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={`${item.speciality} speciality`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // If image fails to load, show a colored gradient background with icon
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add('fallback-active');
                  }}
                />
                
                {/* Fallback content that shows if image fails to load */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0 fallback">
                  <div className="text-primary">
                    {item.icon}
                  </div>
                </div>
                
                {/* Image overlay for better text contrast */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-16"></div>
                
                {/* Specialty label overlay */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary/90 hover:bg-primary text-white border-0 px-2 py-1">
                    {item.speciality}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pt-4 pb-2">
                <CardTitle className="text-lg font-semibold">{item.speciality}</CardTitle>
              </CardHeader>
              
              <CardContent className="pb-2 pt-0">
                {item.description ? (
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                ) : (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Consult with our expert {item.speciality.toLowerCase()} specialists for comprehensive care and treatment.
                  </p>
                )}
              </CardContent>
              
              <CardFooter className="pt-1 pb-4 flex justify-between items-center">
                <Badge variant="outline" className="text-xs font-normal">
                  {item.doctorCount || `${Math.floor(Math.random() * 20) + 5} Doctors`}
                </Badge>
                <span className="text-xs text-primary font-medium">Explore →</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* Add fallback style for image loading errors */}
      <style jsx>{`
        .fallback-active .fallback {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};
export default SpecialityMenu;