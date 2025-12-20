import React from 'react';
import { Link, Outlet } from 'react-router';

import { FaHistory, FaUsers, FaWpforms } from 'react-icons/fa';
import { SiGooglescholar } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { MdAnalytics } from "react-icons/md";

import { CgProfile } from "react-icons/cg";
import useRole from '../../hooks/useRole';




const Dashboard = () => {
 const {role}=useRole()
 console.log(role)
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-purple-200">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className='text-2xl font-bold text-blue-700'>My Dashboard</div>
        </nav>
        {/* Page content here */}
        
        <Outlet></Outlet>

      </div>

      <div className="drawer-side is-drawer-close:overflow-visible ">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-sky-200 is-drawer-close:w-14 is-drawer-open:w-64 pr-2">
          {/* Sidebar content here */}
          <ul className="menu w-full grow ">
            {/* List item */}
            <li>
              <Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-6"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                <span className="is-drawer-close:hidden">Home</span>
              </Link>
            </li>
            {/* my-profile */}
            <li>
              <Link to={'/dashboard/my-profile'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                {/* parcel icon */}
                <CgProfile className='text-2xl'/>
                <span className="is-drawer-close:hidden">My Profile</span></Link>
            </li>


            {/* admin role panel */}

            {role === 'admin' && <>
             {/* Add Scholarship */}
            <li>
              <Link to={'/dashboard/add-scholarships'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Scholarship">
                {/* parcel icon */}
                <SiGooglescholar className='text-2xl'/>
                <span className="is-drawer-close:hidden">Add Scholarship</span></Link>
            </li>
            {/* manage scholarships */}
            <li>
              <Link to={'/dashboard/manage-scholarships'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Scholarships">
                {/* parcel icon */}
               <PiStudentFill className='text-2xl'/>
                <span className="is-drawer-close:hidden">Manage Scholarships</span></Link>
            </li>
            {/* manage users */}
            <li>
              <Link to={'/dashboard/manage-users'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users">
                {/* parcel icon */}
                <FaUsers className='text-2xl'/>
                <span className="is-drawer-close:hidden">Manage Users</span></Link>
            </li>
            {/* analytics */}
            <li>
              <Link to={'/dashboard/analytics'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Analytics">
                {/* parcel icon */}
                <MdAnalytics className='text-2xl'/>
                <span className="is-drawer-close:hidden">Analytics</span></Link>
            </li>
            </>}



               {/* moderator role wise panel  */}
            {
              role==='moderator' && <>
              <li>
              <Link to={'/dashboard/manage-applied-application'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Applied Applications">
                {/* parcel icon */}
                <FaWpforms />
                <span className="is-drawer-close:hidden">Manage Applied Applications</span></Link>
            </li>
            <li>
              <Link to={'/dashboard/all-reviews'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Reviews">
                {/* parcel icon */}
                <FaHistory />
                <span className="is-drawer-close:hidden">All Reviews</span></Link>
            </li>
              </>
            }


            
            {
              role === 'student' && <>
               {/* my-applications */}
            <li>
              <Link to={'/dashboard/my-applications'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Applications">
                {/* parcel icon */}
                <FaWpforms />
                <span className="is-drawer-close:hidden">My Applications</span></Link>
            </li>
            {/* my reviews */}
            <li>
              <Link to={'/dashboard/my-reviews'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Reviews">
                {/* parcel icon */}
                <FaHistory />
                <span className="is-drawer-close:hidden">My Reviews</span></Link>
            </li>
              </>
            }
           
            

            
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;