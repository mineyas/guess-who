import { useState, useEffect } from "react";
import logo from "../../assets/img/qui.png";
export default function Card({ card, onClick, isDisabled, isFlipped, index }) {
  const frontCard = process.env.REACT_APP_BASE_URL;
  const image = `${frontCard}/uploads/`;
  const [localFlip, setLocalFlip] = useState(isFlipped);

  const handleFlipCard = () => {
    if (!isDisabled && !localFlip) {
      setLocalFlip(true);
      onClick();
    }
  };

  useEffect(() => {
    setLocalFlip(isFlipped);
  }, [isFlipped]);

  return (
    <div className="memory_card" onClick={handleFlipCard}>
      <span className={`memory_img ${!localFlip ? "back_card" : "front_card"}`}>
        <img
          src={!localFlip ? logo : `${image}${card.image}`}
          alt={card.name}
        />
      </span>
    </div>
  );
}
