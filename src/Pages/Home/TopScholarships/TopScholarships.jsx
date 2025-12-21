import React, { useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import ScholarshipCard from '../../../components/ScholarshipCard/ScholarshipCard';

const TopScholarships = () => {
     const [topScholarship,setTopScholarships]=useState([])
    const axios=useAxios()
   
    useEffect(()=>{
               axios('/scholarships/top')
        .then(res=>{
            setTopScholarships(res.data)
        })
        },[axios])
console.log(topScholarship)
    return (
        <div className='mt-20 mx-10'>
            <h1 className='text-4xl font-bold text-purple-500 text-center'>Top Scholarships</h1>
                <p className='mt-2 text-center'>Explore the most popular scholarships with affordable fees and high acceptance rates.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
                {
                    topScholarship.map(scholar=><ScholarshipCard key={scholar._id} scholar={scholar}></ScholarshipCard>)
                }
            </div>
        </div>
    );
};

export default TopScholarships;