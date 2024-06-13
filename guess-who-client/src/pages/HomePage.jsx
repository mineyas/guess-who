import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import {
  addPlayer,
  getUser,
  loadAllCharactersPlayer,
  logoutGet,
} from "../api/routes";
import loadingAnimation from "../assets/animations/load.json";
import MessageBanner from "../components/MessageBanner";

export default function HomePage() {
  const name = sessionStorage.getItem("firstname");
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("id");
  console.log(userId, "userid session");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [addUsername, setAddUsername] = useState(false);
  const [user, setUser] = useState({});
  const [characters, setCharacters] = useState([]);
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(user, "user here");

  const fetchUser = async () => {
    try {
      const response = await getUser(userId);
      console.log(response.user, "current user");
      setUser(response.user);
    } catch (error) {
      console.error("Error player:", error.message);
    }
  };
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

  const checkPlayerId =  () => {
     fetchUser();
     loadCharacters();

    if (!user.playerId) {
      setAddUsername(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        if (characters.length < 24) {
          console.log(characters.length, "characters length");
          navigate("/memo_game");
        } else {
          navigate("/game");
        }
      }, 3000);
    }
  };

  // const checkCharactersNumber = () => {
  //   loadAllCharactersPlayer();
  //   setLoading(true);
  //   if (characters.length < 24) {
  //     navigate("/memo_game");
  //   }
  // };
  const onSubmit = async (data) => {
    // setLoadingMessage("Adding character...");
    console.log(data, "form data add player");
    try {
      const response = await addPlayer({
        userId: user._id,
        username: data.username,
      });
      const newPlayer = response.player;
      setPlayer(newPlayer);
      fetchUser();
      setMessage("Character added successfully");
      setMessageType("success");

      setTimeout(() => {
        setLoading(true);
        navigate("/game");
        navigate("/memo_game");
      }, 4000);
    } catch (error) {
      setMessage("Error adding character");
      setMessageType("error");
      console.error("Error adding character:", error.message);
    }
  };

  const goToScores = () => {
    navigate("/scores");
  };

  const defaultOption = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {/* <Navbar username={name + " (" + role + ")"} onLogout={handleLogout} /> */}
      <section className="section homepage_player">
        <div className="p-8 bg-white rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6 text-primary-dark">
            Welcome to Guess Who!
          </h1>
          <div className="flex justify-evenly mb-6">
            <button
              onClick={checkPlayerId}
              className="button bg-accent2-dark hover:bg-accent2-light hover:text-accent2-dark text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
            >
              New game
            </button>
            <button
              onClick={goToScores}
              className="button bg-accent3-dark hover:bg-accent3-light hover:text-accent3-dark text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
            >
              See scores
            </button>
          </div>
          {addUsername && (
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="text-center"
            >
              <span className="flex gap-3 justify-center">
                <input
                  type="text"
                  placeholder="Enter username"
                  className="input-field"
                  id="username"
                  {...register("username", { required: true })}
                />
                <button
                  type="submit"
                  className="button bg-accent2-dark hover:bg-accent2-light hover:text-accent2-dark text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
                >
                  Go
                </button>
              </span>
              {errors.username && (
                <span className="text-red-600">This field is required</span>
              )}
            </form>
          )}
        </div>
        {loading && (
          <div className="loading">
            <Lottie options={defaultOption} height={300} width={300} />
            {loadingMessage}
          </div>
        )}
        {message && <MessageBanner type={messageType} message={message} />}
      </section>
    </>
  );
}
