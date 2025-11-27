"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-center text-white">
      {/* Background decorative blur orbs */}
      <div className="absolute -top-32 left-0 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-700/30 blur-3xl"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl"
        >
          Collaborate. Create. <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Visualize Ideas</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 md:text-xl"
        >
          CollabBoard lets your team brainstorm, diagram, and plan visually — all in real time with AI-assisted creativity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" className="rounded-full bg-indigo-500 hover:bg-indigo-600">
            <Sparkles className="mr-2 h-4 w-4" />
            Get Started Free
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-gray-400/30 bg-white/10 hover:bg-white/20"
          >
            Try Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating gradient rings */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute left-1/4 top-1/4 h-56 w-56 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-3xl"></div>
      </div>
    </section>
  )
}
