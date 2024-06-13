import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../components/Game/Board";
import OpponentBoard from "../components/Game/OpponentBoard";

export default function GamePage() {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(true);

  function handleDelete() {
    setIsDeleted(true);
  }
  const leaveGame = () => {
    navigate("/");
  };
  return (
    <section className="section">
      <div className="container_title">
        <h1>Gameee</h1>
      </div>
      <div className="flex_col lg:flex-row gap-4 justify-between">
        <div className="question-bar w-full order-last lg:order-first lg:w-fit">
          <div className="flex_row question-bar-buttons gap-4">
            <button>
              <Icon icon="icons8:gender" width={35} className="mx-auto" />
            </button>
            <button>
              <Icon icon="emojione:eyes" width={35} className="mx-auto" />
            </button>
            <button>
              <Icon icon="mdi:glasses" width={35} className="mx-auto" />
            </button>
            <button>
              <Icon
                icon="mingcute:hair-2-fill"
                width={35}
                className="mx-auto"
              />
            </button>
            <button>
              <Icon icon="mdi:mustache" width={35} className="mx-auto" />
            </button>
            <button>
              <Icon icon="mingcute:hat-fill" width={35} className="mx-auto" />
            </button>
          </div>

          <button
            onClick={leaveGame}
            className="flex_row items-center gap-1 leave-game rounded-full"
          >
            <p>Leave game</p>
            <Icon icon="vaadin:exit" width={20} className="mx-auto" />
          </button>
        </div>
        <Board />
        <div className="players-and-preview flex_row order-first lg:order-last gap-4 justify-between items-center lg:items-end">
          <div className="players flex_row gap-4">
            <article className="card">
              <p>name</p>
            </article>
            <article className="card">
              <p>name</p>
            </article>
          </div>
          <OpponentBoard />
        </div>
      </div>
    </section>
  );
}
