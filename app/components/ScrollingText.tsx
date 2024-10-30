"use client";

import { useState, useEffect } from "react";

interface ScrollingTextProps {
  texts: string[];
  interval?: number;
  displayDuration?: number;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({
  texts,
  interval = 100,
  displayDuration = 5000,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let charIndex = 0;
    setDisplayedText(""); // Reset displayed text at the start

    const typeInterval = setInterval(() => {
      // Stop if the character index exceeds the text length
      if (charIndex < currentText.length) {
        // charIndex++;
        // setDisplayedText((prev) => prev + currentText[charIndex]);
        setDisplayedText(currentText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);

        // Pause before clearing and moving to the next text
        setTimeout(() => {
          setDisplayedText("");
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, displayDuration);
      }
    }, interval);

    return () => clearInterval(typeInterval);
  }, [currentTextIndex, texts, interval, displayDuration]);

  return (
    <div className="flex items-center justify-center h-20">
      <p className="text-left text-xl font-medium tracking-wide">
        {displayedText}
      </p>
    </div>
  );
};

export default ScrollingText;
