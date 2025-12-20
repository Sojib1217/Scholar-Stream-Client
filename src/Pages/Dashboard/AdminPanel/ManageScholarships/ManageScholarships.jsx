import React, { useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


const ManageScholarships = () => {

    const axios = useAxios()
    const [selectedApp, setSelectedApp] = useState(null)
    const { data: scholarships = [],refetch } = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axios.get('/scholarships')
            return res.data
        }
    })
    const { register, handleSubmit } = useForm()
    console.log(scholarships, 'data from manage scholarships')

    const inputStyle = "w-full px-4 py-2 border rounded-lg focus:ring-blue-500 transition duration-200 bg-gray-50 border-gray-300";
    const labelStyle = "block text-sm font-semibold text-gray-700 mb-1";
    const handleUpdateInfo = (data) => {
        axios.patch(`/scholarships/${selectedApp._id}`, data)
            .then(res => {
                console.log(res.data)
                  setSelectedApp(null)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Information has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                      refetch()
                }
            })
    }

     const handleDelete=(id)=>{
     console.log('hello',id)
        axios.delete(`/scholarships/${id}`)
        .then(res=>{
            console.log(res.data)
            if(res.data.deletedCount){
                 Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Scholarship has been delete",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
            }
        })
     }


    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold text-blue-700 mb-6 text-center">Manage Scholarships</h2>

            <div className="overflow-x-auto">
                <table className="table p-4 mx-auto">
                    <thead>
                        <tr >
                            <th className='font-bold text-lg'>No.</th>
                            <th className='font-bold text-lg'>University</th>
                            <th className='font-bold text-lg'>Location</th>
                            <th className='font-bold text-lg'>Subject</th>
                            <th className='font-bold text-lg'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {scholarships.map((scholarship, index) => (
                            <tr key={scholarship._id}>
                                <td>{index + 1}</td>
                                <td>{scholarship.universityName}</td>
                                <td>{scholarship.universityCountry}, {scholarship.universityCity}</td>
                                <td>{scholarship.degree}</td>
                                <td className="space-x-2">
                                    {/* Details*/}
                                    <button
                                        onClick={() => setSelectedApp(scholarship)}
                                        className="btn btn-info">
                                        Details
                                    </button>

                                    {/* Delete */}
                                    <button
                                     onClick={()=>handleDelete(scholarship._id)}
                                    className="btn btn-error">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* review modal */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4">
                            Details of - {selectedApp.universityName}
                        </h2>
                        <form onSubmit={handleSubmit(handleUpdateInfo)} className="space-y-6">

                            {/* --- scholarship and university name Section --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelStyle}>Scholarship Name</label>
                                    <input {...register("scholarshipName", { required: true })} defaultValue={selectedApp.scholarshipName} placeholder="Global Excellence Scholarship" className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>University Name</label>
                                    <input {...register("universityName", { required: true })} defaultValue={selectedApp.universityName} placeholder="Harvard University" className={inputStyle} />
                                </div>
                            </div>

                            {/* --- Location & Ranking --- */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className={labelStyle}>Country</label>
                                    <input {...register("universityCountry", { required: true })} defaultValue={selectedApp.universityCountry} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>City</label>
                                    <input {...register("universityCity", { required: true })} defaultValue={selectedApp.universityCity} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>World Rank</label>
                                    <input type="number" {...register("universityWorldRank")} placeholder="example-- 15" defaultValue={selectedApp.universityWorldRank} className={inputStyle} />
                                </div>
                            </div>

                            {/* --- Categories --- */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className={labelStyle}>Subject Category</label>
                                    <select {...register("subjectCategory")} defaultValue={selectedApp.subjectCategory} className={inputStyle}>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Medicine">Medicine</option>
                                        <option value="ArtsArts & Humanities">Arts & Humanities</option>
                                        <option value="Computer-science">Computer Science</option>
                                        <option value="Business Administration">Business Administration</option>
                                        <option value="Law">Law</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelStyle}>Scholarship Category</label>
                                    <select {...register("scholarshipCategory")} defaultValue={selectedApp.scholarshipCategory} className={inputStyle}>
                                        <option value="Full Fund">Full Fund</option>
                                        <option value="Partial">Partial Fund</option>
                                        <option value="Self-Fund">Self Fund</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelStyle}>Degree</label>
                                    <select {...register("degree")} defaultValue={selectedApp.degree} className={inputStyle}>
                                        <option value="Graduation">Graduation</option>
                                        <option value="Masters">Masters</option>
                                        <option value="Phd">PhD</option>
                                    </select>
                                </div>
                            </div>

                            {/* --- expenses --- */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-blue-50 rounded-xl">
                                <div>
                                    <label className={labelStyle}>Tuition Fees (Optional)</label>
                                    <input type="number" {...register("tuitionFees")} placeholder="$" defaultValue={selectedApp.tuitionFees} className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Application Fees</label>
                                    <input type="number" defaultValue={selectedApp.applicationFees} {...register("applicationFees", { required: true })} placeholder="$" className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Service Charge</label>
                                    <input type="number" defaultValue={selectedApp.serviceCharge} {...register("serviceCharge", { required: true })} placeholder="$" className={inputStyle} />
                                </div>
                            </div>

                            {/* --- image and deadlines --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelStyle}>University Image URL</label>
                                    <input {...register("universityImage", { required: true })} defaultValue={selectedApp.universityImage} placeholder="https://..." className={inputStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Application Deadline</label>
                                    <input type="date" defaultValue={selectedApp.applicationDeadline} {...register("applicationDeadline", { required: true })} className={inputStyle} />
                                </div>
                            </div>

                            {/* --- info --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                                <div>
                                    <label className={labelStyle}>Post By</label>
                                    <input defaultValue={selectedApp.postedUserEmail} {...register("postedUserEmail")} className={`${inputStyle} bg-gray-100 `} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Post Date</label>
                                    <input readOnly {...register("scholarshipPostDate")} defaultValue={new Date().toISOString().split('T')[0]} className={`${inputStyle} bg-gray-100 cursor-not-allowed`} />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedApp(null)}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button type="submit"

                                    className="btn bg-purple-600 text-white">
                                    Save
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );

};

export default ManageScholarships;