import React from 'react';
import bannerImg from '../../../assets/banner.jpg';
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { Link } from 'react-router';
import { FaArrowRightArrowLeft, FaArrowRightLong } from 'react-icons/fa6';

const Banner = () => {
    return (
        <div className='flex flex-col md:mx-10 md:flex-row justify-between items-center p-4 gap-6 mt-10'>
          
            <motion.div className='flex-1 space-y-3 text-center md:text-start'
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className="text-2xl md:text-4xl font-bold">Welcome to <span className='text-purple-500'>ScholarStream</span> <br /> Scholarship Management Platform</h1>
                <p className='w-full md:w-5/6 text-gray-600'>ScholarStream is a simple and efficient platform where students can find and apply for global scholarships in one place. It provides clear details, deadlines, and funding information, while admins can easily post and manage scholarship listings. </p>
               <Link to={'/all-scholarships'}> <button className='btn bg-purple-500 hover:bg-black text-white'>Search Scholarships<FaArrowRightLong/> </button></Link>
            </motion.div>

         
            <motion.div className='flex-1'
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                data-aos="flip-up"
            >
                <img
                    src={bannerImg}
                    alt="Scholarship"
                    className="rounded-3xl shadow-lg"
                />
            </motion.div>
        </div>
    );
};

export default Banner;