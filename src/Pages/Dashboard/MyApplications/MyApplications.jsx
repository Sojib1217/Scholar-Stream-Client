import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyApplications = () => {
    const { user } = useAuth()
    const axios = useAxios()

    const [selectedApp, setSelectedApp] = useState(null);

    const { data: applications = [], } = useQuery({
        queryKey: ['myApplications', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/applications?email=${user.email}`)
            return res.data;
        }
    })

    // 🔹 Review submit
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        const reviewData = {
            applicationId: selectedApp._id,
            scholarshipId: selectedApp.scholarshipId,
            universityName: selectedApp.universityName,
            userName: user.displayName,
            userEmail: user.email,
            userImage: user.photoURL,
            rating: e.target.rating.value,
            comment: e.target.comment.value,
            createdAt: new Date(),
        };

        await axios.post("/reviews", reviewData)
            .then(res => {
                console.log(res)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Review has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                
            });
            
        setSelectedApp(null);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Applications</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>University</th>
                            <th>Address</th>
                            <th>Feedback</th>
                            <th>Subject</th>
                            <th>Fee</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map(app => (
                            <tr key={app._id}>
                                <td>{app.universityName}</td>
                                <td>{app.universityCity}, {app.universityCountry}</td>
                                <td>{app.feedback || '—'}</td>
                                <td>{app.degree}</td>
                                <td>${app.applicationFees}</td>
                                <td>
                                    <span className="badge badge-outline">
                                        {app.applicationStatus}
                                    </span>
                                </td>

                                <td className="space-x-2">
                                    {/* Details – always visible */}
                                    <button className="btn btn-xs btn-info">
                                        Details
                                    </button>

                                    {/* Edit – only pending */}
                                    {app.applicationStatus === 'pending' && (
                                        <button className="btn btn-xs btn-warning">
                                            Edit
                                        </button>
                                    )}

                                    {/* Pay – pending + unpaid */}
                                    {app.applicationStatus === 'pending' &&
                                        app.paymentStatus === 'unpaid' && (
                                            <button className="btn btn-xs btn-success">
                                                Pay
                                            </button>
                                        )}

                                    {/* Delete – only pending */}
                                    {app.applicationStatus === 'pending' && (
                                        <button className="btn btn-xs btn-error">
                                            Delete
                                        </button>
                                    )}

                                    {/* Review – only completed */}
                                    {app.applicationStatus === 'completed' && (
                                        <button
                                            onClick={() => setSelectedApp(app)}
                                            className="btn btn-xs btn-primary">
                                            Add Review
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* review modal */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl w-96 p-6">
                        <h2 className="text-xl font-bold mb-4">
                            Review - {selectedApp.universityName}
                        </h2>

                        <form onSubmit={handleReviewSubmit} className="space-y-4">

                            {/* Rating */}
                            <select
                                name="rating"
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">Select Rating</option>
                                <option value="1">⭐ 1</option>
                                <option value="2">⭐ 2</option>
                                <option value="3">⭐ 3</option>
                                <option value="4">⭐ 4</option>
                                <option value="5">⭐ 5</option>
                            </select>

                            {/* Comment */}
                            <textarea
                                name="comment"
                                className="textarea textarea-bordered w-full"
                                placeholder="Write your feedback"
                                required
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedApp(null)}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button className="btn bg-purple-600 text-white">
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApplications;