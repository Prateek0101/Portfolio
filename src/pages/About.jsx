import React from "react";
import { Link } from "react-router-dom";
const gridItems = [
  { label: "introduction.", to: "/about", colStart: 1, colEnd: 2, rowStart: 1, rowEnd: 2 },
  { label: "bio.", to: "/projects", colStart: 3, colEnd: 4, rowStart: 1, rowEnd: 2 },
  { label: "skills.", to: "/experience", colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 3 },
  { label: "hobbies.", to: "/contact", colStart: 3, colEnd: 4, rowStart: 2, rowEnd: 3 },
  { label: "photo.", to: "/play", colStart: 2, colEnd: 3, rowStart: 1, rowEnd: 3 }
];

const positions = [
  { top: "10%", left: "10%" },
  { top: "10%", left: "40%" },
  { top: "60%", left: "10%" },
  { top: "10%", left: "70%" },
  { top: "60%", left: "40%" },
];

const blockSize = 180;

export default function About() {
  return (
    <section className="relative min-h-screen px-4 py-10" style={{backgroundColor: "#161616"}}>
      {/* Floating blocks container */}
      <div
        className="grid gap-2 w-full max-w-6xl mx-auto mt-[100px]"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          minHeight: 360,
        }}
      >
        {gridItems.map(({ label, to, colStart, colEnd, rowStart, rowEnd }) => (
          <Link
            key={label}
            to={to}
            className="border border-[#222] rounded-xl flex items-end px-8 pb-8"
            style={{
              gridColumnStart: colStart,
              gridColumnEnd: colEnd,
              gridRowStart: rowStart,
              gridRowEnd: rowEnd,
              minHeight: 150,
              minWidth: 240,
            }}
          >
            <span className="text-[#F6F056] text-2xl font-light font-sans">{label}</span>
          </Link>
        ))}
      </div>

      {/* NAME SECTION (OUTSIDE GRID) */}
      <div className="flex items-end justify-start pl-[320px] w-full mt-10 mb-8 select-none">
        <span
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "9rem",
            color: "#fff",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          abou
        </span>
        <span
          style={{
            fontFamily: "'Kapakana', Arial, sans-serif",
            fontSize: "9rem",
            fontStyle: "italic",
            color: "#fff",
            fontWeight: 400,
            transform: "translateY(1.3rem)",
            lineHeight: 1,
          }}
        >
          t.
        </span>
        
      </div>
    </section>
  );
}
