import React from "react";
import SkillsIcons from "../components/SkillsIcon";

const ResumePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Eberechi Omeje</h1>
        <p className="text-lg text-gray-600">Software Engineer</p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            "CI/CD",
            "User Authentication",
            "Database Management",
            "Performance Testing",
            "Security Testing",
            "Application Monitoring",
            "Identity and Access Management",
          ].map((skill, index) => (
            <div key={index} className="rounded-md p-2 text-center">
              {skill}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Programming Languages and Frameworks
        </h2>
        <SkillsIcons />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
        {[1, 2].map((job) => (
          <div key={job} className="mb-4">
            <h3 className="text-xl font-medium">Job Title {job}</h3>
            <p className="text-gray-600">
              Company Name • Start Date - End Date
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Responsibility or achievement</li>
              <li>Responsibility or achievement</li>
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <div className="mb-4">
          <h3 className="text-xl font-medium">
            Bachelors in Electrical Engineering
          </h3>
          <p className="text-gray-600">University of Nigeria, Nsukka</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-medium">
            Diploma in Software Engineering
          </h3>
          <p className="text-gray-600">BrainStation</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Professional Development
        </h2>
        <ul className="list-disc list-inside">
          <li>Course or workshop name</li>
          <li>Course or workshop name</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
        <ul className="list-disc list-inside">
          <li>Certification name • Issuing organization • Year</li>
          <li>Certification name • Issuing organization • Year</li>
        </ul>
      </section>
    </div>
  );
};

export default ResumePage;
