import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { loadAllCharacters } from "../../api/routes";
import logo from "../../assets/img/quii.png";
export default function OpponentBoard() {
  const [isDeleted, setIsDeleted] = useState(true);
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
      <p className="text-center card-name">{`logo ${index + 1}`}</p>
    </article>
  ));

  return (
    <div className="opponent-board grid grid-cols-6 gap-2 h-fit lg:h-48 w-fit">
    <article className="opponent-card flex items-center justify-center">
      {isDeleted && (
        <span className="opponent-deleted">
          <Icon
            icon={"radix-icons:cross-1"}
            className="text-red-500 w-full h-full"
          ></Icon>
        </span>
      )}
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
    <article className="opponent-card flex items-center justify-center">
      <span className="w-fit bg-white rounded-full">
        <img src={logo} alt="logo guess who" className="w-10" />
      </span>
    </article>
  </div>
  );
}
