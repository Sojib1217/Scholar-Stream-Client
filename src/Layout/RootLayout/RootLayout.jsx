import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto '>
            <header className='sticky top-0 z-50'> 
            <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
            <Footer></Footer>
           
        </div>
    );
};

export default RootLayout;