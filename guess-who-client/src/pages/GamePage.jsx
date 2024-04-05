import { Icon } from "@iconify/react";
import { useState } from "react";
import femme from "../assets/img/femme.png";
import qui from "../assets/img/quii.png";
import { useNavigate } from "react-router-dom";

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
    <section className="parent-container">
      <h1>Gameee</h1>
      <div className="flex_row gap-4 justify-between">
        <div className="question-bar w-fit">
          <div className="flex_col gap-4">
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
        <div className="board grid grid-cols-6 gap-4 w-fit">
          <article className="card-game">
            {isDeleted && (
              <span className="card-deleted">
                <Icon
                  icon={"radix-icons:cross-1"}
                  width={150}
                  height={180}
                  className="text-red-500"
                ></Icon>
              </span>
            )}
            <img src={femme} alt="card" className="card-img" />
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
          <article className="card-game">
            <p className="text-center card-name">Name card</p>
          </article>
        </div>

        <div className="flex_col items-end justify-between">
          <div className="players flex_col gap-4">
            <article className="card">
              <p>name</p>
            </article>
            <article className="card">
              <p>name</p>
            </article>
          </div>
          <div className="opponent-board border border-blue-700 grid grid-cols-6 gap-2 w-fit">
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
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
            <article className="opponent-card flex items-center justify-center">
              <span className="w-fit bg-white rounded-full">
                <img src={qui} alt="logo guess who" className="w-10" />
              </span>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
