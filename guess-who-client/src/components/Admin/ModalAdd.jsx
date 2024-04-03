import { useState } from "react";
import { useForm } from "react-hook-form";
import { addCharacter } from "../../api/axios";
import { Icon } from "@iconify/react";

export default function ModalAdd({ isOpen, setIsOpen, reloadCharacters }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    resetField,
    formState: { errors },
  } = useForm();
  // const [formData, setFormData] = useState({
  //   name: "",
  //   gender: "",
  //   hairColor: "",
  //   eyeColor: "",
  //   facialHair: "",
  //   glasses: "",
  //   hat: "",
  //   file: null,
  //   image: null,
  // });
  const defaultValues = {
    name: "",
    gender: "",
    hairColor: "",
    eyeColor: "",
    facialHair: "",
    glasses: "",
    hat: "",
  };
  const [selectedOptions, setSelectedOptions] = useState({
    gender: "",
    hairColor: "",
    eyeColor: "",
    facialHair: "",
    glasses: "",
    hat: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState();

  const genderTypes = ["male", "female"];
  const eyeColors = ["Blue", "Green", "Brown", "Other"];
  const hairColors = ["Black", "Brown", "Blonde", "Red", "Other"];
  const yesOrno = ["yes", "no"];

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const onSubmit = async (data) => {
    console.log(data, "form data add character");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("gender", data.gender);
      formData.append("hairColor", data.hairColor);
      formData.append("eyeColor", data.eyeColor);
      formData.append("facialHair", data.facialHair);
      formData.append("glasses", data.glasses);
      formData.append("hat", data.hat);
      formData.append("image", data.image[0]);

      // const imageFile = data.image[0];
      // const imageURL = URL.createObjectURL(imageFile);
      // console.log("Image URL:", imageURL);

      // setSelectedImage(imageURL);

      const response = await addCharacter(formData);
      console.log("Response:", response);
      setMessage("Character added successfully");
      setMessageType("success");
      closeModal();
      if (reloadCharacters) {
        reloadCharacters();
      }
    } catch (error) {
      setMessage("Error adding character");
      setMessageType("error");
      console.error("Error adding character:", error.message);
    }
  };

  const handleOptionChange = (type, value) => {
    setSelectedOptions({ ...selectedOptions, [type]: value });
    setValue(type, value);
  };
  // const closeModal = () => {
  //   setIsOpen(false);
  //   reloadCharacters();
  //   reset();
  //   console.log("close close", defaultValues);
  //   // reloadCharacters();
  //   console.log("close add");
  // };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOptions({
      gender: "",
      hairColor: "",
      eyeColor: "",
      facialHair: "",
      glasses: "",
      hat: "",
    });
    reset();
  };

  return (
    <section className={`modal-container ${isOpen ? "visible" : "hidden"}`}>
      <div className="container flex_col gap-12 justify-between max-w-5xl h-fit">
        <span className="flex justify-between items-center">
          <h1 className="mb-0">New Character</h1>
          <Icon
            icon={"carbon:close"}
            className="cursor-pointer"
            width={25}
            onClick={closeModal}
          />
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onReset={closeModal}
          encType="multipart/form-data"
          className="flex_row items-center"
        >
          <div className="w-1/4 border border-red-500">
            <div className="flex_col items-center">
              {file ? (
                <img
                  src={file}
                  alt="selected avatar"
                  className="mx-auto max-w-60"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/220"
                  alt="placeholder"
                  className="mx-auto max-w-60 rounded-full"
                />
              )}

              <label htmlFor="image" className="cursor-pointer">
                Upload Image
                <Icon
                  icon={"solar:upload-linear"}
                  width={30}
                  className="cursor-pointer bg-accent2-dark text-white hover:bg-accent2-light hover:text-accent2-dark rounded-md p-2 w-24 h-10"
                />
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  {...register("image")}
                  onChange={handleChange}
                  className=""
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
          <div className="w-3/4 border border-green-500">
            <span>
              <div className="form-group">
                <label className="title" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="input-field"
                  {...register("name")}
                />
              </div>
              <div className="form-group">
                <label className="title">Gender</label>
                <div className="radio-container">
                  {genderTypes.map((gender) => (
                    <label
                      key={gender}
                      className={`radio-label ${
                        selectedOptions.gender === gender
                          ? "bg-primary text-white"
                          : ""
                      }`}
                      onClick={() => handleOptionChange("gender", gender)}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        {...register("gender")}
                      />
                      {gender}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="hairColor" className="title">
                  Hair Color
                </label>
                <div className="radio-container">
                  {hairColors.map((color) => (
                    <label
                      key={color}
                      className={`radio-label ${
                        selectedOptions.hairColor === color
                          ? "bg-accent2 text-white"
                          : ""
                      }`}
                      onClick={() => handleOptionChange("hairColor", color)}
                    >
                      <input
                        type="radio"
                        name="hairColor"
                        value={color}
                        {...register("hairColor")}
                      />
                      {color}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="eyeColor" className="title">
                  Eye Color
                </label>
                <div className="radio-container">
                  {eyeColors.map((color) => (
                    <label
                      key={color}
                      className={`radio-label ${
                        selectedOptions.eyeColor === color
                          ? "bg-primary text-white"
                          : ""
                      }`}
                      onClick={() => handleOptionChange("eyeColor", color)}
                    >
                      <input
                        type="radio"
                        name="eyeColor"
                        value={color}
                        {...register("eyeColor")}
                      />
                      {color}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="title">Facial Hair</label>
                <div className="radio-container">
                  {yesOrno.map((e) => (
                    <label
                      key={e}
                      className={`radio-label ${
                        selectedOptions.facialHair === e
                          ? "bg-accent2 text-white"
                          : ""
                      }`}
                      onClick={() => handleOptionChange("facialHair", e)}
                    >
                      <input
                        type="radio"
                        name="facialHair"
                        value={e}
                        {...register("facialHair")}
                      />
                      {e}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="title">Glasses</label>
                <div className="radio-container">
                  {yesOrno.map((e) => (
                    <label
                      key={e}
                      className={`radio-label ${
                        selectedOptions.glasses === e
                          ? "bg-accent4 text-white"
                          : ""
                      }`}
                      onClick={() => handleOptionChange("glasses", e)}
                    >
                      <input
                        type="radio"
                        name="glasses"
                        value={e}
                        {...register("glasses")}
                      />
                      {e}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="title">Hat</label>
                <div className="radio-container">
                  {yesOrno.map((e) => (
                    <label
                      key={e}
                      className={`radio-label ${
                        selectedOptions.hat === e ? "bg-primary text-white" : ""
                      }`}
                      onClick={() => handleOptionChange("hat", e)}
                    >
                      <input
                        type="radio"
                        name="hat"
                        value={e}
                        {...register("hat")}
                      />
                      {e}
                    </label>
                  ))}
                </div>
              </div>
            </span>

            <span className="button-container">
              <button
                type="submit"
                className="button bg-primary text-white hover:border-2 hover:border-primary hover:bg-secondary-light hover:text-primary"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => closeModal()}
                className="button bg-red-500 text-white hover:bg-red-100 hover:text-red-500"
              >
                Cancel
              </button>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
