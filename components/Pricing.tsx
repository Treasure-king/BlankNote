"use client"

import { motion } from "framer-motion"
import SectionHeader from "./SectionHeader"
import SectionWrapper from "./SectionWrapper"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "Free",
    highlight: false,
    features: [
      "Unlimited boards",
      "Basic collaboration",
      "Light mode & dark mode",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$12/mo",
    highlight: true,
    features: [
      "Real-time collaboration",
      "AI-assisted tools",
      "Advanced export options",
      "Premium templates",
      "Priority support",
    ],
  },
  {
    name: "Team",
    price: "$29/mo",
    highlight: false,
    features: [
      "Team workspaces",
      "User roles & permissions",
      "Shared asset library",
      "Admin controls",
    ],
  },
]

export default function Pricing() {
  return (
    <SectionWrapper id="pricing">
      <SectionHeader
        title="Simple, Transparent Pricing"
        subtitle="Choose the perfect plan for your creativity and collaboration."
      />

      <div className="grid md:grid-cols-3 gap-10 mt-12">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`
              rounded-3xl p-8 border 
              backdrop-blur-xl 
              shadow-md transition-all
              ${
                plan.highlight
                  ? "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500 dark:border-indigo-400 shadow-xl"
                  : "bg-white/60 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800"
              }
            `}
          >
            {plan.highlight && (
              <span
                className="
                  px-4 py-1 text-sm 
                  bg-indigo-500 text-white dark:bg-indigo-400 
                  rounded-full
                "
              >
                Most Popular
              </span>
            )}

            <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
            <p
              className="
                mt-3 text-4xl font-extrabold 
                bg-gradient-to-r from-indigo-500 to-purple-500 
                bg-clip-text text-transparent
                dark:from-indigo-400 dark:to-purple-400
              "
            >
              {plan.price}
            </p>

            <ul className="mt-8 space-y-4">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  <span className="text-slate-700 dark:text-slate-300">
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`
                w-full mt-8 py-3 font-semibold rounded-xl
                transition-colors
                ${
                  plan.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white"
                }
              `}
            >
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
