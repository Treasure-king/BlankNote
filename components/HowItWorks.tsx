"use client"

import { motion } from "framer-motion"
import { Lightbulb, PenTool, Rocket } from "lucide-react"
import SectionHeader from "./SectionHeader"
import SectionWrapper from "./SectionWrapper"

const steps = [
  {
    icon: (
      <Lightbulb className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
    ),
    title: "1. Start Your Idea",
    desc: "Create a workspace, drop your thoughts, and outline your goals quickly.",
  },
  {
    icon: <PenTool className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />,
    title: "2. Design & Collaborate",
    desc: "Sketch diagrams, plan workflows, and collaborate with your team in real time.",
  },
  {
    icon: <Rocket className="w-10 h-10 text-purple-500 dark:text-purple-400" />,
    title: "3. Launch & Grow",
    desc: "Convert ideas into final plans and share them effortlessly with your team.",
  },
]

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works">
      <SectionHeader
        title="How It Works"
        subtitle="A simple, intuitive workflow that lets your team move from idea to execution seamlessly."
      />

      <div className="grid md:grid-cols-3 gap-10 mt-12">
        {steps.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="
              text-center p-8 rounded-3xl border
              bg-white/60 dark:bg-slate-900/50 
              border-slate-200 dark:border-slate-800
              shadow-sm hover:shadow-xl
              transition-shadow backdrop-blur-xl
            "
          >
            <div className="flex justify-center">{item.icon}</div>
            <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
