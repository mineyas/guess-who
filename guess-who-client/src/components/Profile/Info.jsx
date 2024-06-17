import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUserById, updateUser } from "../../api/routes";
import MessageBanner from "../MessageBanner";

export default function Info() {
  const id = sessionStorage.getItem("id");
  const [user, setUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
  });

  const getUserInfo = async () => {
    try {
      const response = await getUserById(id);
      const info = response.user;
      setUser(info);
      console.log(info, "response");
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  };

  const onsubmit = async (data) => {
    console.log(data, "form data update user");
    try {
      const res = await updateUser(id, {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      });

      console.log(res, "response");
      setMessage("User updated successfully");
      setMessageType("success");
      setIsEdit(false);

      setTimeout(() => {
        reset();
        window.location.reload();
        setMessage("");
      }, 2000);
    } catch (error) {
      setMessage("Error updating user");
      setMessageType("error");
      console.error("Error updating player:", error);
    }
  };

  const closeButton = () => {
    setIsEdit(false);
    reset();
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <section className="section profile-page">
      <div className="container flex_col gap-8 h-fit">
        <h1 className="mb-0 text-primary-dark">Details</h1>
        <form
          action=""
          onSubmit={handleSubmit(onsubmit)}
          className="form_container"
        >
            <div className="inputs_container">
              <span className="info_container">
                <label htmlFor="firstname" className="text-primary text-lg ">
                  Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  defaultValue={user.firstname}
                  className={`disabled-input ${
                    errors.firstname ? "border border-red-500" : ""
                  }  rounded-md border-gray-300 text-gray-400`}
                  // className="disabled-input rounded-md border-gray-300 text-gray-400"
                  disabled={!isEdit}
                  {...register("firstname", { required: true })}
                />
              </span>

              <span className="info_container">
                <label htmlFor="lastname" className="text-primary text-lg ">
                  Last name
                </label>
                <input
                  id="lastname"
                  type="text"
                  defaultValue={user.lastname}
                  className={`disabled-input ${
                    errors.lastname ? "border border-red-500" : ""
                  } rounded-md border-gray-300 text-gray-400`}
                  // className="disabled-input rounded-md border-gray-300 text-gray-400"
                  disabled={!isEdit}
                  {...register("lastname", { required: true })}
                />
              </span>
              <span className="info_container">
                <label htmlFor="email" className="text-primary text-lg ">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  defaultValue={user.email}
                  className={`disabled-input ${
                    errors.email ? "border border-red-500" : ""
                  } rounded-md border-gray-300 text-gray-400`}
                  disabled={!isEdit}
                  {...register("email", { required: true })}
                />
              </span>
            </div>
          <div className="flex_row justify-end gap-2">
            {isEdit ? (
              <>
                <button
                  type="submit"
                  className="bg-green-400 hover:bg-green-100 text-white hover:text-green-400 font-semibold py-2 px-4 rounded"
                >
                  Save
                </button>
                <button
                  className="bg-red-500 hover:bg-red-200 text-white hover:text-red-500 font-semibold py-2 px-4 rounded"
                  onClick={closeButton}
                >
                  Close
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-accent2-dark hover:bg-accent2-light text-white hover:text-accent2-dark font-semibold py-2 px-4 rounded"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
      {message && <MessageBanner type={messageType} message={message} />}
    </section>
  );
}
