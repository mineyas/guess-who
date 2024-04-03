import { useEffect, useState } from "react";
import { loadUsers } from "../../api/axios";
import { Icon, InlineIcon } from "@iconify/react";
export default function Users() {
  const [users, setUsers] = useState([]);

  console.log(users, "users state");
  const getUsers = () => {
    try {
      loadUsers().then((response) => {
        console.log(response);
        setUsers(response.users);
      });
    } catch (error) {
      console.error("Error while fetching users:", error);
    }
  };
const handleAddUser = () => {
  console.log("add user");
}
  const handleDelete = (id) => {
    console.log(id);
  };
  const handleEdit = (user) => {
    console.log(user);
  };
  const handleView = (user) => {
    console.log(user);
  };
  useEffect(() => {
    getUsers();
    
  }, []);
  return (
    <div className="parent-container">
      <h1>Users</h1>
      <div className="table-container flex flex-col gap-2">
        <div className="w-full text-right">
          <button className="button text-right bg-primary text-white hover:bg-primary-light hover:text-white" onClick={() => handleAddUser()}>
            Add User
          </button>
        </div>
        <table className="users-table ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="table-row-hover">
                <td>{user.firstname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="users-icon">
                  <span className="flex gap-3 justify-center">
                    <Icon
                      icon="ic:round-delete"
                      className="icon"
                      onClick={() => handleDelete(user._id)}
                      width={35}
                    />
                    <Icon
                      icon="material-symbols:visibility"
                      className="icon"
                      onClick={() => handleView(user)}
                      width={35}
                    />
                    <Icon
                      icon="material-symbols:edit"
                      className="icon"
                      onClick={() => handleEdit(user)}
                      width={35}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
