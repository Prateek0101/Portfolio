import React, { useState } from 'react'
import { projects } from '../data/project'
import ProjectCard from '../components/ProjectCard'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function Projects() {
  const [index, setIndex] = useState(0)
  const CARDS_PER_VIEW = 2
  const total = projects.length

  const canGoPrev = index > 0
  const canGoNext = index < total - CARDS_PER_VIEW

  const handlePrev = () => canGoPrev && setIndex(index - 1)
  const handleNext = () => canGoNext && setIndex(index + 1)

  // Variants for slide animation
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const visible = projects.slice(index, index + CARDS_PER_VIEW)

  return (
    <div className="flex flex-col min-h-[90vh] pb-10 bg-[#161616]">
      {/* Carousel Section */}
      <div className="flex justify-center items-center flex-1 relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          aria-label="Previous Slide"
          className="p-2 rounded-full border border-yellow-300 text-yellow-300 mx-4 disabled:opacity-50 absolute left-4 sm:left-8 md:left-16 lg:left-24 xl:left-40 z-20 transition-colors hover:bg-yellow-300 hover:text-black"
        >
          <ArrowLeft />
        </button>

        {/* Animated cards container with overflow hidden */}
        <div className="flex overflow-hidden max-w-full px-4 sm:px-8 md:px-12" style={{ width: "clamp(300px, 90vw, 900px)" }}>
          <AnimatePresence initial={false} custom={index}>
            <motion.div
              key={index}
              custom={index}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="flex gap-6 w-full"
            >
              {visible.map((p) => (
                <ProjectCard key={p.title} project={p} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="Next Slide"
          className="p-2 rounded-full border border-yellow-300 text-yellow-300 mx-4 disabled:opacity-50 absolute right-4 sm:right-8 md:right-16 lg:right-24 xl:right-40 z-20 transition-colors hover:bg-yellow-300 hover:text-black"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: total - CARDS_PER_VIEW + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === index ? 'bg-yellow-300' : 'bg-yellow-900'
            }`}
          />
        ))}
      </div>

      {/* Responsive name section */}
      <div className="flex items-end justify-start w-full px-6 sm:px-16 lg:px-32 mt-10 mb-8 select-none">
        <span
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "clamp(4rem, 12vw, 9rem)",
            color: "#fff",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          projec
        </span>
        <span
          style={{
            fontFamily: "'Kapakana', Arial, sans-serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
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
    </div>
  )
}
