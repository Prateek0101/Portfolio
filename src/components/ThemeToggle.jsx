import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200/60 dark:hover:bg-neutral-800"
      aria-label="Toggle dark mode"
      title="Toggle theme"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}