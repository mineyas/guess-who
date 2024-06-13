import { useEffect, useState } from "react";
import { blockUser, loadAllUsers } from "../../api/routes";
import MessageBanner from "../MessageBanner";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  console.log(users, "users state");
  const getUsers = () => {
    try {
      loadAllUsers().then((response) => {
        console.log(response);
        setUsers(response.users);
      });
    } catch (error) {
      console.error("Error while fetching users:", error);
    }
  };

  const handleBlock = async (user) => {
    console.log(user);

    const isUserBlocked = user.blocked;
    try {
      const response = await blockUser(user._id, { isBlocked: !user.blocked });
      console.log(response, "block user response");

      if (!isUserBlocked) {
        setMessage("User blocked successfully");
        setMessageType("warning");
      } else {
        setMessage("User unblocked successfully");
        setMessageType("success");
      }

      setTimeout(() => {
        setMessage("");
      }, 2000);
      getUsers();
    } catch (error) {
      console.error("Error while fetching users:", error);
      setMessage("Error blocking user");
      setMessageType("error");
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="section">
      <div className="container_title">
        <h1>Users</h1>
      </div>
      <div className="table-container flex flex-col gap-2">
        <table className="users-table ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Block</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="table-row-hover">
                <td>{user.firstname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td className="text-center">
                  <span
                    onClick={() => handleBlock(user)}
                    className={`cursor-pointer ${
                      user.blocked ? "bg-green-400" : " bg-red-500 "
                    }  px-3 py-1 rounded-full text-white`}
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {message && <MessageBanner type={messageType} message={message} />}
      </div>
    </div>
  );
}
