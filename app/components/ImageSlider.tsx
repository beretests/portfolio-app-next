// components/ImageSlider.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSlider = dynamic(() => import("react-slick"), { ssr: false });

interface ImageSliderProps {
  images: string[];
  onImageClick?: () => void;
  isZoomed?: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  onImageClick,
  isZoomed,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="h-full [&_.slick-dots]:!-bottom-4 [&_.slick-dots>li>button:before]:text-xs [&_.slick-dots>li>button:before]:text-foreground/70">
      <SlickSlider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={onImageClick}
            className="cursor-pointer h-full flex items-center justify-center"
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
