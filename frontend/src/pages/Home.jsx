import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Testimonials from '../components/Testimonials'
import { Hero } from '../components/ui/animated-hero'


const Home = () => {
  return (
    <div>
        <Hero/>
        <SpecialityMenu/>
        <TopDoctors/>
      
        <Banner/>
        <Testimonials/>
    </div>
  )
}

export default Home