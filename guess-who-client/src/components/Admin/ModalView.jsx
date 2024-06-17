import { Icon } from "@iconify/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MessageBanner from "../MessageBanner";
import { updateCharacter } from "../../api/routes";
import CharacterFormField from "../../ReusableComponents/CharacterFormField";
import FormButtons from "../../ReusableComponents/FormButtons";

export default function ModalView({
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

  const port = process.env.REACT_APP_BASE_URL;
  const image = `${port}/uploads/`;
  console.log(image);

  console.log(character?.image);

  const closeModal = () => {
    setIsOpen(false);
    reloadCharacters();
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
        <form>
          <div className="flex_row items-center justify-evenly gap-4">
            <div className="w-2/5 ">
              <span className="flex_col gap-3 items-center justify-center">
                <img
                  alt={character?.name}
                  src={`${image}${character?.image}`}
                  className="w-full"
                />
              </span>
            </div>
            <div className="flex_col gap-3 w-3/5 ">
              <CharacterFormField
                label="Name"
                type="text"
                value={character?.name}
                register={register("name")}
                required
              />
              <CharacterFormField
                label="Gender"
                type="text"
                value={character?.gender}
                register={register("gender")}
                required
              />
              <CharacterFormField
                label="Hair Color"
                type="text"
                value={character?.hairColor}
                register={register("hairColor")}
                required
              />
              <CharacterFormField
                label="Eye Color"
                type="text"
                value={character?.eyeColor}
                register={register("eyeColor")}
                required
              />
              <CharacterFormField
                label="Facial Hair"
                type="text"
                value={character?.facialHair}
                register={register("facialHair")}
                required
              />

              <CharacterFormField
                label="Glasses"
                type="text"
                value={character?.glasses}
                register={register("glasses")}
                required
              />
              <CharacterFormField
                label="Hat"
                type="text"
                value={character?.hat}
                register={register("hat")}
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
