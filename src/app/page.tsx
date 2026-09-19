import { Hero } from "@/components/landing/Hero";
import { ImpactSection } from "@/components/landing/ImpactSection";
import { SchoolStory } from "@/components/landing/SchoolStory";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TransparencySection } from "@/components/landing/TransparencySection";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { FloatingTrustBadge } from "@/components/ui/FloatingTrustBadge";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-nero selection:text-white">
      {/* 1. Hero: Authentic school photography, student-focused headline, primary CTA, compact trust badge */}
      <Hero />

      {/* 2. Immediate Impact: 3-4 concrete impact packages tied to gift amounts */}
      <ImpactSection />

      {/* 3. The School Story: Human-centered narrative, real students, Sir Ali message, campus photos */}
      <SchoolStory />

      {/* 4. How Support Works: Clean 3-step summary with YZ payment relationship stated once */}
      <HowItWorks />

      {/* 5. Transparency & Accountability: Corporate record, CUIN 0326364, expandable evidence register */}
      <TransparencySection />

      {/* 6. FAQ: Expandable honest answers without repetitive process clutter */}
      <FAQ />

      {/* 7. Final CTA: Closing invitation to support */}
      <FinalCTA />

      {/* Secondary desktop trust badge */}
      <FloatingTrustBadge />
    </div>
  );
}
