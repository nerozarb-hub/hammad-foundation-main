import { UrgencyBar } from "@/components/ui/UrgencyBar";
import { Hero } from "@/components/landing/Hero";
import { SocialProofStrip } from "@/components/landing/SocialProofStrip";
import { SocialProof } from "@/components/landing/SocialProof";
import { Comparison } from "@/components/landing/Comparison";
import { ComparisonWaste } from "@/components/landing/ComparisonWaste";
import { ChildrenCards } from "@/components/landing/ChildrenCards";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { RealityCheck } from "@/components/landing/RealityCheck";
import { ProductGrid } from "@/components/landing/ProductGrid";
import { TrustSection } from "@/components/landing/TrustSection";
import { TransparencyGrid } from "@/components/landing/TransparencyGrid";
import { DirectorSection } from "@/components/landing/DirectorSection";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/landing/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { FloatingTrustBadge } from "@/components/ui/FloatingTrustBadge";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-nero selection:text-white">
      <UrgencyBar />
      <Hero />
      <SocialProofStrip />
      <SocialProof />
      <Comparison />
      <ComparisonWaste />
      <ChildrenCards />
      <HowItWorks />
      <RealityCheck />
      <ProductGrid />
      <TrustSection />
      <TransparencyGrid />
      <DirectorSection />
      <FAQ />
      <ContactSection />
      <FinalCTA />
      <FloatingTrustBadge />
      <FloatingWhatsApp />
    </div>
  );
}
