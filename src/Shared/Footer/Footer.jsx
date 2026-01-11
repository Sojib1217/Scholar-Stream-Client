import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import Logo from '../../components/Logo/Logo';


const Footer = () => {
    return (
    <footer className="footer bg-black text-white p-10 mt-10">
     <div className='flex flex-col md:flex-row justify-around gap-8'>
       <nav className='md:w-1/4'>
       <div className='flex items-center gap-4'>
      
        <Logo></Logo>
       </div>
          <p className='mt-2'>Empowering students to discover the best scholarships and universities worldwide. We connect ambition with opportunity through trusted guidance and transparent information.</p>
      </nav>
      <nav className='flex flex-col space-y-3'>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">University Exploration</a>
        <a className="link link-hover">Find Scholarships</a>
        <a className="link link-hover">Scholarship Listings</a>
        <a className="link link-hover">Review & Rating System</a>
      </nav>
      <nav className='flex flex-col space-y-3'>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">scholarships</a>
        <a className="link link-hover">student support</a>
      </nav>
      <nav className='flex flex-col space-y-3'>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4 mt-2">
          <FaInstagram className='text-3xl'/>
          
          <FaFacebook className='text-3xl' />
          <FaSquareXTwitter  className='text-3xl'/>
        </div>
      </nav>
     </div>
    <div className='max-w-10/12 mx-auto'>
       <p >© 2026 <span className='text-purple-500'>ScholarStream</span>. All rights reserved.</p>
    </div>
    </footer>
  );
};

export default Footer;