import React from 'react';
import Hero from './HomeComponent/Hero';
import HeroBottom from './HomeComponent/HeroBottom';
import NewArrival from './HomeComponent/NewArrival';
import TopSelling from './HomeComponent/TopSelling';
import BrowseBy from './HomeComponent/BrowseBy';
import ReviewComponent from './HomeComponent/ReviewComponent';

const Home = () => {
    return (
        <div>
           <Hero />
           <HeroBottom />
           <NewArrival />
           <TopSelling />
           <BrowseBy />
           <ReviewComponent />
        </div>
    );
};

export default Home;