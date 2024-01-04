import React, { useState } from 'react'
import Header from '../components/landing/Header'
import Advantages from '../components/landing/Advantages';
import Instuction from '../components/landing/Instuction';
import About from '../components/landing/About';
import Faq from '../components/landing/Faq';
import GetInTouch from '../components/landing/GetInTouch';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
    return (
        <div className='min-h-screen flex flex-col items-start overflow-x-hidden'>
            <Header />
            <Advantages />
            <Instuction />
            <About />
            <Faq />
            <GetInTouch />
            <Footer />
        </div>
    )
}

export default LandingPage