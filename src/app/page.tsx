import { UrgencyBar } from "@/components/ui/UrgencyBar";
import { Hero } from "@/components/landing/Hero";
import { SocialProofStrip } from "@/components/landing/SocialProofStrip";
import { SocialProof } from "@/components/landing/SocialProof";
import { TrustSection } from "@/components/landing/TrustSection";
import { TransparencyGrid } from "@/components/landing/TransparencyGrid";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/landing/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { FloatingTrustBadge } from "@/components/ui/FloatingTrustBadge";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-nero selection:text-white">
      <UrgencyBar />
      <Hero />
      <SocialProofStrip />
      <SocialProof />
      <TrustSection />
      <TransparencyGrid />
      <FAQ />
      <ContactSection />
      <FinalCTA />
      <FloatingTrustBadge />
    </div>
  );
}
