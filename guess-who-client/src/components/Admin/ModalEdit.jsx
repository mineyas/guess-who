import { Icon } from "@iconify/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MessageBanner from "../MessageBanner";
import { updateCharacter } from "../../api/routes";
import CharacterFormField from "../../ReusableComponents/CharacterFormField";
import FormButtons from "../../ReusableComponents/FormButtons";

export default function ModalEdit({
  character,
  reloadCharacters,
  isOpen,
  setIsOpen,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: character?.name,
      gender: character?.gender,
      hairColor: character?.hairColor,
      eyeColor: character?.eyeColor,
      facialHair: character?.facialHair,
      glasses: character?.glasses,
      hat: character?.hat,
      image: character?.image || "",
    },
  });

  const [isEdit, setIsEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [fileUpdate, setFileUpdate] = useState();
  const [fileName, setFileName] = useState("");

  const port = process.env.REACT_APP_BASE_URL
  const image = `${port}/uploads/`

  const handleChange = (e) => {
    console.log(e.target.files[0], "rrrr file");
    const file = e.target.files[0];
    setFileName(file.name);

    setFileUpdate(URL.createObjectURL(file));
  };
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

      const response = await updateCharacter(character._id, formData);
      console.log("Response:", response);
      setMessage("Character added successfully");
      setMessageType("success");
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (error) {
      setMessage("Error adding character");
      setMessageType("error");
      console.error("Error adding character:", error.message);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
    setIsEdit(false);
    reloadCharacters();
    // reset()
    console.log("close close");
  };
  const openEdit = () => {
    setIsEdit(true);
  };
  return (
    <div className={`modal-container ${isOpen ? "visible" : "hidden"}`}>
      <div className="container flex_col justify-between gap-8 max-w-5xl">
        <span className="flex justify-between items-center">
          <h1 className="mb-0">Character Details</h1>
          <Icon
            icon={"carbon:close"}
            className="cursor-pointer"
            width={25}
            onClick={closeModal}
          />
        </span>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="flex_row items-center justify-evenly gap-4">
            <div className="w-2/5 ">
              <span className="flex_col gap-3 items-center justify-center">
                <img
                  alt={character?.name}
                  src={
                    fileUpdate
                      ? fileUpdate
                      : `${image}${character?.image}}`
                  }
                  className="w-full"
                />
                {isEdit && (
                  <>
                    <input
                      type="file"
                      id="image"
                      {...register("image")}
                      onChange={handleChange}
                      accept="image/*"
                      className="w-36"
                    />
                    {fileName && <p>{fileName}</p>}
                  </>
                )}
              </span>
            </div>
            <div className="flex_col gap-3 w-3/5 ">
              <CharacterFormField
                isEdit={isEdit}
                label="Name"
                type="text"
                value={character?.name}
                register={register("name")}
                errors={errors.name}
                required
              />
              <CharacterFormField
                isEdit={isEdit}
                label="Gender"
                type="text"
                value={character?.gender}
                register={register("gender")}
                errors={errors.gender}
                required
              />
              <CharacterFormField
                isEdit={isEdit}
                label="Hair Color"
                type="text"
                value={character?.hairColor}
                register={register("hairColor")}
                errors={errors.hairColor}
                required
              />
              <CharacterFormField
                isEdit={isEdit}
                label="Eye Color"
                type="text"
                value={character?.eyeColor}
                register={register("eyeColor")}
                errors={errors.eyeColor}
                required
              />
              <CharacterFormField
                isEdit={isEdit}
                label="Facial Hair"
                type="text"
                value={character?.facialHair}
                register={register("facialHair")}
                errors={errors.facialHair}
                required
              />

              <CharacterFormField
                isEdit={isEdit}
                label="Glasses"
                type="text"
                value={character?.glasses}
                register={register("glasses")}
                errors={errors.glasses}
                required
              />
              <CharacterFormField
                isEdit={isEdit}
                label="Hat"
                type="text"
                value={character?.hat}
                register={register("hat")}
                errors={errors.hat}
                required
              />
            </div>
          </div>
          <FormButtons
            isEdit={isEdit}
            closeModal={closeModal}
            openEdit={openEdit}
            typeSubmit="submit"
          />
        </form>
      </div>
      {message && <MessageBanner type={messageType} message={message} />}
    </div>
  );
}
