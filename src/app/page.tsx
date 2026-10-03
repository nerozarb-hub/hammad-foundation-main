import { Hero } from "@/components/landing/Hero";
import { ImpactSection } from "@/components/landing/ImpactSection";
import { GuardianBridge } from "@/components/landing/GuardianBridge";
import { SchoolStory } from "@/components/landing/SchoolStory";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TransparencySection } from "@/components/landing/TransparencySection";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { CampusGalleryPreview } from "@/components/landing/CampusGalleryPreview";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-nero selection:text-white">
      <Hero />
      <ImpactSection />
      <GuardianBridge />
      <SchoolStory />
      <CampusGalleryPreview />
      <HowItWorks />
      <TransparencySection />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
