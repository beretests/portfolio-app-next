import Link from "next/link";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaDev,
  FaGlobe,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary text-foreground py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="mb-4 sm:mb-0 text-primary">
            &copy; 2024 Beretests. All rights reserved.
          </p>
          <div className="flex justify-center sm:justify-end space-x-4 w-full sm:w-auto">
            <Link
              href="mailto:eb.omeje@gmail.com"
              className="hover:text-highlight transition-colors"
            >
              <FaEnvelope size={24} className="text-primary hover:bg-hover" />
            </Link>
            <Link
              href="tel:3065802676"
              className="hover:text-highlight transition-colors"
            >
              <FaPhone size={24} className="text-primary hover:bg-hover" />
            </Link>
            <Link
              href="https://beretesting.com"
              className="hover:text-highlight transition-colors"
            >
              <FaGlobe size={24} className="text-primary hover:bg-hover" />
            </Link>
            <Link
              href="https://linkedin.com/in/eomeje"
              className="hover:text-link transition-colors"
            >
              <FaLinkedin size={24} className="text-primary hover:bg-hover" />
            </Link>
            <Link
              href="https://github.com/beretests"
              className="hover:text-link transition-colors"
            >
              <FaGithub size={24} className="text-primary hover:bg-hover" />
            </Link>
            <Link
              href="https://dev.to/beretests"
              className="hover:text-link transition-colors"
            >
              <FaDev size={24} className="text-primary hover:bg-hover" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
