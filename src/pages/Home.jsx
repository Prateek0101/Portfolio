import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const blocks = [
  { label: "Projects", desc: "Explore my work", to: "/projects" },
  { label: "Experience", desc: "View my journey", to: "/experience" },
  { label: "Contact", desc: "Let’s connect", to: "/contact" },
  { label: "About", desc: "Know more about me", to: "/about" },
  { label: "Play", desc: "Fun experiments", to: "/game" },
];

const Home = () => {
  return (
    <section className="relative h-auto md:h-[55vh] flex flex-col md:flex-row items-center justify-between px-6 sm:px-12">
      {/* Left Content */}
      <div className="flex flex-col mt-[30px] justify-end h-full text-left max-w-xl pb-8 md:pb-12">
        <motion.h1 {...fade(0)}>
          <span className="block text-lg sm:text-xl font-medium text-neutral-600 dark:text-neutral-400">
            Hi, I’m
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl font-extrabold text-black dark:text-white mt-2">
            Prateek Sharma
          </span>
        </motion.h1>

        <motion.p
          {...fade(0.15)}
          className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300"
        >
          Frontend Developer & Prompt Engineer crafting clean, fast, and
          conversion-focused web apps with React, Tailwind, and thoughtful
          AI-driven UX.
        </motion.p>
      </div>

      {/* Right Floating Blocks */}
      <div className="relative flex-1 h-full flex flex-col md:block items-center justify-center mt-12 md:mt-[100px] gap-6">
        {/* Mobile: stacked cards */}
        <div className="flex flex-col gap-4 w-full md:hidden">
          {blocks.map((block, i) => (
            <motion.div
              key={block.label}
              {...fade(0.2 + i * 0.1)}
              className="bg-white dark:bg-neutral-900 text-black dark:text-white 
                         shadow-xl rounded-2xl px-6 py-5 cursor-pointer 
                         border border-neutral-200 dark:border-neutral-700 
                         w-full"
            >
              <Link to={block.to} className="block">
                <h3 className="text-xl font-semibold">{block.label}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                  {block.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop: floating blocks */}
        <div className="hidden md:block relative w-full h-full mt-[50px]">
          {blocks.map((block, i) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, scale: 0.85, x: i % 2 === 0 ? 80 : -80 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="absolute bg-white dark:bg-neutral-900 text-black dark:text-white 
                         shadow-xl rounded-2xl px-6 py-5 cursor-pointer hover:scale-105 
                         transition-all border border-neutral-200 dark:border-neutral-700 
                         w-56 sm:w-64"
              style={{
                top: `${i * 20}%`,
                right: `${(i % 2) * 22 + 8}%`,
              }}
            >
              <Link to={block.to} className="block">
                <h3 className="text-xl font-semibold">{block.label}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                  {block.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background blob */}
      <div className="pointer-events-none absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[60rem] h-[60rem] 
                        rounded-full blur-3xl opacity-20 dark:opacity-30 
                        bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-500" />
      </div>
    </section>
  );
};

export default Home;
