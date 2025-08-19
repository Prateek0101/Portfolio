import React from 'react'
import Marquee from './Marquee'

export default function Footer() {
  return (
    <footer className="mt-16">
      <Marquee text="React • Next • JavaScript • Html • CSS • Tailwind • Bootstrap • Redux • Prompt Engineering • Axios • TanStack • Git" />
      <div className="container-max py-10 text-sm text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
        <div>© {new Date().getFullYear()} Prateek Sharma</div>
        <a className="link" href="mailto:prateeksh03@gmail.com">prateeksh03@gmail.com</a>
      </div>
    </footer>
  )
}