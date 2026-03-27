import AchievementsSection from '../components/achievements-section'
import CtaSection from '../components/cta-section'
import FeaturesSection from '../components/features-section'
import HeroSection from '../components/hero-section'
import HowItWorksSection from '../components/how-it-works-section'
import LandingFooter from '../components/landing-footer'
import LandingHeader from '../components/landing-header'
import PillarsSection from '../components/pillars-section'
import TestimonialsSection from '../components/testimonials-section'

export default function LandingPage() {
  return (
    <div className="font-sans antialiased">
      <LandingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PillarsSection />
        <AchievementsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  )
}
