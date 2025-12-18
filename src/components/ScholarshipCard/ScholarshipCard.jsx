import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Button from '../Button';
import { Link } from 'react-router';

const ScholarshipCard = ({ scholar }) => {

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="card bg-base-100 shadow-md"
    >
      <div className='text-center space-y-2 p-4 shadow-md bg-base-100 rounded-2xl'>
        <img
          src={scholar.universityImage}
          className='w-full h-60 rounded-2xl object-cover'
          alt={scholar.universityName}
        />
        <h1 className='text-xl font-bold'>{scholar.universityName}</h1>
        <p className='font-bold'>Scholarship Category : <span className=' text-purple-500'>{scholar.scholarshipCategory}</span></p>
        <p className='font-bold'>
          Location : <span className='font-bold text-purple-500'>{scholar.universityCity}, {scholar.universityCountry}</span>
        </p>
        <p className='font-bold'>Application Fee : <span className='text-purple-500'>${scholar.applicationFees}</span></p>
       <Link to={`/scholarships/${scholar._id}`}> <Button></Button> </Link> 
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
