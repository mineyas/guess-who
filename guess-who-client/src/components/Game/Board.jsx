import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { loadAllCharacters } from "../../api/routes";
import logo from "../../assets/img/quii.png";
export default function Board() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [characters, setCharacters] = useState([]);
  const loadCharacters = () => {
    try {
      loadAllCharacters().then((response) => {
        console.log(response);
        setCharacters(response.characters);
      });
    } catch (error) {
      console.error("Error while fetching characters:", error);
    }
  };

  console.log(characters, "characters");
  useEffect(() => {
    loadCharacters();
  }, []);
  const handleDelete = () => {
    setIsDeleted(true);
  };

  const remainingPlaceholderCount = 24 - characters.length;
  const placeholderArticles = Array.from({
    length: remainingPlaceholderCount,
  }).map((_, index) => (
    <article key={`placeholder-${index}`} className="card-game">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" />
      </span>
      <p className="text-center card-name">{`Qui ${index + 1}`}</p>
    </article>
  ));

  return (
    <div className="board grid grid-cols-6 gap-4 w-fit lg:w-1/2">
      {characters.map((character) => (
        <article className="card-game">
          {isDeleted && (
            <span className="card-deleted">
              <Icon
                icon={"radix-icons:cross-1"}
                className="text-red-500 w-full h-full"
              ></Icon>
            </span>
          )}
          <img
            src={`${process.env.REACT_APP_BASE_URL}/uploads/${character.image}`}
            alt={character.name}
          />
          <p className="text-center card-name">{character.name}</p>
        </article>
      ))}
      {placeholderArticles}
    </div>
  );
}
