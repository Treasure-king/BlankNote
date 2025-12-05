import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import AnimatedBackground from "@/components/AnimatedBackground"
import HowItWorks from "@/components/HowItWorks"
import Stats from "@/components/Stats"
import Testimonials from "@/components/Testimonials"
import Pricing from "@/components/Pricing"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  // Redirect if not authenticated
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <main className="relative bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Hero Section */}
      <Hero />

      {/* How It Works */}
      <HowItWorks />

      {/* Stats */}
      <Stats />

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing */}
      <Pricing />

      {/* Call To Action */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  )
}
