import { Hero } from "@/components/landing/Hero";
import { UrgencyBar } from "@/components/ui/UrgencyBar";
import { SocialProof } from "@/components/landing/SocialProof";
import { Comparison } from "@/components/landing/Comparison";
import { ProductGrid } from "@/components/landing/ProductGrid";
import { RealityCheck } from "@/components/landing/RealityCheck";
import { TrustSection } from "@/components/landing/TrustSection";
import { DirectorSection } from "@/components/landing/DirectorSection";
import { ComparisonWaste } from "@/components/landing/ComparisonWaste";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/landing/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-white">
            <Hero />
            <UrgencyBar />
            <SocialProof />
            <Comparison />
            <ProductGrid />
            <RealityCheck />
            <TrustSection />
            <DirectorSection />
            <ComparisonWaste />
            <FAQ />
            <ContactSection />
            <FinalCTA />
        </main>
    );
}
