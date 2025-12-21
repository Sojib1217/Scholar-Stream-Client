

import ScholarshipCard from '../../components/ScholarshipCard/ScholarshipCard';
import Loader from '../../components/Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const AllScholarships = () => {
    const axiosSecure=useAxiosSecure()
    const {data:scholarship=[],isLoading}=useQuery({
        queryKey:['scholarships'],
        queryFn: async ()=>{
            const res= await axiosSecure('/scholarships')
            return res.data
        }
    })
    if(isLoading){
        return <Loader></Loader>
    }
    
    return (
        <div className='mt-10  mx-10'>
            <h1 className='text-4xl font-bold text-purple-500 text-center '>All Scholarships</h1>
            <p className='text-xl font-bold text-center my-4'>Explore Your Dream University to Apply</p>
            
             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                 {
                scholarship.map(scholar=><ScholarshipCard key={scholar._id} scholar={scholar}></ScholarshipCard>)
              }
             </div>
        </div>
    );
};

export default AllScholarships;