import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20">
      <Navigation />
      <Hero />
      <Features />
      <Footer />
    </main>
  )
}