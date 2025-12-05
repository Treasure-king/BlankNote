"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="
      relative flex min-h-screen flex-col items-center justify-center overflow-hidden
      bg-gradient-to-br from-slate-100 via-white to-slate-200 
      text-center text-slate-900
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:text-white
      transition-colors duration-300
    ">
      
      {/* Decorative Background Orbs */}
      <div className="absolute -top-40 left-10 h-[28rem] w-[28rem] rounded-full 
        bg-indigo-300/40 blur-3xl 
        dark:bg-indigo-600/30
      " />
      <div className="absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full 
        bg-purple-300/40 blur-3xl
        dark:bg-purple-700/30
      " />

      {/* Main Content */}
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
          className="
            mb-6 font-extrabold leading-tight
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          "
        >
          Collaborate. Create.{" "}
          <span className="
            bg-gradient-to-r from-indigo-500 to-purple-500 
            bg-clip-text text-transparent
            dark:from-indigo-400 dark:to-purple-400
          ">
            Visualize Ideas
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="
            mx-auto mb-10 max-w-2xl 
            text-base sm:text-lg md:text-xl 
            text-slate-600 dark:text-gray-300
          "
        >
          CollabBoard lets your team brainstorm, diagram, and plan visually — all in real time with Excelidraw creativity.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="
              rounded-full 
              bg-indigo-500 hover:bg-indigo-600 
              dark:bg-indigo-600 dark:hover:bg-indigo-700
              text-white shadow-lg shadow-indigo-500/30
              cursor-pointer
            "
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Get Started Free
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="
              rounded-full border-slate-300 bg-white/40 backdrop-blur-md 
              hover:bg-white/60
              dark:border-gray-400/30 dark:bg-white/10 dark:hover:bg-white/20
              cursor-pointer
            "
          >
            Try Demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating Gradient Rings */}
      <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
        <div className="
          absolute left-[20%] top-[22%] h-48 w-48 sm:h-56 sm:w-56 
          animate-pulse rounded-full opacity-30 blur-3xl
          bg-gradient-to-r from-indigo-400 to-purple-400
          dark:from-indigo-500 dark:to-purple-500
        " />

        <div className="
          absolute right-[20%] bottom-[20%] h-64 w-64 sm:h-72 sm:w-72 
          animate-pulse rounded-full opacity-30 blur-3xl
          bg-gradient-to-r from-purple-300 to-pink-300
          dark:from-purple-400 dark:to-pink-400
        " />
      </div>
    </section>
  )
}
