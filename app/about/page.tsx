const About: React.FC = () => {
  //   const isMenuOpen = "";
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
        <h1 className="text-4xl font-bold text-center mb-4">About Me</h1>
        <p className="text-lg  max-w-2xl text-justify">
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
        <p className="text-lg  max-w-2xl text-justify mt-4">
          My blend of support experience, QA testing, and full-stack development
          uniquely positions me as a bridge between technical teams. I have the
          potential to excel in roles that require cross-functional
          collaboration, from development to infrastructure management and
          testing.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Personal Interests</h2>
          <ul className="list-disc list-inside mt-4">
            <li>Choral Singing</li>
            <li>Hiking</li>
            <li>Road Trips (I love watching the changing scenery )</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;
