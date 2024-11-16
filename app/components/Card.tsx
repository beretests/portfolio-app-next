import React, { useState } from "react";
import { motion } from "framer-motion";
import CardFront from "../components/CardFront";
import CardBack from "../components/CardBack";

interface CardProps {
  title: string;
  body: string;
  images: string[];
}

const Card: React.FC<CardProps> = ({ title, body, images }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full p-4">
      <motion.div
        className="w-full h-64 cursor-pointer"
        onClick={handleClick}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <CardFront title={title} body={body} />
        </div>
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <CardBack images={images} />
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
