import ImageSlider from "./ImageSlider";

interface CardBackProps {
  images: string[];
  onBack: () => void;
}

const CardBack: React.FC<CardBackProps> = ({ images, onBack }) => {
  return (
    <div
      className="relative w-full h-fit bg-primary shadow-lg rounded-lg p-4 sm:p-5 overflow-hidden"
      onClick={(event) => event.stopPropagation()}
    >
      <ImageSlider images={images} />
      <button
        type="button"
        onClick={onBack}
        className="absolute right-3 top-3 z-20 rounded-full bg-background/85 px-3 py-1.5 text-xs font-semibold text-foreground shadow-md transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Return to interest details"
      >
        Back to details
      </button>
    </div>
  );
};

export default CardBack;
