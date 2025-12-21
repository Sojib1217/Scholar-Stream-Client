import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all reviews
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        },
    });

    // Delete review
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the review permanently.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reviews/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire('Deleted!', 'The review has been deleted.', 'success');
                            refetch();
                        }
                    });
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4 text-center">All Reviews</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student Name</th>
                           
                            <th>Review</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={review._id}>
                                <td>{index + 1}</td>
                                <td>{review.userName}</td>
                               
                                <td>{review.comment}</td>
                                <td>
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
        </div>
    );
};

export default AllReviews;
