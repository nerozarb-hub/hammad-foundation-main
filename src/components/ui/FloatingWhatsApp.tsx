import { MessageCircle } from "lucide-react";
import { contact } from "@/config/ecosystem";

export function FloatingWhatsApp() {
  const message = encodeURIComponent("Salaam. I would like current information about Hammad Foundation.");
  return <a href={`https://wa.me/${contact.phoneE164.replace("+", "")}?text=${message}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-nero text-white shadow-lg transition-transform hover:-translate-y-0.5" aria-label="Contact Hammad Foundation on WhatsApp"><MessageCircle className="h-6 w-6" /><span className="sr-only">Contact Hammad Foundation on WhatsApp</span></a>;
}
