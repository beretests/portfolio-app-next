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
        <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
        <div className="mb-4">
          <h3 className="text-xl font-medium">Software Engineer</h3>
          <p className="grid md:grid-cols-2 text-gray-600">
            Portage CyberTech
            <span className="md:justify-self-end">April 2021 - Current</span>
          </p>
          <ul className="list-disc list-outside mt-2 px-4 gap-2">
            <li className="mb-2">
              Developed and maintained automated test scripts for critical
              features using Playwright similar to Cypress, improving test
              coverage by 50% and reduced execution time by 30%, complementing
              manual testing efforts, and ensuring high-quality software
              releases.
            </li>
            <li className="mb-2">
              Integrated automated tests into CI/CD pipelines (GitLab), enabling
              rapid and reliable deployment of code changes while maintaining
              high-quality standards.
            </li>
            <li className="mb-2">
              Collaborated with software engineers and product managers to
              define test automation strategies, providing comprehensive
              coverage of web application features.
            </li>
            <li className="mb-2">
              Implemented a k6 load testing strategy, reducing performance
              incidents by 50% and improving early detection by integrating
              tests into the CI/CD pipeline. aligning with similar practices in
              JMeter.
            </li>
            <li className="mb-2">
              Conducted code reviews to ensure the maintainability and quality
              of automated tests, improving team productivity and reducing test
              cycle time by 10%.
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-medium">Customer Support Specialist</h3>
          <p className="grid md:grid-cols-2 text-gray-600">
            Portage CyberTech
            <span className="md:justify-self-end">June 2020 - April 2021</span>
          </p>
          <ul className="list-disc list-outside mt-2 px-4">
            <li className="mb-2">
              Consistently maintained above 98% customer satisfaction rating and
              reduced average resolution time by 25% through effective
              troubleshooting and communicating via Jira.
            </li>
            <li className="mb-2">
              Streamlined the ticketing process and developed a new FAQ section
              that reduced repeat inquiries, reducing backlog by 30%.
            </li>
            <li className="mb-2">
              Streamlined the ticketing process and developed a new FAQ section
              that reduced repeat inquiries, reducing backlog by 30%.
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-medium">IT Support Specialist</h3>
          <p className="grid md:grid-cols-2 text-gray-600">
            Digital Solutions Limited
            <span className="md:justify-self-end">July 2012 - August 2018</span>
          </p>
          <ul className="list-disc list-outside mt-2 px-4">
            <li className="mb-2">
              Delivered both on-site and remote IT support services, resolving
              95% of tickets within SLA timeframes using remote desktop
              connections, phone calls, and IT tools, improving overall team
              efficiency by 20%.
            </li>
            <li className="mb-2">
              Conducted desk-side training for over 50 staff members on
              operating hardware and software for newly deployed assets,
              resulting in a 30% reduction in support requests related to new
              equipment.
            </li>
            <li className="mb-2">
              Resolved over 100 network-related issues, including LAN, Wi-Fi,
              and Internet connectivity problems, and configured smartphones for
              Wi-Fi access, reducing connectivity downtime by 25%.
            </li>
            <li className="mb-2">
              Developed and maintained a centralized information system
              documenting all software use policies, and asset allocation
              procedures, increasing team access to critical resources by 40%
              and reducing troubleshooting time by 15%.
            </li>
          </ul>
        </div>
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
        <h2 className="text-2xl font-semibold mb-4">
          Professional Development
        </h2>
        <h3 className="grid md:grid-cols-2">
          Beyond the Cloud | Information and Communications Technology Council
          (ICTC)
          <span className="md:justify-self-end md:align-text-bottom">
            September 2024 – Present
          </span>
        </h3>
        <p className="pt-4">
          Selected for a 10-week customized training program, funded by Upskill
          Canada (powered by Palette Skills) and the Government of Canada.
          Courses included:
        </p>
        <ul className="list-disc list-inside">
          <li>DevOps Culture and Mindset</li>
          <li>DevOps Engineering on AWS</li>
          <li>Managing Cloud-native Applications with Kubernetes</li>
          <li>Developing Solutions for Microsoft Azure</li>
          <li>
            AIM (Agile Industry Mindset) - social awareness, emotional
            intelligence, and active communication.
          </li>
        </ul>
        {/* [PROJECT TITLE] Capstone Project (Work Integrated Learning)
[Employer Name] [DATE]
• Bullet Point 1: Accomplished X by measuring Y resulting in Z
• Bullet Point 2: Accomplished X by measuring Y resulting in Z
• Bullet Point 3: Accomplished X by measuring Y resulting in Z */}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
        <ul className="list-disc list-inside">
          <li className="grid md:grid-cols-2">
            <a className="md:justify-self-start">Azure Fundamentals</a>
            <span className="justify-self-end">Microsoft | December 2023</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ResumePage;
