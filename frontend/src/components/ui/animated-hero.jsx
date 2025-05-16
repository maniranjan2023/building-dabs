import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ doctors: 0, patients: 0, specialties: 0 });
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["easy", "quick", "secure", "reliable", "smart"], []);
  const navigate = useNavigate();

  const features = [
    { name: "Trusted by thousands", icon: <MoveRight className="w-5 h-5 text-yellow-500" /> },
    { name: "50k+ successful appointments", icon: <PhoneCall className="w-5 h-5 text-yellow-500" /> },
    { name: "Rated 4.9/5", icon: <MoveRight className="w-5 h-5 text-yellow-500" /> },
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
        specialties: Math.floor(progress * specialtiesTarget),
      });

      if (currentStep >= steps) {
        clearInterval(counterInterval);
        setCounters({
          doctors: doctorsTarget,
          patients: patientsTarget,
          specialties: specialtiesTarget,
        });
      }
    }, interval);

    const handleEsc = (event) => {
      if (event.key === "Escape") setVideoModalOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      clearInterval(counterInterval);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  useEffect(() => {
    document.body.style.overflow = videoModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [videoModalOpen]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-10 lg:py-20 items-center justify-center flex-col">
          <div>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Learn how it works <MoveRight className="inline ml-2 w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">Your health, our priority —</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Book appointments with verified doctors across specialties in just a few clicks. No more waiting in queues or uncertainty — your care begins here.
            </p>
          </div>

          {/* Counters */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
              <span className="text-yellow-500 text-3xl font-bold">{counters.doctors}+</span>
              <span className="text-gray-500">Doctors</span>
            </div>
            <div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
              <span className="text-yellow-500 text-3xl font-bold">{counters.patients}k+</span>
              <span className="text-gray-500">Patients Served</span>
            </div>
            <div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
              <span className="text-yellow-500 text-3xl font-bold">{counters.specialties}+</span>
              <span className="text-gray-500">Specialties</span>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                <div>{feature.icon}</div>
                <span className="text-gray-700 font-medium">{feature.name}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-row gap-3 flex-wrap justify-center"
          >
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Talk to Support <PhoneCall className="inline w-4 h-4 ml-2" />
            </button>

            <button
              onClick={() => navigate("/doctors")}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Book Appointment <MoveRight className="inline w-4 h-4 ml-2" />
            </button>

            <button
              onClick={() => setVideoModalOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Watch Demo Video <PlayCircle className="inline w-5 h-5 ml-2" />
            </button>
          </motion.div>

          {/* Video Modal */}
          {videoModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
              <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden">
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-full transition-shadow shadow-lg"
                >
                  ✕
                </button>
                <div className="relative pb-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Demo Video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Hero };
