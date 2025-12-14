import React from 'react';
import { MdComment } from 'react-icons/md';

const ReviewCard = ({review}) => {
   
    return (
        <div className="max-w-sm bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      {/* Quote Icon */}
      <MdComment className="text-purple-500 text-3xl mb-4" />

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-6">
       {review.review}
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-4"></div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-teal-800 rounded-full">
            <img src={review.photo} alt="" className='rounded-full' />
        </div>
        <div>
          <h3 className="font-semibold">{review.name}</h3>
          <p className="text-sm text-gray-500">Studies {review.degree}</p>
        </div>
      </div>
    </div>
    );
};

export default ReviewCard;