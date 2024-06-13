import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameBoard from "../components/MemoMemory/GameBoard";

export default function MemoryGamePage() {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(true);
  const [memoCards, setMemoCards] = useState([]);
  function handleDelete() {
    setIsDeleted(true);
  }
  const leaveGame = () => {
    navigate("/");
  };
  return (
    <section className="section">
      <div className="container_title">
        <h1>Memo Game</h1>
      </div>

      <div className="container_game">
        {/* <GameBoard /> */}

        {memoCards.map((card, index) => {
          return (
            <GameBoard
              key={index}
              card={card}
              index={index}
              // onClick={handleCardClick}
            />
          );
        })}
      </div>
    </section>
  );
}
