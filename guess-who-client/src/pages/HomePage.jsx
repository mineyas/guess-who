import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  addPlayer,
  getPlayer,
  getPlayerByUserId,
  logoutGet,
} from "../api/axios";
import { useEffect, useState } from "react";
import MessageBanner from "../components/MessageBanner";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function HomePage() {
  const name = localStorage.getItem("firstname");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [addUsername, setAddUsername] = useState(false);

  const handleLogout = () => {
    try {
      logoutGet();
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("firstname");
      setMessage("Logout successful");
      setMessageType("success");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setMessage("Error logging out");
      setMessageType("error");
    }
  };

  // const checkPlayerExists = async (playerId) => {
  //   // try {
  //   //   const player = await getPlayer(userId);
  //   //   console.log(player, "playerr");
  //   //   if (!player) {
  //   //     setAddUsername(true);
  //   //   }
  //   //   // if (player) {
  //   //   //   setAddUsername(false);
  //   //   //   navigate("/game");
  //   //   // } else {
  //   //   //   setAddUsername(true);
  //   //   // }
  //   // } catch (error) {
  //   //   console.error("Error player:", error.message);
  //   // }
  //   try {
  //     const response = await getPlayer(playerId); // Fetch player by playerId
  //     if (response.data.player) {
  //       console.log('Player exists:', response.data.player);
  //       // Player exists, you can proceed with the game or any other action
  //     } else {
  //       console.log('Player does not exist');
  //       // Player doesn't exist, you may want to prompt the user to create a new player
  //     }
  //   } catch (error) {
  //     console.error('Error checking player existence:', error.message);
  //     // Handle error
  //   }
  // };

  const checkByUserId = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/player/user/${userId}`);
      const result = response.player;
      console.log(result, 'ressssss');

      if (!result || result === null) {
        setAddUsername(true);
      }
      navigate("/game");
      console.log(userId, "plauserrrr idddd yerr");
      console.log(response.player, "playerr");

      // return result;
    } catch (error) {
      console.error("Error retrieving player:", error);
      throw new Error("Error retrieving player");
    }
  };
  const newGame = async (data) => {
    try {
      const response = await addPlayer(data);
      navigate("/game");
    } catch (error) {
      console.error("Error player:", error.message);
      setMessage("Error player");
      setMessageType("error");
    }
  };
  const goToGame = () => {
    setAddUsername(true);
  };
  const goToScores = () => {
    navigate("/scores");
  };

  useEffect(() => {
    // checkByUserId();
  }, []);
  return (
    <>
      {/* <Navbar username={name + " (" + role + ")"} onLogout={handleLogout} /> */}
      <section className="flex flex-col items-center justify-center h-screen bg-accent4-dark">
        <div className="p-8 bg-white rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6 text-primary-dark">
            Welcome to Guess Who!
          </h1>
          <div className="flex justify-evenly mb-6">
            <button
              onClick={checkByUserId}
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
            // <span className="flex gap-3 justify-center">
            <form
              action=""
              onSubmit={handleSubmit(newGame)}
              className="flex gap-3 justify-center"
            >
              <input
                type="text"
                placeholder="Enter username"
                className="input-field"
              />
              <button
                type="submit"
                // onClick={newGame}
                className="button bg-accent2-dark hover:bg-accent2-light hover:text-accent2-dark text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
              >
                Go
              </button>
            </form>
            // </span>
          )}
        </div>
        {message && <MessageBanner type={messageType} message={message} />}
      </section>
    </>
  );
}
