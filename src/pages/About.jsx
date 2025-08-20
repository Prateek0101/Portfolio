import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import avatar from "../images/avatar.png"; // replace with your avatar image path
import TypingEffect from "../components/TypingEffect";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function About() {
  return (
    <motion.div
      className="container-max py-12"
      initial={{ opacity: 0, y: 20 }}   // smaller offset
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <SectionHeader eyebrow="About" title="Who I Am" />

      <motion.div
        className="mt-8 flex flex-col lg:flex-row items-center lg:items-start gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        {/* Left: Text + Socials */}
        <motion.div
          className="lg:w-3/4 flex flex-col gap-6"
          initial={{ x: -20, opacity: 0 }}   // smaller slide
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Hi, I’m Prateek Sharma — a passionate frontend developer dedicated to building minimal, performant, and elegant web applications. I
              enjoy transforming ideas into intuitive digital experiences by
              combining modern frameworks with clean, responsive design. My
              primary focus lies in React, Tailwind CSS, and component-driven UI
              systems, but I also explore new tools that improve performance and
              user engagement. Beyond coding, I’m inspired by thoughtful design
              principles and seamless user journeys. I thrive in solving problems,
              learning continuously, and crafting projects that balance creativity
              with functionality.
            {/* <TypingEffect 
              text={`Hi, I’m Prateek Sharma — a passionate frontend developer dedicated to building minimal, performant, and elegant web applications. I
              enjoy transforming ideas into intuitive digital experiences by
              combining modern frameworks with clean, responsive design. My
              primary focus lies in React, Tailwind CSS, and component-driven UI
              systems, but I also explore new tools that improve performance and
              user engagement. Beyond coding, I’m inspired by thoughtful design
              principles and seamless user journeys. I thrive in solving problems,
              learning continuously, and crafting projects that balance creativity
              with functionality.`}
            /> */}
          </p>

          {/* Social Media Icons */}
          <motion.div
            className="flex gap-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            {/* GitHub */}
            <a
              href="https://github.com/prateek0101"
              target="_blank"
              rel="noreferrer"
              className="text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
            >
              <FaGithub className="w-6 h-6" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/prateek-sharma-5064a7221"
              target="_blank"
              rel="noreferrer"
              className="text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/prateek._.650"
              target="_blank"
              rel="noreferrer"
              className="text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>

         {/* Right: Avatar */}
        <motion.div
          className="lg:w-1/2 flex justify-center lg:justify-end"
          initial={{ scale: 0.95, opacity: 0 }}   // almost full-size already
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={avatar}
            alt="Prateek Sharma"
            className="w-60 h-60 rounded-full border-4 border-black dark:border-white object-cover shadow-lg"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
