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
      const { data, error } = await supabase.auth.getUser()
      console.log(data.user);
      
      setUser(data.user)
    }
    fetchData()

  }, [])

  const navLinks = [
    { href: '/', label: 'Home', title: 'Go to homepage' },
    { href: '/dashboard', label: 'Dashboard', title: 'View your dashboard' },
    { href: '/About', label: 'About', title: 'Open the text editor' },
  ]

  return (
    <nav
      className="absolute w-full md:w-4/5 rounded-4xl backdrop-blur-2xl bg-white text-black dark:bg-transparent dark:text-white shadow-md top-3 z-50 place-self-center"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link href="/" title="ReadGood - Home" aria-label="ReadGood Home">
            <Image
              src={BlankNote}
              width={160}
              alt="ReadGood logo"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6">
              {navLinks.map(({ href, label, title }) => (
                <li key={href}>
                  <Link
                    href={href}
                    title={title}
                    className={`relative pb-1 transition-colors duration-300 
                      ${pathname === href
                        ? 'text-light-hover dark:text-dark-hover'
                        : 'text-light dark:text-dark hover:text-light-hover dark:hover:text-dark-hover'
                      }
                      underline-anim`}
                    aria-current={pathname === href ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>


          </div>

          {/* Mobile Menu Button */}

          <div className="flex items-center">
            {/* Login Button */}
            {
              user!==null ? (
                <form
                action={signout}
                >
                  <Button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors hidden md:block cursor-pointer">Sign Out</Button>
                </form>
              ) : (
                <Button asChild>
                  <Link href='/login'>Sign In</Link>
                </Button>
              )
            }
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full text-zinc-500 dark:text-yellow-400 hover:scale-110 transition-transform cursor-pointer"
                aria-label="Toggle light and dark mode"
                title="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
            )}
            <button onClick={toggleMenu} aria-label="Toggle mobile menu" title="Menu" className='md:hidden'>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          className="md:hidden px-4 pb-4 space-y-3 bg-white dark:bg-transparent rounded-lg shadow-md mt-2"
        >
          {navLinks.map(({ href, label, title }) => (
            <Link
              key={href}
              href={href}
              title={title}
              className={`block transition-colors ${pathname === href
                ? 'text-light-hover dark:text-dark-hover'
                : 'text-light dark:text-dark hover:underline'
                }`}
              aria-current={pathname === href ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            title="Log in to your account"
            className="block text-center text-white bg-indigo-500 hover:bg-indigo-600 transition-colors px-4 py-2 rounded-xl"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </motion.div>
      )}
    </nav>
  )
}
