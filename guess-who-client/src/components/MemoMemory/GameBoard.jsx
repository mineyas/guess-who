import { useEffect } from "react";
import Card from "./Card";

export default function GameBoard({
  loadCards,
  onGameOver,
  moves,
  setMoves,
  setMemoCards,
  setMatchedCards,
  matchedCards,
  setFlippedCards,
  flippedCards,
  shuffledCards,
  points,
  setPoints,
  startTimer,
  resetTimer,
  timerRunning,
}) {


  // GESTION DE FLIP CARTE
  const handleFlipCard = (index) => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(index) &&
      !matchedCards.includes(index)
    ) {
      if (!timerRunning) {
        startTimer();
      }
      setFlippedCards([...flippedCards, index]);
    }
  };

  // GESTION DE MATCH DE CARTE
  const handleMatch = () => {
    const [firstIndex, secondIndex] = flippedCards;
    const firstCard = shuffledCards[firstIndex];
    const secondCard = shuffledCards[secondIndex];

    if (firstCard.name === secondCard.name) {
      setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
      setPoints((prev) => prev + 10);

      if (matchedCards.length + 2 === shuffledCards.length) {
        onGameOver(moves + 1);
      }
    }
    setMoves((prev) => prev + 1);
    resetFlippedCards();
  };

  // RESET DE CARTE
  const resetFlippedCards = () => {
    setFlippedCards([]);
  };

  // RESTART DE PARTIE
  const restartGame = () => {
    setMemoCards([]);
    setMatchedCards([]);
    setFlippedCards([]);
    loadCards();
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => handleMatch(), 1000);
    }
  }, [flippedCards]);

  return (
    <>
      <div className="container_game">
        {shuffledCards.map((card, index) => (
          <Card
            key={index}
            card={card}
            onClick={() => handleFlipCard(index)}
            isDisabled={flippedCards.length === 2}
            isFlipped={
              flippedCards.includes(index) || matchedCards.includes(index)
            }
          />
        ))}
      </div>
    </>
  );
}
