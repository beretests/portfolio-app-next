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

  return (
    <div className="w-full p-4 relative">
      <motion.div
        className={`relative w-full aspect-video ${
          isFlipped ? "" : "cursor-pointer"
        }`}
        onClick={isFlipped ? undefined : () => setIsFlipped(true)}
        onKeyDown={(event) => {
          if (!isFlipped && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            setIsFlipped(true);
          }
        }}
        role={isFlipped ? undefined : "button"}
        tabIndex={isFlipped ? -1 : 0}
        aria-label={isFlipped ? undefined : `View ${title} photos`}
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
          <CardBack images={images} onBack={() => setIsFlipped(false)} />
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
