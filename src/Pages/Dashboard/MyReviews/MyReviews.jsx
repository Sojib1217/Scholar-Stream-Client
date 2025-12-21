import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';

const MyReviews = () => {
    const axios = useAxios();
    const {user}=useAuth()
    const [editReview, setEditReview] = useState(null);
    const [editedText, setEditedText] = useState('');
    const [editedRating, setEditedRating] = useState(0);

    // Fetch student reviews
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['myReviews',user?.email],
        queryFn: async () => {
            const res = await axios.get(`/reviews/${user.email}`); 
            return res.data;
        }
    });

    // Delete review
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete your review permanently.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/reviews/${id}`)
                    .then(res => {
                        if(res.data.deletedCount){
                            Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
                            refetch();
                        }
                    });
            }
        });
    };

    // Submit edited review
    const handleEditSubmit = () => {
        axios.patch(`/reviews/${editReview._id}`, { text: editedText, rating: editedRating })
            .then(res => {
                if(res.data.modifiedCount){
                    Swal.fire('Updated!', 'Your review has been updated.', 'success');
                    setEditReview(null);
                    refetch();
                }
            });
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4 text-center">My Reviews</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Scholarship Name</th>
                            <th>University Name</th>
                            <th>Review Comment</th>
                            <th>Review Date</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={review._id}>
                                <td>{index + 1}</td>
                                <td>{review.scholarshipName}</td>
                                <td>{review.universityName}</td>
                                <td>{review.text}</td>
                                <td>{new Date(review.date).toLocaleDateString()}</td>
                                <td>{review.rating}</td>
                                <td className="space-x-1">
                                    <button
                                        onClick={() => {
                                            setEditReview(review);
                                            setEditedText(review.text);
                                            setEditedRating(review.rating);
                                        }}
                                        className="btn btn-xs btn-secondary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editReview && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Edit Review</h3>

                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows={4}
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                        />

                        <div className="mt-4">
                            <label className="block mb-1">Rating:</label>
                            <input
                                type="number"
                                min={1}
                                max={5}
                                className="input input-bordered w-full"
                                value={editedRating}
                                onChange={(e) => setEditedRating(Number(e.target.value))}
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setEditReview(null)}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                className="btn btn-primary"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
