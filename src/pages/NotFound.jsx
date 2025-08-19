import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-max py-32 text-center">
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="pill mt-6 inline-block bg-black text-white hover:opacity-80">
        Go Home
      </Link>
    </div>
  )
}
