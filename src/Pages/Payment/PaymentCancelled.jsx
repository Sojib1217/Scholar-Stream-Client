import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useSearchParams } from 'react-router';

const PaymentCancelled = () => {
     const axios=useAxios()
    const [searchParams]=useSearchParams()
    const sessionId=searchParams.get('session_id')
    const [failedInfo,setFailedInfo]=useState({})
     useEffect(()=>{
        if(sessionId){
            axios.get(`/payment-failed?session_id=${sessionId}`)
            .then(res=>{
                
                setFailedInfo({
                    scholarshipName:res.data.scholarshipName,
                  
                })
            })
        }
     },[sessionId,axios])
    
     return (
    <div className="max-w-lg mx-auto text-center mt-20">
      <h1 className="text-3xl font-bold text-red-600">
        ❌ Payment Failed
      </h1>

      <p className="mt-4">
        Scholarship:
        <span className="font-semibold"> {failedInfo?.scholarshipName}</span>
      </p>

      <button className="btn btn-primary mt-6">
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentCancelled;