"use client"

interface SectionWrapperProps {
  id?: string
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({
  id,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative px-6 py-12 md:py-16 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </section>
  )
}
