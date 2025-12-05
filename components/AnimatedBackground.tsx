"use client"

import { motion } from "framer-motion"

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Top left orb */}
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-400/30 dark:bg-indigo-600/20 blur-3xl"
      ></motion.div>

      {/* Bottom right orb */}
      <motion.div
        animate={{ y: [0, -25, 0], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-400/30 dark:bg-purple-600/20 blur-3xl"
      ></motion.div>

      {/* Center orb */}
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-pink-400/20 dark:bg-pink-600/20 blur-3xl -translate-x-1/2 -translate-y-1/2"
      ></motion.div>
    </div>
  )
}
