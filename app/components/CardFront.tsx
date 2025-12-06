import React from "react";

interface CardFrontProps {
  title: string;
  body: string;
}

const CardFront: React.FC<CardFrontProps> = ({ title, body }) => {
  return (
    <div className="w-full h-full bg-resume shadow-lg rounded-lg p-6 flex flex-col justify-between">
      <h2 className="text-xl font-bold mb-2 text-center text-background font-[family-name:var(--font-headings)]">
        {title}
      </h2>
      <p className="text-center text-background font-[family-name:var(--font-body)]md:font-lg">
        {body}
      </p>
      <p className="text-center text-xs text-background">
        (click to view some pics)
      </p>
    </div>
  );
};

export default CardFront;
