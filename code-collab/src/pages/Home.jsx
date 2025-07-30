import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import Hero from '../components/Home/Hero';
import FeatureCard from '../components/Home/FeatureCard';
import Playground from '../components/Home/Playground';
import Testimonial from '../components/Home/Testimonial';
import Confirmation from '../components/Home/Confirmation';
import Footer from '../components/Footer';

const Home = () => {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen ${theme.bg.primary}`}>
            <Header/>
            <Hero/>
            <FeatureCard/>
            <Playground />
            <Testimonial />
            <Confirmation />
            <Footer />
        </div>
    )
};

export default Home;