import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick} // ✅ now NavItem can close menu when clicked
    className={({ isActive }) =>
      `pill text-sm font-medium ${
        isActive
          ? "bg-white text-black dark:bg-[#f0f656] dark:text-black"
          : "text-white/90 hover:text-white"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="border-b border-neutral-200/60 dark:border-neutral-800 sticky top-0 z-40 bg-base-light/80 dark:bg-neutral-900/80 backdrop-blur">
      <div className="container-max flex items-center justify-between py-4">
        {/* Logo */}
        <NavLink to="/" onClick={() => setIsOpen(false)} className="text-xl font-bold">
          ps.
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-2 bg-black px-2 py-2 rounded-full items-center">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/projects">Projects</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/Experience">Experience</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <NavItem to="/game">Play</NavItem>
        </nav>

        {/* Right Side (Theme + Hamburger) */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="sm:hidden text-black dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden flex flex-col items-center gap-4 py-6 bg-black rounded-b-2xl">
          <NavItem to="/" onClick={closeMenu}>Home</NavItem>
          <NavItem to="/projects" onClick={closeMenu}>Projects</NavItem>
          <NavItem to="/about" onClick={closeMenu}>About</NavItem>
          <NavItem to="/Experience" onClick={closeMenu}>Experience</NavItem>
          <NavItem to="/contact" onClick={closeMenu}>Contact</NavItem>
          <NavItem to="/game" onClick={closeMenu}>Play</NavItem>

        </div>
      )}
    </header>
  );
}
