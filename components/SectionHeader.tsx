"use client"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2
        className="
          text-3xl md:text-4xl font-extrabold
          text-slate-900 dark:text-white
        "
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-lg md:text-xl max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
