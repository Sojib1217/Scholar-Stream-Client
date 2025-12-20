import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const MyProfile = () => {
    const { user } = useAuth()
    const {role}=useRole()
    
    return (
        <div className='px-10 py-6'>
            <h1 className='text-4xl font-bold text-center text-blue-600 mb-6'>My Profile</h1>
             <div className="min-h-[60vh] flex items-center justify-center bg-linear-to-br from-purple-200 via-white to-sky-200 p-4">
      
      {/* Card */}
      <div className="w-full max-w-md rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl border border-white/40 p-8">
        
        {/* Avatar */}
        <div className="relative flex justify-center">
          <div className="w-36 h-36 rounded-full bg-linear-to-tr from-purple-500 to-indigo-500 p-1">
            <img
              src={user?.photoURL || 'https://i.ibb.co/2FsfXqM/user.png'}
              alt="Profile"
              className="w-full h-full rounded-full object-cover bg-white"
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-center mt-6 space-y-1">
          <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
            {user?.displayName || 'Anonymous User'}
          </h2>

          <p className="text-sm text-gray-600">
            {user?.email}
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />

        {/* Status */}
        <div className="flex justify-center">
          <span className="px-5 py-1 text-sm font-semibold rounded-full 
            bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-md">
            🎓Role {role} 
          </span>
        </div>

        {/* Actions */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition">
            Edit Profile
          </button>
          <button className="py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
            Settings
          </button>
        </div>

      </div>
    </div>
        </div>
    );
};

export default MyProfile;