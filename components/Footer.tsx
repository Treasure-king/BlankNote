"use client"

import Link from "next/link"
import { Twitter, Github, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          {/* Logo / Brand */}
          <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            CollabBoard
          </Link>

          {/* Links */}
          <ul className="flex flex-wrap gap-6 text-sm md:text-base">
            <li>
              <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Pricing
              </Link>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4">
            <Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} CollabBoard. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
