import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ScrollingText from "./../components/ScrollingText";

const HeroSection = () => {
  const roles = [
    "QA Engineer",
    "Devops Engineer",
    "Backend Software Engineer",
    "Full-Stack Software Engineer",
    "Platform Engineer",
    "Singer",
    "Data Engineer",
    "Front-End Developer",
    "Security Engineer",
    "Platform Engineer",
    "Cloud Engineer",
  ];

  return (
    <section className="relative h-[40vh] w-full flex flex-col justify-center mt-8">
      <MusicNoteIcon className="absolute top-4 right-4 md:right-40 xl:right-64 text-foreground text-4xl md:text-5xl xl:text-6xl" />
      <span className="md:text-2xl mx-auto text-left uppercase pt-12">
        Hi! I'm
        <br />
      </span>
      <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold pt-12 text-primary text-center font-[family-name:var(--font-special)]">
        Eberechi Omeje
      </h1>
      <ScrollingText texts={roles} interval={100} />

      <MusicNoteIcon className="absolute bottom-4 left-4 md:left-40 xl:left-64 text-foreground text-4xl md:text-5xl xl:text-6xl" />
    </section>
  );
};

export default HeroSection;
