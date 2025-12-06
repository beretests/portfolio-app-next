// components/SliderArrow.tsx

import React from "react";

interface SliderArrowProps {
  direction: "next" | "prev";
  onClick: () => void;
}

const SliderArrow: React.FC<SliderArrowProps> = ({ direction, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event propagation
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === "next" ? "right-2" : "left-2"
      } bg-white bg-opacity-50 hover:bg-opacity-100 rounded-full p-2 transition-all duration-300`}
    >
      {direction === "next" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      )}
    </button>
  );
};

export default SliderArrow;
