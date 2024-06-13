import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { deleteCharacter, loadAllCharacters } from "../../api/routes";
import ModalAdd from "./ModalAdd";
import ModalViewEdit from "./ModalViewEdit";
export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalViewEditOpen, setIsModalViewEditOpen] = useState(false);

  const { reset } = useForm();
  const getCharacters = () => {
    try {
      loadAllCharacters().then((response) => {
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

  const handleDelete = async (id) => {
    try {
      await deleteCharacter(id);
      reloadCharacters();
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };
  const openCharactereModal = (e) => {
    console.log("rr open ");
    setSelectedCharacter(e);
    setIsModalViewEditOpen(true);
    reset();
  };
  const openCreateCharactereModal = (e) => {
    setSelectedCharacter(e);
    setIsModalAddOpen(true);
  };

  useEffect(() => {
    getCharacters();
  }, []);
  return (
    <div className="section">
      <div className="container_title">
        <h1>Characters</h1>
        <button
          className="button text-right bg-primary text-white hover:bg-primary-light hover:text-white"
          onClick={() => openCreateCharactereModal()}
        >
          Add Charachter
        </button>
      </div>
      <div className="table-section">
        <div className="table-container">
          <table className="users-table ">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="max-h-[60vh] overflow-auto">
              {characters && characters.length > 0 ? (
                characters.map((character) => (
                  <tr key={character._id} className="table-row-hover">
                    <td>
                      <img
                        src={`http://localhost:3000/uploads/${character.image}`}
                        alt={character.name}
                        width={50}
                        className="mx-auto"
                      />
                    </td>
                    <td>{character.name}</td>
                    <td>{character.gender}</td>
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
                          onClick={() => openCharactereModal(character)}
                          width={35}
                        />
                        <Icon
                          icon="material-symbols:edit"
                          className="icon"
                          onClick={() => openCharactereModal(character)}
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
      </div>

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
