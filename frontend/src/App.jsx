import React, { useEffect } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';

import { Pointer } from "@/components/magicui/pointer";
const App = () => {
  useEffect(() => {
      (function (w, d, s, o, f, js, fjs) {
        w["botsonic_widget"] = o;
        w[o] =
          w[o] ||
          function () {
            (w[o].q = w[o].q || []).push(arguments);
          };
        js = d.createElement(s);
        fjs = d.getElementsByTagName(s)[0];
        js.id = o;
        js.src = f;
        js.async = 1;
        fjs.parentNode.insertBefore(js, fjs);
      })(window, document, "script", "Botsonic", "https://widget.botsonic.com/CDN/botsonic.min.js");
  
      window.Botsonic &&
        window.Botsonic("init", {
          serviceBaseUrl: "https://api-azure.botsonic.ai",
          token: "eb0f6da4-ccd3-42b8-8399-e1b721461859",
        });
    }, []);


    
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      if (window.google) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      }
    };

    addGoogleTranslateScript();
  }, []);
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4">
    {/* Google Translate Section - Properly Centered */}
    {/* <SmoothCursor/> */}
     <Pointer/>
    
    <ToastContainer/>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/My-profile' element={<MyProfile/>}/>
        <Route path='/My-appointments' element={<MyAppointments/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>
      </Routes>
      
      <Footer/>


    </div>
  )
}

export default App