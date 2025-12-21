import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../../hooks/useAxios";


const ManageApplication = () => {
    const axios = useAxios();
    const [selectedApp, setSelectedApp] = useState(null);
    const [feedbackApp, setFeedbackApp] = useState(null);
    const textRef=useRef()
    

    // fetch applications
    const { data: applications = [], refetch } = useQuery({
        queryKey: ["applications"],
        queryFn: async () => {
            const res = await axios.get("/applications");
            return res.data;
        },
    });

    // update status
    const handleStatusUpdate = (id, status) => {
        axios.patch(`/applications/${id}/status`, { status }).then((res) => {
            if (res.data.modifiedCount) {
                Swal.fire("Updated!", "Application status updated.", "success");
                refetch();
            }
        });
    };

    // cancel application
    const handleCancel = (id) => {
        Swal.fire({
            title: "Reject Application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Reject",
        }).then((result) => {
            if (result.isConfirmed) {
                handleStatusUpdate(id, "rejected");
            }
        });
    };

    // submit feedback
    const handleFeedbackSubmit = () => {
        const feedback=textRef.current.value
        console.log('text',feedback)
        axios.patch(`/applications/${feedbackApp._id}/feedback`, {
            feedback
        })
            .then((res) => {
                if (res.data.modifiedCount) {
                    Swal.fire("Success!", "Feedback submitted.", "success");
                    setFeedbackApp(null);
                    refetch();
                }
            });
    };

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold text-center mb-6">
                Manage Applied Applications
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Applicant Name</th>
                            <th>Email</th>
                            <th>University</th>
                            <th>Feedback</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app._id}>
                                <td>{index + 1}</td>
                                <td>{app.userName}</td>
                                <td>{app.userEmail}</td>
                                <td>{app.universityName}</td>
                                <td>{app.feedback?app.feedback:"--"}</td>
                                <td className="capitalize">{app.applicationStatus}</td>
                                <td className="capitalize">{app.paymentStatus}</td>

                                <td className="space-x-1">

                                    {/* Details */}
                                    <button
                                        onClick={() => setSelectedApp(app)}
                                        className="btn btn-xs btn-info"
                                    >
                                        Details
                                    </button>

                                   
                                    <button
                                        onClick={() => {
                                            setFeedbackApp(app);
                                        }}
                                        className="btn btn-xs btn-secondary"
                                    >
                                        Feedback
                                    </button>

                                 
                                    <select
                                        defaultValue={app.applicationStatus}
                                        onChange={(e) =>
                                            handleStatusUpdate(app._id, e.target.value)
                                        }
                                        className="select select-xs select-bordered"
                                        
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="completed">Completed</option>
                                    </select>

                                   
                                    {app.applicationStatus !== "rejected" && (
                                        <button
                                            onClick={() => handleCancel(app._id)}
                                            className="btn btn-xs btn-error"
                                        >
                                            Reject
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* DETAILS MODAL */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl w-full max-w-lg">
                        <h3 className="text-xl font-bold mb-4">
                            Application Details
                        </h3>

                        <p><b>Name:</b> {selectedApp.userName}</p>
                        <p><b>Email:</b> {selectedApp.userEmail}</p>
                        <p><b>University:</b> {selectedApp.universityName}</p>
                        <p><b>Status:</b> {selectedApp.applicationStatus}</p>
                        <p><b>Payment:</b> {selectedApp.paymentStatus}</p>

                        <div className="text-right mt-4">
                            <button
                                onClick={() => setSelectedApp(null)}
                                className="btn btn-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* FEEDBACK MODAL */}
            {feedbackApp && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">
                            Write Feedback
                        </h3>

                        <textarea
                           ref={textRef}
                            className="textarea textarea-bordered w-full"
                            rows={4}
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setFeedbackApp(null)}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleFeedbackSubmit}
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageApplication;
