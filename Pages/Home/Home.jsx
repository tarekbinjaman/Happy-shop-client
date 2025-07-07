import React from 'react';
import Hero from './HomeComponent/Hero';
import HeroBottom from './HomeComponent/HeroBottom';
import NewArrival from './HomeComponent/NewArrival';

const Home = () => {
    return (
        <div>
           <Hero />
           <HeroBottom />
           <NewArrival />
        </div>
    );
};

export default Home;