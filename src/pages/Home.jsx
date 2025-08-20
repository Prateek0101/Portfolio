import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import contactIcon from "../images/contact.png"
import experienceIcon from "../images/experience.png"
import projectIcon from "../images/project.png"
import playIcon from "../images/play.png"
import aboutIcon from "../images/about.png"
import TypingEffect from "../components/TypingEffect";
import { useState } from "react";
import { useEffect } from "react";



const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});


const blocks = [
  { 
    label: "Experience", 
    desc: "View my journey", 
    to: "/experience",
    icon: "💼", // Fallback icon
    image: experienceIcon,
    hasImage: true
  },
  { 
    label: "Projects", 
    desc: "Explore my work", 
    to: "/projects",
    icon: "📁", // Fallback icon
    image: projectIcon,
    hasImage: true
  },
  { 
    label: "Contact", 
    desc: "Let's connect", 
    to: "/contact",
    icon: "📞", // Fallback icon
    image: contactIcon,
    hasImage: true
  },
  { 
    label: "About", 
    desc: "Know more about me", 
    to: "/about",
    icon: "👤", // Fallback icon
    image: aboutIcon, 
    hasImage: true
  },
  { 
    label: "Play", 
    desc: "Fun experiments", 
    to: "/game",
    icon: "🎮", // Fallback icon
    image: playIcon,
    hasImage: true
  },
];


const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Positions for desktop and mobile
  const desktopPositions = [
    { top: "10%", left: "25%" },
    { top: "10%", right: "25%" },
    { bottom: "15%", left: "22%" },
    { bottom: "15%", right: "22%" },
    { top: "80%", left: "45%", transform: "translate(-30%, 30%)" },
  ];

  const mobilePositions = [
    { top: "5%", left: "10%" },
    { top: "5%", right: "10%" },
    { bottom: "10%", left: "10%" },
    { bottom: "10%", right: "10%" },
    { top: "70%", left: "50%", transform: "translate(-50%, 30%)" },
  ];

  const positions = isMobile ? mobilePositions : desktopPositions;
  const blockSize = isMobile ? 140 : 180;

  return (
    <section className="relative min-h-[600px] flex items-center justify-center px-4 sm:px-12 py-10 sm:py-16">
      {/* Center container for details */}
      <motion.div
        {...fade(1)}
        className="z-10 max-w-xl text-center px-2 sm:px-0"
        style={{ maxWidth: isMobile ? "90vw" : undefined }}
      >
        <span className="block text-xl font-medium text-neutral-600 dark:text-neutral-400">
          Hi, I'm
        </span>
        <h1 className="block text-4xl sm:text-6xl font-extrabold text-black dark:text-white mt-2 leading-tight">
          Prateek Sharma
        </h1>
        <p className="mt-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <TypingEffect
            text={`Frontend Developer & Prompt Engineer crafting clean, fast, and conversion-focused web apps with React, Tailwind, and thoughtful AI-driven UX.`}
          />
        </p>
      </motion.div>

      {/* Floating blocks container */}
      <div className="absolute inset-0 pointer-events-none">
        {blocks.map((block, i) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0.4, scale: 0.85, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
            transition={{
              duration: 5,
              delay: 0.3 + i * 0.2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="bg-white dark:bg-neutral-900 text-black dark:text-white shadow-lg rounded-xl border border-neutral-200 dark:border-neutral-700 cursor-pointer absolute overflow-hidden"
            style={{
              width: blockSize,
              height: blockSize,
              ...positions[i],
            }}
          >
            <Link to={block.to} className="block h-full w-full pointer-events-auto">
              <img
                src={block.image}
                alt={block.label}
                className="w-full h-full object-cover rounded-xl"
                style={{ borderRadius: "0.75rem" }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-center">
                  <h3 className="text-lg font-semibold mb-1 text-white">{block.label}</h3>
                  <p className="text-xs text-gray-200">{block.desc}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Home;