"use client"

import { motion } from "framer-motion"
import SectionWrapper from "./SectionWrapper"

const stats = [
  { number: "12k+", label: "Active Users" },
  { number: "98%", label: "Satisfaction Rate" },
  { number: "4.9/5", label: "Average Rating" },
  { number: "120+", label: "Teams Onboarded" },
]

export default function Stats() {
  return (
    <SectionWrapper id="stats">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="relative p-6 rounded-xl overflow-hidden cursor-pointer group"
          >
            {/* Animated Border */}
            <span className="absolute inset-0 rounded-xl border-[3px] border-transparent">
              <span className="absolute inset-0 border-0 border-t-4 border-l-4 border-indigo-500 dark:border-indigo-400 animate-border-move"></span>
            </span>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-10 blur-3xl pointer-events-none"></div>

            {/* Stat Number */}
            <h3
              className="
                relative z-10 text-4xl md:text-5xl font-extrabold 
                bg-gradient-to-r from-indigo-500 to-purple-500 
                bg-clip-text text-transparent
                dark:from-indigo-400 dark:to-purple-400
                transition-transform group-hover:scale-105
              "
            >
              {item.number}
            </h3>

            {/* Label */}
            <p className="relative z-10 mt-2 text-slate-700 dark:text-slate-300 text-sm md:text-base">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes borderMove {
          0% { clip-path: inset(100% 0 0 0); }
          25% { clip-path: inset(0 100% 0 0); }
          50% { clip-path: inset(0 0 100% 0); }
          75% { clip-path: inset(0 0 0 100%); }
          100% { clip-path: inset(100% 0 0 0); }
        }

        .animate-border-move {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-image: linear-gradient(90deg, #6366f1, #a78bfa) 1;
          animation: borderMove 8s linear infinite;
        }
      `}</style>
    </SectionWrapper>
  )
}
