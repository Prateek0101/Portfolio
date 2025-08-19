import React from 'react'
import { projects } from '../data/project'
import ProjectCard from '../components/ProjectCard'
import SectionHeader from '../components/SectionHeader'

export default function Projects() {
  return (
    <div className="container-max py-12">
      <SectionHeader
        eyebrow="Work"
        title="Selected Projects"
        lead="A showcase of my latest projects and collaborations."
      />
      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </div>
  )
}
