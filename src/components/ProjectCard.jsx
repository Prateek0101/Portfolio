import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="card p-5 block hover:shadow-lg rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex-shrink-0"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{
        width: '420px',   // fixed width to match layout
        height: '420px',  // fixed height to match layout
      }}
    >
      {/* 🖼️ Project Image */}
      {project.image && (
        <div className="w-full h-40 sm:h-48 mb-4 rounded-lg overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Title + Year */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg sm:text-xl font-semibold">{project.title}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          {project.year}
        </span>
      </div>

      {/* Summary */}
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        {project.summary}
      </p>

      {/* Tech Stack */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full px-2 py-1"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.a>
  )
}
