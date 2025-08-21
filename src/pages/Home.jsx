import { Link } from "react-router-dom";
import { FaUserCircle, FaFolderOpen, FaSuitcase, FaEnvelope, FaGamepad } from "react-icons/fa";
const gridItems = [
  { label: "about.", to: "/about", colStart: 1, colEnd: 2, rowStart: 1, rowEnd: 2 },
  { label: "project.", to: "/projects", colStart: 2, colEnd: 3, rowStart: 1, rowEnd: 2 },
  { label: "experience.", to: "/experience", colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 3 },
  { label: "contact.", to: "/contact", colStart: 2, colEnd: 3, rowStart: 2, rowEnd: 3 },
  { label: "play.", to: "/play", colStart: 3, colEnd: 4, rowStart: 1, rowEnd: 3 }
];

export default function CustomGrid() {
  return (
    <>
      {/* GRID SECTION */}
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
      <div className="flex items-end justify-center w-full mt-10 mb-8 select-none">
        {/* prateek */}
        <span
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "7rem",
            color: "#fff",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          pratee
        </span>
        {/* slash or k */}
        <span
          style={{
            fontFamily: "'Kapakana', Arial, sans-serif",
            fontSize: "7rem",
            fontStyle: "italic",
            color: "#fff",
            fontWeight: 500,
            transform: "translateY(1.3rem)",
            lineHeight: 1,
            letterSpacing: "0.3em",
          }}
        >
          k
        </span>
        {/* sharm */}
        {/* <span
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "7rem",
            color: "#FAF45A",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          sharm
        </span> */}
        {/* a. */}
        {/* <span
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "5rem",
            color: "#FAF45A",
            fontStyle: "italic",
            fontWeight: 500,
            marginLeft: "0.05em",
            marginBottom: "1.4rem",
            lineHeight: 1,
          }}
        >
          a.
        </span> */}
        <span
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "7rem",
            color: "#f6f056",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          sharm
        </span>
        {/* slash or k */}
        <span
          style={{
            fontFamily: "'Kapakana', Arial, sans-serif",
            fontSize: "7rem",
            fontStyle: "italic",
            color: "#f6f056",
            fontWeight: 500,
            transform: "translateY(1.3rem)",
            lineHeight: 1,
          }}
        >
          a.
        </span>
      </div>
    </>
  );
}
