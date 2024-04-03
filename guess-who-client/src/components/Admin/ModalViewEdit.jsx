import { Icon } from "@iconify/react";
import { useState } from "react";

export default function ModalViewEdit({
  character,
  reloadCharacters,
  isOpen,
  setIsOpen,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setIsEdit(false);
    reloadCharacters();
    // reset()
    console.log("close close");
  };
  if (!character) {
    return null;
  }
  return (
    <div className={`modal-container ${isOpen ? "visible" : "hidden"}`}>
      <div className="container flex_col justify-between max-w-5xl h-[80vh] ">
        <span className="flex justify-between items-center">
          <h1 className="mb-0">Character Details</h1>
          <Icon
            icon={"carbon:close"}
            className="cursor-pointer"
            width={25}
            onClick={closeModal}
          />
        </span>
        <div className="flex_row items-center gap-4">
          <div className="w-1/5 border border-black">
            <span className="relative">
              <img
                src={`http://localhost:3000/uploads/${character.image}`}
                //   src={character.image}
                alt={character.name}
                className="w-full"
              />
              <Icon
                icon={"majesticons:edit-pen-2"}
                width={35}
                className="cursor-pointer absolute -bottom-2 right-[40%] text-white bg-accent4 rounded-full p-2"
              />
              {/* <button>Edit</button> */}
            </span>
          </div>
          <div className="flex_col gap-3 w-4/5 border border-primary">
            <span className="flex_row items-center gap-2">
              <label htmlFor="" className="text-primary text-lg w-1/5">
                Name
              </label>
              <input
                type="text"
                value={character.name}
                className="rounded-md border-gray-300 text-gray-400"
              />
              {/* <p>{character.name}</p> */}
            </span>
            <span className="flex_row items-center gap-2">
              <label htmlFor="" className="text-primary text-lg w-1/5">
                Gender
              </label>
              <input
                type="text"
                value={character.gender}
                className="rounded-md border-gray-300 text-gray-400"
              />
              {/* <p>{character.gender}</p> */}
            </span>
            <span className="flex_row items-center gap-2">
              <label htmlFor="" className="text-primary text-lg w-1/5">
                Hair Color
              </label>
              <input
                type="text"
                value={character.hairColor}
                className="rounded-md border-gray-300 text-gray-400"
              />
            {/* <p>{character.hairColor}</p> */}

            </span>
            <span className="flex_row items-center gap-2">
              <label htmlFor="" className="text-primary text-lg w-1/5">
                Eye Color
              </label>
              <input
                type="text"
                value={character.eyeColor}
                className="rounded-md border-gray-300 text-gray-400"
              />
              {/* <p>{character.eyeColor}</p> */}
            </span>
            <span className="flex_row items-center gap-2">
              <label htmlFor="" className="text-primary text-lg w-1/5">
                Facial Hair
              </label>
              <input
                type="text"
                value={character.facialHair}
                className="rounded-md border-gray-300 text-gray-400"
              />
              {/* <p>{character.facialHair}</p> */}
            </span>
            <span className="flex_row items-center gap-2">
              <label htmlFor="" className="text-primary text-lg w-1/5">
                Glasses
              </label>
              <input
                type="text"
                value={character.glasses}
                className="rounded-md border-gray-300 text-gray-400"
              />
              {/* <p>{character.glasses}</p> */}
            </span>
            <span className="flex_row items-center gap-2">
              <label htmlFor="" className="text-primary text-lg w-1/5">
                Hat
              </label>
              <input
                type="text"
                value={character.hat}
                className="rounded-md border-gray-300 text-gray-400"
              />
              {/* <p>{character.hat}</p> */}
            </span>
          </div>
        </div>
        <div className="flex_row justify-end gap-2">
          <button className="bg-green-400 hover:bg-green-100 text-white hover:text-green-400 font-semibold py-2 px-4 rounded">
            Save
          </button>
          <button className="bg-accent2-dark hover:bg-accent2-light text-white hover:text-accent2-dark font-semibold py-2 px-4 rounded">
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-200 text-white hover:text-red-500 font-semibold py-2 px-4 rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
