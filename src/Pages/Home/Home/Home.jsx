import React from 'react';
import Banner from '../Banner/Banner';
import Reviews from '../Reviews/Reviews';
import FAQ from '../FAQ/FAQ';
const reviewsPromise=fetch('/reviews.json').then(res=>res.json())
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
            <FAQ></FAQ>
            
        </div>
    );
};

export default Home;