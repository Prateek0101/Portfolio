import React from 'react'

export default function Marquee({ text }) {
  return (
    <div className="bg-black text-white py-4 overflow-hidden">
      <div className="whitespace-nowrap text-2xl font-bold animate-marquee">
        {text} ✦ {text} ✦ {text} ✦ {text}
      </div>
    </div>
  )
}