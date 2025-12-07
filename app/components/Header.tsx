"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import DarkLogo from "./../images/portfolio-logo-pink.png";
import LightLogo from "./../images/portfolio-logo-lightpink.png";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

interface NavLinkProps {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  // useEffect(() => {
  //   // Presence of admin-auth cookie is enough to show the link (auth is still enforced by middleware)
  //   const hasAdminCookie = document.cookie
  //     .split("; ")
  //     .some((c) => c.startsWith("admin-auth="));
  //   setIsAdmin(hasAdminCookie);
  // }, [pathname]);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setIsAdmin(data.isAdmin);
      } catch (err) {
        console.error("Failed to check admin", err);
      }
    }

    checkAdmin();
  }, [pathname]);

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
          <NavLink href="/about">About</NavLink>
          <NavLink href="/resume">Resume</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          {isAdmin && <NavLink href="/admin">Admin</NavLink>}
        </nav>

        <div className="flex items-center">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
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
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-secondary px-4 py-2">
          <NavLink href="/about" onClick={toggleMenu}>
            About
          </NavLink>
          <NavLink href="/resume" onClick={toggleMenu}>
            Resume
          </NavLink>
          <NavLink href="/projects" onClick={toggleMenu}>
            Projects
          </NavLink>
          <NavLink href="/blog" onClick={toggleMenu}>
            Blog
          </NavLink>
          {isAdmin && (
            <NavLink href="/admin" onClick={toggleMenu}>
              Admin
            </NavLink>
          )}
          <div className="py-2">
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
};

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
