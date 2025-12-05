"use client"

import { motion } from "framer-motion"
import SectionHeader from "./SectionHeader"
import SectionWrapper from "./SectionWrapper"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Product Manager, FlowSync",
    img: "/avatars/avatar1.png",
    quote:
      "CollabBoard transformed how our team brainstorms. The real-time tools and AI suggestions are genuinely game-changing.",
  },
  {
    name: "Daniel Carter",
    role: "Lead Designer, PixelForge",
    img: "/avatars/avatar2.png",
    quote:
      "The interface is clean, intuitive, and incredibly fun to use. Collaboration has never felt this smooth.",
  },
  {
    name: "Mia Rodriguez",
    role: "Startup Founder",
    img: "/avatars/avatar3.png",
    quote:
      "We used CollabBoard to plan our MVP. It felt like ideas were coming alive on the screen. Highly recommend it!",
  },
]

export default function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <SectionHeader
        title="What People Are Saying"
        subtitle="Loved by creators, teams, and innovators around the world."
      />

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="
              p-8 rounded-3xl shadow-md 
              bg-white/60 dark:bg-slate-900/50 
              border border-slate-200 dark:border-slate-800
              backdrop-blur-xl hover:shadow-lg transition-shadow
            "
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.img}
                width={54}
                height={54}
                alt={item.name}
                className="rounded-full border border-slate-300 dark:border-slate-700"
              />
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {item.role}
                </p>
              </div>
            </div>

            <p className="mt-6 text-slate-700 dark:text-slate-300 leading-relaxed">
              “{item.quote}”
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
