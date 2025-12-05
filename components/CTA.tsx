"use client"

import { motion } from "framer-motion"
import SectionWrapper from "./SectionWrapper"
import Link from "next/link"

export default function CTA() {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="
          relative overflow-hidden 
          rounded-3xl px-8 py-16 text-center
          bg-gradient-to-br from-indigo-500 to-purple-600
          dark:from-indigo-600 dark:to-purple-700
          text-white shadow-xl
        "
      >
        {/* Soft glowing blobs */}
        <div className="absolute inset-0 opacity-30 blur-3xl -z-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-52 h-52 bg-purple-300/30 rounded-full"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold">
          Ready to Bring Your Ideas to Life?
        </h2>
        <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
          Start collaborating with your team and create visually stunning plans.
          No limits. No boundaries.
        </p>

        <Link
          href="/signup"
          className="
            inline-block mt-8 px-8 py-3 text-lg font-semibold rounded-xl
            bg-white text-indigo-600 
            hover:bg-slate-100
            dark:bg-slate-900 dark:text-indigo-400 dark:hover:bg-slate-800
            transition-colors shadow-md
          "
        >
          Get Started Free
        </Link>
      </motion.div>
    </SectionWrapper>
  )
}
