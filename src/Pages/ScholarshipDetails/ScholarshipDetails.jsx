import { useQuery } from '@tanstack/react-query';

import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';

const ScholarshipDetails = () => {

  const { id } = useParams()
  const { user } = useAuth()
  const axios = useAxios()
  const { data: scholar = [] } = useQuery({
    queryKey: ['scholarships', id],
    queryFn: async () => {
      const res = await axios.get(`/scholarships/${id}`)
      return res.data
    }
  })


  // const getCoverageText = (scholar) => {
  //   switch (scholar.scholarshipCategory) {
  //     case "Full Fund":
  //       return "This full-funded scholarship covers full tuition fees, provides a monthly living stipend, free accommodation, medical insurance, and travel support.";
  //     case "Partial":
  //       return "This partially-funded scholarship covers some tuition fees or study-related expenses. Students are responsible for the remaining costs, including accommodation and travel.";
  //     case "Self-Fund":
  //       return "This scholarship does not provide financial support. Students are responsible for all tuition, accommodation, and living expenses.";
  //     default:
  //       return "Coverage details not available.";
  //   }
  // };
  const getCoverageText = () => {
    if (scholar.scholarshipCategory === "Full Fund") {
      return "This full-funded scholarship covers full tuition fees, monthly living stipend, accommodation, medical insurance, and travel costs.";
    }
    if (scholar.scholarshipCategory === "Partial") {
      return "This partially-funded scholarship covers some tuition fees or academic expenses. Students must manage remaining costs.";
    }
    if (scholar.scholarshipCategory === "Self-fund") {
      return "This scholarship does not provide financial support. Students are responsible for all study and living expenses.";
    }
    return "Coverage details not available.";
  };

  const handleApply = async (scholar) => {
    const applicationData = {
      scholarshipName: scholar.scholarshipName,
      scholarshipId: scholar._id,
      userId: user._id,
      userName: user.displayName,
      userEmail: user.email,
      universityName: scholar.universityName,
      scholarshipCategory: scholar.scholarshipCategory,
      universityCity:scholar.universityCity,
      universityCountry:scholar.universityCountry,
      applicationFees: scholar.applicationFees,
      serviceCharge: scholar.serviceCharge,

    }
    const response = await axios.post('/applications', applicationData)
    const applicationId=response.data.insertedId;
    
    
    const scholarshipInfo = {
      universityName: scholar.universityName,
      universityCity: scholar.universityCity,
      // universityCountry: scholar.universityCountry,
      // subjectCategory: scholar.subjectCategory,
      applicationFees: scholar.applicationFees,
      studentEmail: user?.email,
      scholarshipId: scholar._id,
      scholarshipName: scholar.scholarshipName,
      applicationId:applicationId,
      charge: applicationData.serviceCharge
      
    }
    const res = await axios.post('/payment-checkout-session', scholarshipInfo)
    console.log(res.data)

    window.location.href = res.data.url
    
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* 🔹 Header Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">

        <img
          src={scholar.universityImage}
          alt={scholar.universityName}
          className="w-full h-80 rounded-2xl shadow-md"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-purple-600">
            {scholar.scholarshipName}
          </h1>

          <p className="text-xl font-semibold">
            {scholar.universityName}
          </p>

          <p className="text-gray-600">
            📍 {scholar.universityCity}, {scholar.universityCountry}
          </p>

          <p className="text-gray-600">
            🌍 World Rank: <span className='text-purple-500 font-semibold'>#{scholar.universityWorldRank}</span>
          </p>

          <p className="text-sm bg-purple-100 inline-block px-3 py-1 rounded-full">
            {scholar.scholarshipCategory} • {scholar.degree}
          </p>
        </div>
      </div>

      {/* 🔹 Description */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Scholarship Description</h2>
        <p className="text-gray-700 leading-relaxed">
          This scholarship opportunity is offered by {scholar.universityName} for students pursuing a {scholar.degree} degree in {scholar.subjectCategory}.
          It aims to support talented students in achieving academic excellence and global exposure.
        </p>
      </div>

      {/* 🔹 Stipend & Coverage */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Coverage</h2>
        <p className="text-gray-700 leading-relaxed">
          {getCoverageText(scholar.scholarshipCategory)}
        </p>
      </div>

      {/* 🔹 Fees & Deadline */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">

        <div className="p-6 border rounded-xl space-y-2">
          <p><strong>Application Fee:</strong> <span className='text-purple-500 font-semibold'> ${scholar.applicationFees}</span></p>
          <p><strong>Service Charge:</strong> <span className='text-purple-500 font-semibold'> ${scholar.serviceCharge}</span></p>
          <p><strong>Deadline:</strong><span className='text-purple-500 font-semibold'> {scholar.applicationDeadline}</span></p>
        </div>

        <div className="flex items-center justify-center">
          <button onClick={() => handleApply(scholar)} className="btn bg-purple-600 hover:bg-purple-800 border-none text-white w-full md:w-auto px-10">
            Apply for Scholarship
          </button>
        </div>

      </div>
      <div>
        <h1>Review Section will add after</h1>
      </div>
    </div>
  );
};

export default ScholarshipDetails;