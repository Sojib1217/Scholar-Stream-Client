import React from 'react';
import Logo from '../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { MdDashboardCustomize, MdLogout } from 'react-icons/md';

const Navbar = () => {
    const { user, logout } = useAuth()
    const handleLogout = () => {
        logout()
            .then()
            .catch(error => {
                console.log(error)
            })
    }
    const links = <>
        <li className='hover:text-purple-500'><NavLink>Home</NavLink></li>
        <li className='hover:text-purple-500'><NavLink to={'/all-scholarships'}> All Scholarships</NavLink></li>


    </>
    return (
        <div>
            <div className='px-6 md:px-14 shadow-md bg-base-100'>
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
                            <Link to={'/'}><Logo></Logo></Link>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal">
                            <div className='flex gap-6 items-center justify-center text-lg font-bold '>
                                {links}
                            </div>
                        </ul>
                    </div>
                    <div className="navbar-end gap-2 mr-4">

                        {/* dark mode */}



                        {/* buttons */}

                        {
                            user ? <div className="dropdown dropdown-center">
                                <div tabIndex={0} role="button" className="w-14"><img className='w-16 h-16 rounded-full' role='button' src={`${user ? user.photoURL : <FaUserCircle size={40}></FaUserCircle>}`} alt="" /> </div>

                                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 md:w-52 p-2 shadow-sm">
                                   <Link to={'/dashboard'}><button  className='btn bg-purple-500 text-white w-full'>Dashboard <MdDashboardCustomize /></button></Link>
                                    <button onClick={handleLogout} className='btn bg-black text-white mt-2'>Logout <MdLogout /></button>
                                </ul>
                            </div> : <div className='flex gap-3'>
                                <Link to={'/login'}><button className='px-2 py-0 md:px-6 md:py-1 border-2 border-black rounded-xl text-xl font-semibold hover:bg-black hover:text-white'>Login</button></Link>
                                <Link to={'/register'}><button className='hidden md:block md:px-6 py-1 border-2 border-black text-white bg-black rounded-xl text-xl font-semibold hover:bg-white hover:text-black'>Sign Up</button></Link>
                            </div>
                        }





                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;