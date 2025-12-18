
import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import ScholarshipCard from '../../components/ScholarshipCard/ScholarshipCard';


const AllScholarships = () => {
  
    const [scholarship,setScholarships]=useState([])
    const axios=useAxios()
   
    useEffect(()=>{
           axios('/scholarships')
    .then(res=>{
        setScholarships(res.data)
    })
    },[axios])
    return (
        <div className='mt-10  mx-10'>
            <h1 className='text-4xl font-bold text-purple-500 text-center'>All Scholarships</h1>
             <p>Total Scholarships Available is : {scholarship.length}</p>
             <div className='grid grid-cols-3 gap-4'>
                 {
                scholarship.map(scholar=><ScholarshipCard key={scholar._id} scholar={scholar}></ScholarshipCard>)
              }
             </div>
        </div>
    );
};

export default AllScholarships;