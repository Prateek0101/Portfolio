import React from 'react'

export default function SectionHeader({ eyebrow, title, lead }) {
  return (
    <div className="mb-8">
      {eyebrow && <div className="uppercase tracking-widest text-xs text-neutral-500 dark:text-neutral-400">{eyebrow}</div>}
      <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">{title}</h2>
      {lead && <p className="text-neutral-600 dark:text-neutral-300 mt-3 max-w-2xl">{lead}</p>}
    </div>
  )
}