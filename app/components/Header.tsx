"use client";

import { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import DarkLogo from "./../portfolio-logo-pink.png";
import LightLogo from "./../portfolio-logo-lightpink.png";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-secondary shadow-md font-[family-name:var(--font-headings)]">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center"
          style={{ aspectRatio: "50 / 50" }}
        >
          <Image
            src={DarkLogo}
            alt="logo"
            height={50}
            width={50}
            className="w-10 md:w-14 h-auto transition-all duration-300 ease-in-out dark:hidden"
            priority
          />
          <Image
            src={LightLogo}
            alt="logo"
            height={50}
            width={50}
            className="w-10 md:w-14 h-auto transition-all duration-300 ease-in-out hidden dark:block"
            priority
          />
        </Link>

        <nav className="hidden md:flex space-x-4">
          <NavLink href="/resume">Resume</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        <button
          className="md:hidden text-primary focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <MenuOpenIcon className="text-primary" sx={{ fontSize: 40 }} />
          ) : (
            <MenuIcon className="text-primary" sx={{ fontSize: 40 }} />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-secondary px-4 py-2">
          <NavLink href="/resume" onClick={toggleMenu}>
            Resume
          </NavLink>
          <NavLink href="/projects" onClick={toggleMenu}>
            Projects
          </NavLink>
          <NavLink href="/blog" onClick={toggleMenu}>
            Blog
          </NavLink>
          <NavLink href="/contact" onClick={toggleMenu}>
            Contact
          </NavLink>
        </nav>
      )}
    </header>
  );
};

// const NavLink: React.FC<{
//   href: string;
//   children: React.ReactNode;
//   onClick?: () => void;
// }> = ({ href, children, onClick }) => (
//   <Link
//     href={href}
//     className="block py-2 px-5 text-primary text-lg font-semibold hover:bg-hover transition duration-300"
//     onClick={onClick}
//   >
//     {children}
//   </Link>
// );
const NavLink: React.FC<NavLinkProps> = ({
  href,
  exact = false,
  children,
  className = "",
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  const activeClass = isActive
    ? "text-active font-bold"
    : "text-primary font-semibold";

  return (
    <Link
      href={href}
      className={`${className} ${activeClass} hover:bg-hover transition-colors block py-2 px-5 text-lg`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;
