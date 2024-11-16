import ImageSlider from "./ImageSlider";

interface CardBackProps {
  images: string[];
}

const CardBack: React.FC<CardBackProps> = ({ images }) => {
  return (
    <div className="w-full h-full bg-primary shadow-lg rounded-lg p-6">
      <ImageSlider images={images} />
    </div>
  );
};

export default CardBack;
