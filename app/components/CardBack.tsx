import ImageSlider from "./ImageSlider";

interface CardBackProps {
  images: string[];
}

const CardBack: React.FC<CardBackProps> = ({ images }) => {
  return (
    <div className="w-full h-fit bg-primary shadow-lg rounded-lg p-4 sm:p-5  overflow-hidden">
      <ImageSlider images={images} />
    </div>
  );
};

export default CardBack;
