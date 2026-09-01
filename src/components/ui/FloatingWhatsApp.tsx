import { MessageCircle } from "lucide-react";
import { contact } from "@/config/ecosystem";

export function FloatingWhatsApp() {
  const message = encodeURIComponent("Salaam. I would like current information about Hammad Foundation.");
  return <a href={`https://wa.me/${contact.phoneE164.replace("+", "")}?text=${message}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform hover:scale-105"><MessageCircle className="h-7 w-7" /><span className="sr-only">Contact Hammad Foundation on WhatsApp</span></a>;
}
