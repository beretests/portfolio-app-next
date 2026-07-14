// components/ImageSlider.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderArrow from "./SliderArrow";

const SlickSlider = dynamic(() => import("react-slick"), { ssr: false });

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const showArrows = images.length > 1;
  const settings = {
    dots: false,
    infinite: showArrows,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: showArrows,
    autoplay: false,
    nextArrow: <SliderArrow direction="next" />,
    prevArrow: <SliderArrow direction="prev" />,
  };

  return (
    <div className="h-full" onClick={(event) => event.stopPropagation()}>
      <SlickSlider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            className="h-full flex items-center justify-center"
          >
            <div
              className="relative w-full pb-8"
              style={{ aspectRatio: "16 / 9" }}
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain rounded-md"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default ImageSlider;
