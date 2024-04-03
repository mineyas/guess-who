import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import ModalAdd from "./ModalAdd";
import { loadCharacters, deleteCharacter } from "../../api/axios";
import { useForm } from "react-hook-form";
import ModalViewEdit from "./ModalViewEdit";
export default function Characters() {
  const [characters, setCharacters] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalViewEditOpen, setIsModalViewEditOpen] = useState(false);


  const {
    reload,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const getCharacters = () => {
    try {
      loadCharacters().then((response) => {
        console.log(response);
        setCharacters(response.characters);
      });
    } catch (error) {
      console.error("Error while fetching characters:", error);
    }
  };
  const reloadCharacters = () => {
    getCharacters();
  };

  // const handleModalOpen = () => {
  //   setIsModalOpen(true);
  // };
  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  // };
  const handleAddUser = () => {
    console.log("add user");
  };
  const handleDelete = async (id) => {
    try {
      await deleteCharacter(id);
      reloadCharacters();
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };
  const handleEdit = (user) => {
    console.log(user);
  };
  // const handleView = (character) => {
  //   console.log(character);
  //   setSelectedCharacter(character);
  //   setIsModalOpen(true);

  // };



  const openCharactereModal = (e) => {
    console.log("rr open ");
    setSelectedCharacter(e);
    setIsModalViewEditOpen(true);
    reset();
    // test test
  };
  const openCreateCharactereModal = (e) => {
    setSelectedCharacter(e);
    setIsModalAddOpen(true);
  };

  useEffect(() => {
    getCharacters();
  }, []);
// test test commit
  return (
    <div className="parent-container">
      <h1>Characters</h1>
      <div className="table-container flex flex-col gap-2">
        <div className="w-full text-right">
          <button
            className="button text-right bg-primary text-white hover:bg-primary-light hover:text-white"
            // onClick={() => handleModalOpen()}
            onClick={() => openCreateCharactereModal()}
          >
            Add Charachter
          </button>
        </div>
        <table className="users-table ">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Gender</th>
              {/* <th>Role</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {characters && characters.length > 0 ? (
              characters.map((character) => (
                <tr key={character._id} className="table-row-hover">
                  <td>
                    <img
                      src={`http://localhost:3000/uploads/${character.image}`}
                      // src={character.image}
                      alt={character.name}
                      width={50}
                      className="mx-auto"
                    />
                  </td>
                  <td>{character.name}</td>
                  <td>{character.gender}</td>
                  {/* <td>{character.role}</td> */}
                  <td className="users-icon">
                    <span className="flex gap-3 justify-center">
                      <Icon
                        icon="ic:round-delete"
                        className="icon"
                        onClick={() => handleDelete(character._id)}
                        width={35}
                      />
                      <Icon
                        icon="material-symbols:visibility"
                        className="icon"
                        // onClick={() => handleView(character)}
                        onClick={() => openCharactereModal(character)}
                        width={35}
                      />
                      <Icon
                        icon="material-symbols:edit"
                        className="icon"
                        onClick={() => handleEdit(character)}
                        width={35}
                      />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No characters found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* {isModalOpen && <ModalAdd onClose={handleModalClose} reloadCharacters={reloadCharacters} />} */}
      {/* <ModalViewEdit
          onOpen={isModalOpen}
          onClose={handleModalClose}
          character={selectedCharacter}
          reloadCharacters={reloadCharacters}
        /> */}
      <ModalAdd
        reloadCharacters={reloadCharacters}
        isOpen={isModalAddOpen}
        setIsOpen={setIsModalAddOpen}
      />
      <ModalViewEdit
        character={selectedCharacter}
        reloadCharacters={reloadCharacters}
        isOpen={isModalViewEditOpen}
        setIsOpen={setIsModalViewEditOpen}
      />
    </div>
  );
}
