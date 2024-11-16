"use client";
// import CardGrid from "../components/CardGrid";
import Card from "../components/Card";
import Logo1 from "../images/portfolio-logo-cream.png";
import Logo2 from "../images/portfolio-logo-grey.png";
import Logo3 from "../images/portfolio-logo-darkblue.png";

const cardData = [
  {
    title: "Choral Singing",
    body: "You'll find me most Sundays singing in my church choir and often with the University concert choir in my city.",
    images: [Logo1, Logo2, Logo3],
  },
  {
    title: "Indoor Plants",
    body: "I'm no green thumb but I'm proud of the plants I've managed to keep alive. I will never give up :)",
    images: [Logo1, Logo2, Logo3],
  },
  {
    title: "Road Trips",
    body: "I love watching the changing landscape and notable landmarks as we move from one place to another",
    images: [Logo1, Logo2, Logo3],
  },
];

const About: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
        <h1 className="text-3xl font-bold text-center text-primary mb-4 mt-16 font-[family-name:var(--font-headings)]">
          About Me
        </h1>
        <p className="md:text-lg max-w-2xl text-justify font-[family-name:var(--font-body)]">
          I'm a software engineer with an eclectic experience in software
          development, software testing, system administration and technical
          support. I'm highly adaptable - whether it's switching from software
          testing to software engineering and back, learning new technologies
          like TypeScript and Supabase on the fly, or applying my
          problem-solving skills across various roles and industries, I
          consistently show resilience and a capacity to pivot quickly. I also
          have a keen interest in the infrastructure side of things, as I've
          solved problems with deploying applications with Nginx, Docker, Heroku
          and Cloudflare.
        </p>
        <p className="md:text-lg max-w-2xl text-justify mt-4 font-[family-name:var(--font-body)]">
          My blend of support experience, QA testing, and full-stack development
          uniquely positions me as a bridge between technical teams. I have the
          potential to excel in roles that require cross-functional
          collaboration, from development to infrastructure management and
          testing.
        </p>
        <div className="w-full mt-8 p-8">
          <h2 className="text-2xl font-semibold text-center font-[family-name:var(--font-headings)] text-primary">
            Personal Interests
          </h2>
          <div className="container mx-auto px-4 lg:px-24 py-8">
            <div className="grid md:grid-cols-center-3 -mx-4">
              {cardData.map((card, index) => (
                <Card
                  key={index}
                  {...card}
                  images={card.images.map((img) => img.src)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
