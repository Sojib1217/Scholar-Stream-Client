import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import useAxios from '../../../../hooks/useAxios';
import Swal from 'sweetalert2';

const AddScholarship = () => {

    const { user } = useAuth()
    const axios = useAxios()
    console.log(user)
    const { register, handleSubmit,reset } = useForm();

    const handleAddScholarship = (data) => {
        console.log("Scholarship Data:", data);
        axios.post('/scholarships', data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Scholarship has been created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset()
                }

            })
            .catch(err => console.log(err))

    };

    const inputStyle = "w-full px-4 py-2 border rounded-lg focus:ring-blue-500 transition duration-200 bg-gray-50 border-gray-300";
    const labelStyle = "block text-sm font-semibold text-gray-700 mb-1";

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl my-10 border border-gray-100">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-sky-700 my-2">Add New Scholarship</h2>
                <p className="text-gray-500">Fill in the details below to list a new opportunity.</p>
            </div>

            <form onSubmit={handleSubmit(handleAddScholarship)} className="space-y-6">

                {/* --- scholarship and university name Section --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelStyle}>Scholarship Name</label>
                        <input {...register("scholarshipName", { required: true })} placeholder="Global Excellence Scholarship" className={inputStyle} />
                    </div>
                    <div>
                        <label className={labelStyle}>University Name</label>
                        <input {...register("universityName", { required: true })} placeholder="Harvard University" className={inputStyle} />
                    </div>
                </div>

                {/* --- Location & Ranking --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelStyle}>Country</label>
                        <input {...register("universityCountry", { required: true })} className={inputStyle} />
                    </div>
                    <div>
                        <label className={labelStyle}>City</label>
                        <input {...register("universityCity", { required: true })} className={inputStyle} />
                    </div>
                    <div>
                        <label className={labelStyle}>World Rank</label>
                        <input type="number" {...register("universityWorldRank")} placeholder="example-- 15" className={inputStyle} />
                    </div>
                </div>

                {/* --- Categories --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelStyle}>Subject Category</label>
                        <select {...register("subjectCategory")} className={inputStyle}>
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
                        <select {...register("scholarshipCategory")} className={inputStyle}>
                            <option value="Full Fund">Full Fund</option>
                            <option value="Partial">Partial Fund</option>
                            <option value="Self-Fund">Self Fund</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelStyle}>Degree</label>
                        <select {...register("degree")} className={inputStyle}>
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
                        <input type="number" {...register("tuitionFees")} placeholder="$" className={inputStyle} />
                    </div>
                    <div>
                        <label className={labelStyle}>Application Fees</label>
                        <input type="number" {...register("applicationFees", { required: true })} placeholder="$" className={inputStyle} />
                    </div>
                    <div>
                        <label className={labelStyle}>Service Charge</label>
                        <input type="number" {...register("serviceCharge", { required: true })} placeholder="$" className={inputStyle} />
                    </div>
                </div>

                {/* --- image and deadlines --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelStyle}>University Image URL</label>
                        <input {...register("universityImage", { required: true })} placeholder="https://..." className={inputStyle} />
                    </div>
                    <div>
                        <label className={labelStyle}>Application Deadline</label>
                        <input type="date" {...register("applicationDeadline", { required: true })} className={inputStyle} />
                    </div>
                </div>

                {/* --- info --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                    <div>
                        <label className={labelStyle}>Post By</label>
                        <input {...register("postedUserEmail")} defaultValue={user?.email} className={`${inputStyle} bg-gray-100 `} />
                    </div>
                    <div>
                        <label className={labelStyle}>Post Date</label>
                        <input readOnly {...register("scholarshipPostDate")} defaultValue={new Date().toISOString().split('T')[0]} className={`${inputStyle} bg-gray-100 cursor-not-allowed`} />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition active:scale-95"
                >
                    Publish Scholarship
                </button>
            </form>
        </div>
    );
};

export default AddScholarship;