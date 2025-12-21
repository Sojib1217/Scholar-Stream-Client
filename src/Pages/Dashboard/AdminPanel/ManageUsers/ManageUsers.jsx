import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const ManageUsers = () => {
  const axiosSecure=useAxiosSecure()
  const [roleFilter, setRoleFilter] = useState("all");

  // fetch users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // filter users by role
  const filteredUsers =
    roleFilter === "all"
      ? users
      : users.filter((user) => user.role === roleFilter);

  // change role
  const handleChangeRole = (id, role) => {
    axiosSecure.patch(`/users/${id}/role`,  {role} ).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire("Role Updated!", "User role updated.", "success");
        refetch();
      }
    });
  };

  // delete user
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire("Deleted!", "User removed.", "success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="p-6 ">
      <h2 className="text-3xl font-bold text-center mb-6 ">
        Manage Users
      </h2>

      {/* Filter */}
      <div className="mb-4 flex justify-end ">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <table className="table table-zebra">
          <thead>
            <tr >
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td className="space-x-2">

                  {/* Changing Role */}
                  {user.role === "admin" && (
                    <>
                      <button
                        onClick={() =>
                          handleChangeRole(user._id, "moderator")
                        }
                        className="btn btn-xs btn-info"
                      >
                        Make Moderator
                      </button>

                      <button
                        onClick={() =>
                          handleChangeRole(user._id, "student")
                        }
                        className="btn btn-xs btn-success"
                      >
                        Make Student
                      </button>
                    </>
                  )}

                
                  {user.role === "student" && (
                    <button
                      onClick={() =>
                        handleChangeRole(user._id, "moderator")
                      }
                      className="btn btn-xs btn-warning"
                    >
                      Make Moderator
                    </button>
                  )}

                  {user.role === "moderator" && (<>
                  <button
                      onClick={() =>
                        handleChangeRole(user._id, "admin")
                      }
                      className="btn btn-xs btn-warning"
                    >
                      Make Admin
                    </button>
                  <button
                      onClick={() =>
                        handleChangeRole(user._id, "student")
                      }
                      className="btn btn-xs btn-warning"
                    >
                      Make Student
                    </button>
                  </>
                    
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteUser(user._id)}
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

export default ManageUsers;
