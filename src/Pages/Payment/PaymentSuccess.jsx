import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Link, useSearchParams } from 'react-router';


const PaymentSuccess = () => {
    const axios=useAxios()
    const [searchParams]=useSearchParams()
    const sessionId=searchParams.get('session_id')
    const [successInfo,setSuccessInfo]=useState(null)
     useEffect(()=>{
        if(sessionId){
            axios.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                console.log(res)
                setSuccessInfo(res.data)
            })
        }
     },[sessionId,axios])
   
     return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow p-6 text-center">

        {/* ✅ Message */}
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful
        </h1>

        {/* 📄 Scholarship Details */}
        <div className="text-left space-y-2 mb-6">
          <p>
            <strong>Scholarship Name:</strong> {successInfo?.scholarshipName}
          </p>
          <p>
            <strong>University Name:</strong> {successInfo?.university}
          </p>
          <p>
            <strong>Amount Paid :</strong> ${successInfo?.costAmount}
          </p>
        
          
        </div>

        {/* 🔁 Action */}
        <Link to="/dashboard">
          <button className="btn bg-purple-600 text-white w-full">
            Go to Dashboard
          </button>
        </Link>

      </div>
    </div>
  );
};

export default PaymentSuccess;