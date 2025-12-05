"use client"

import { motion } from "framer-motion"
import { Monitor, Sparkles, Users, Shield } from "lucide-react"
import SectionHeader from "./SectionHeader"
import SectionWrapper from "./SectionWrapper"

const features = [
  {
    icon: <Monitor className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    title: "Real-Time Collaboration",
    desc: "Work together instantly with synced updates and smooth interactions.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
    title: "AI-Powered Tools",
    desc: "Generate ideas, layouts, and diagrams with intelligent AI assistance.",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Team Management",
    desc: "Organize teams, permissions, and projects with ease.",
  },
  {
    icon: <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />,
    title: "Secure & Private",
    desc: "End-to-end encrypted workspaces with enterprise-grade security.",
  },
]

export default function Features() {
  return (
    <SectionWrapper id="features">
      <SectionHeader
        title="Powerful Features"
        subtitle="Everything you need to collaborate efficiently and bring ideas to life."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="
              p-6 rounded-2xl shadow-sm
              border border-slate-200 dark:border-slate-800
              bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl
              hover:shadow-lg transition-shadow
            "
          >
            <div>{item.icon}</div>
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
