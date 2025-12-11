import React from 'react';
import Logo from '../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const links = <>
        <li><NavLink>Home</NavLink></li>
        <li><NavLink to={'/all-scholarships'}> All Scholarships</NavLink></li>
       

    </>
    return (
        <div>
        <div className='px-2 md:px-10'>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 shadow">
                            {links}
                        </ul>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Logo></Logo>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal">
                        <div className='flex gap-6 items-center justify-center text-lg font-bold '>
                            {links}
                        </div>
                    </ul>
                </div>
                <div className="navbar-end gap-2">

                    {/* dark mode */}

                   

                    {/* buttons */}
                    
                       
                            <div className='flex items-center gap-2'>
                                <img className='w-12 h-12 rounded-full' alt="" />
                                <Link to={'/login'}><button  className='px-2 md:px-6 py-1 border-2 border-black rounded-xl text-xl font-semibold hover:bg-black hover:text-white'>Logout</button></Link>
                            </div>
                            <div className='flex gap-3'>
                                <Link to={'/login'}><button className='px-2 py-0 md:px-6 md:py-1 border-2 border-black rounded-xl text-xl font-semibold hover:bg-black hover:text-white'>Login</button></Link>
                                <Link to={'/register'}><button className='hidden md:block md:px-6 py-1 border-2 border-black text-white bg-black rounded-xl text-xl font-semibold hover:bg-white hover:text-black'>Sign Up</button></Link>
                            </div>
                    

                    
                </div>
            </div>
        </div>
        </div>
    );
};

export default Navbar;