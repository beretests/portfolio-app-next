import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderArrow from "./SliderArrow";

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
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // nextArrow: <SliderArrow direction="next" onClick={() => {}} />,
    // prevArrow: <SliderArrow direction="prev" onClick={() => {}} />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {(images as unknown as string[]).map((image: string, index: number) => (
        <div key={index} onClick={onImageClick} className="cursor-pointer">
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className={`w-full h-auto ${
              isZoomed ? "max-h-screen" : "max-h-48"
            } object-contain`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
