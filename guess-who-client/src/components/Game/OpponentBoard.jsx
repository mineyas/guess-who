import { useEffect, useState } from "react";
import { loadAllCharacters, loadAllCharactersPlayer } from "../../api/routes";
import logo from "../../assets/img/qui.png";
export default function OpponentBoard() {
  const [characters, setCharacters] = useState([]);
  const loadCharacters = () => {
    try {
      loadAllCharactersPlayer().then((response) => {
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

  const remainingPlaceholderCount = 24 - characters.length;
  const placeholderArticles = Array.from({
    length: remainingPlaceholderCount,
  }).map((_, index) => (
    <article
      key={`placeholder-${index}`}
      className="opponent-card flex items-center justify-center"
    >
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
  ));

  return (
    <div className="opponent-board grid grid-cols-6 gap-2 h-fit lg:h-48 w-fit">
      {characters.map((character) => (
        <article
          key={character._id}
          className="opponent-card flex items-center justify-center"
        >
          <span className="w-fit bg-white rounded-full">
            <img src={logo} alt="logo guess who" className="w-10" />
          </span>
        </article>
      ))}
      {placeholderArticles}
    </div>
  );
}
