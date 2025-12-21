

import ScholarshipCard from '../../components/ScholarshipCard/ScholarshipCard';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';


const AllScholarships = () => {
    const axiosSecure = useAxiosSecure()
    const [searchText, setSearchText] = useState('')
    const { data: scholarship = [], } = useQuery({
        queryKey: ['scholarships',searchText],
        queryFn: async () => {
            const res = await axiosSecure(`/scholarships?searchText=${searchText}`)
            return res.data
        }
    })
    

    return (
        <div className='mt-10  mx-10'>
            <h1 className='text-4xl font-bold text-purple-500 text-center '>All Scholarships</h1>
            <p className='text-xl font-bold text-center my-4'>Explore Your Dream University to Apply</p>
            
            <label className="input my-3">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                onChange={(e)=>setSearchText(e.target.value)}
                type="search" required placeholder="Search" />
            </label>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    scholarship.map(scholar => <ScholarshipCard key={scholar._id} scholar={scholar}></ScholarshipCard>)
                }
            </div>
        </div>
    );
};

export default AllScholarships;