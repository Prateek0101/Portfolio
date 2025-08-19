import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";

const experiences = [
  {
    role: "Frontend Developer",
    company: "GrowthGrids",
    duration: "Mar 2024 – Aug 2024",
    description: [
      "Worked on TenderGrid, BidGrid, and AiGrid platforms, focusing on scalable and reusable UI systems.",
      "Optimized complex data tables with advanced filtering, sorting, and pagination for smoother performance.",
      "Improved rendering efficiency by restructuring React state and minimizing unnecessary re-renders.",
      "Designed responsive, accessible layouts tailored for enterprise dashboards.",
      "Introduced motion micro-interactions to enhance usability and guide user focus.",
      "Collaborated with backend teams on REST API integrations to ensure seamless data flow.",
      "Contributed to AiGrid by blending prompt engineering + frontend development, enabling AI-driven dynamic workflows for smarter user experiences.",
    ],
  },
];

export default function Experience() {
  return (
    <motion.div
      className="container-max py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <SectionHeader
        eyebrow="Experience"
        title="Where I've Worked"
        lead="Frontend engineering and AI-assisted product work."
      />

      <div className="grid grid-cols-1 gap-6 mt-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + i * 0.1,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="p-6 rounded-2xl w-full border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold">{exp.role}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {exp.company} • {exp.duration}
            </p>

            {/* Staggered list animation */}
            <motion.ul
              className="list-disc list-inside mt-4 space-y-2 dark:text-neutral-400"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {exp.description.map((point, idx) => (
                <motion.li
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
