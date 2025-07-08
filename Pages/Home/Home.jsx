import React from 'react';
import Hero from './HomeComponent/Hero';
import HeroBottom from './HomeComponent/HeroBottom';
import NewArrival from './HomeComponent/NewArrival';
import TopSelling from './HomeComponent/TopSelling';

const Home = () => {
    return (
        <div>
           <Hero />
           <HeroBottom />
           <NewArrival />
           <TopSelling />
        </div>
    );
};

export default Home;