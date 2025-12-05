'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion } from 'motion/react'
import BlankNote from '../public/images/BlankNote.png'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { signout } from '@/app/(auth)/login/actions'
import { Button } from './ui/button'

const menuVariants = {
  hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState(null)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen((prev) => !prev)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function fetchData() {
      const supabase = await createClient()
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    fetchData()
  }, [])

  const navLinks = [
    { href: '/', label: 'Home', title: 'Go to homepage' },
    { href: '/dashboard', label: 'Dashboard', title: 'View your dashboard' },
    { href: '/about', label: 'About', title: 'About Page' },
  ]

  return (
    <nav
      className="
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[95%] md:w-4/5
        rounded-3xl
        backdrop-blur-xl
        bg-white/60 text-slate-900
        shadow-lg shadow-black/5
        dark:bg-slate-900/40 dark:text-white
        border border-white/30 dark:border-white/10
        transition-colors duration-300
      "
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" aria-label="ReadGood Home">
            <Image
              src={BlankNote}
              width={150}
              alt="ReadGood logo"
              priority
              className="select-none"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {navLinks.map(({ href, label, title }) => (
                <li key={href}>
                  <Link
                    href={href}
                    title={title}
                    className={`
                      relative pb-1 font-medium transition-colors 
                      ${
                        pathname === href
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300'
                      }
                      underline-anim
                    `}
                    aria-current={pathname === href ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">

            {/* Sign In / Sign Out */}
            {user !== null ? (
              <form action={signout} className="hidden md:block">
                <Button
                  type="submit"
                  className="
                    bg-indigo-500 hover:bg-indigo-600 text-white 
                    rounded-xl px-4 py-2 shadow
                  "
                >
                  Sign Out
                </Button>
              </form>
            ) : (
              <Button asChild className="hidden md:block">
                <Link href="/login">Sign In</Link>
              </Button>
            )}

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="
                  p-2 rounded-full cursor-pointer 
                  text-slate-700 dark:text-yellow-400
                  hover:scale-110 transition-transform
                "
              >
                {theme === 'dark' ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={toggleMenu}
              aria-label="Mobile menu"
              className="md:hidden p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          className="
            md:hidden px-5 py-4 space-y-4
            bg-white/70 dark:bg-slate-900/60 
            backdrop-blur-xl
            border-t border-white/30 dark:border-white/10
          "
        >
          {navLinks.map(({ href, label, title }) => (
            <Link
              key={href}
              href={href}
              title={title}
              className={`
                block text-base font-medium
                ${
                  pathname === href
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300'
                }
              `}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}

          {/* Mobile Login Button */}
          <Link
            href="/login"
            className="
              block text-center w-full
              bg-indigo-500 hover:bg-indigo-600
              text-white py-2 rounded-xl
              transition-colors
            "
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </motion.div>
      )}
    </nav>
  )
}
