import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameBoard from "../components/MemoMemory/GameBoard";
import { loadAllCharactersPlayer } from "../api/routes";

export default function MemoryGamePage() {
  const navigate = useNavigate();
  
  // gestion cartes
  const [shuffledCards, setShuffledCards] = useState([]);
  const [memoCards, setMemoCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  // gestion stats
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  
  // gestion timer
  const [startTime, setStartTime] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // SHUFFLE ARRAY
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const doubleCards = (cards) => {
    const shuffledCards = [...cards, ...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, isFlipped: false }));
    console.log(shuffledCards, "shuffled cards");
    setShuffledCards(shuffledCards);
    setMoves(0);
    setPoints(0);
  };

  // LOAD LES CHARACTERS
  const loadCards = async () => {
    try {
      const res = await loadAllCharactersPlayer();
      const characters = res.characters;
      console.log(res, "load cards");

      // Shuffle characters and pick 6 random ones
      const shuffledCharacters = shuffleArray(characters).slice(0, 6);
      console.log(shuffledCharacters, "selected characters");

      setMemoCards(shuffledCharacters);
      doubleCards(shuffledCharacters);
    } catch (error) {
      console.error("Error while fetching characters:", error);
    }
  };

  const handleGameOver = (finalMoves) => {
    setScore(calculateScore(finalMoves));
    stopTimer();
  };

  const startTimer = () => {
    setTimerRunning(true);
    setStartTime(Date.now());
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setElapsedTime(0);
    setStartTime(null);
  };

  const resetTimer = () => {
    setElapsedTime(0);
    setStartTime(null);
  };

  const calculateScore = (moves) => {
    return 1000 - moves * 10;
  };

  const formatTime = (timeInMilliseconds) => {
    const seconds = Math.floor(timeInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60;
    return `${minutes}:${formattedSeconds < 10 ? "0" : ""}${formattedSeconds}`;
  };

  const restartGame = () => {
    loadCards();
    setMemoCards([]);
    setMatchedCards([]);
    setFlippedCards([]);
    stopTimer();
  };

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTime);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerRunning, startTime]);

  return (
    <section className="section">
      <div className="container_title memo_title">
        <h1>Memo Game</h1>
        <div className="stats_container">
          <h3>Moves: {moves} </h3>
          <h3>Points: {points} </h3>
          <h3>Time: {formatTime(elapsedTime)} </h3>
          <h3>Score: {score} </h3>
        </div>
      </div>
      <GameBoard
        loadCards={loadCards}
        onGameOver={handleGameOver}
        setMemoCards={setMemoCards}
        shuffledCards={shuffledCards}
        setMatchedCards={setMatchedCards}
        setFlippedCards={setFlippedCards}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
        moves={moves}
        setMoves={setMoves}
        points={points}
        setPoints={setPoints}
        startTimer={startTimer}
        resetTimer={resetTimer}
        timerRunning={timerRunning}
      />
      <div className="container_button">
        <button onClick={restartGame}>Restart Game</button>
        <button onClick={() => navigate("/score")}>Go To Score</button>
      </div>
    </section>
  );
}
