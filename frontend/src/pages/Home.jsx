import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import HowItWorks from '../components/sections/HowItWorks';
import CTASection from '../components/sections/CTASection';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-white">
            <Navbar />
            <main className="flex-grow">
                <HeroSection />
                <StatsSection />
                <FeaturesSection />
                <HowItWorks />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
