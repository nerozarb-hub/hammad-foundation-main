export function SocialProofStrip() {
    return (
        <div className="w-full bg-white border-y border-brand-charcoal/5 py-6">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-brand-nero/10 overflow-hidden">
                                    <img 
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} 
                                        alt="Supporter" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-medium text-brand-charcoal/80">
                            <span className="text-brand-nero font-bold">124 people</span> joined this month
                        </p>
                    </div>

                    <div className="hidden md:block w-px h-8 bg-brand-charcoal/10" />

                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            {["🇺🇸", "🇬🇧", "🇦🇪", "🇨🇦", "🇵🇰"].map((flag, i) => (
                                <span key={i} className="text-xl grayscale hover:grayscale-0 transition-all cursor-default" title="Country">
                                    {flag}
                                </span>
                            ))}
                        </div>
                        <p className="text-sm font-medium text-brand-charcoal/80">
                            Helping from <span className="font-bold">8 countries</span>
                        </p>
                    </div>

                    <div className="hidden md:block w-px h-8 bg-brand-charcoal/10" />

                    <p className="text-sm font-semibold text-brand-nero flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-nero opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-nero"></span>
                        </span>
                        4 children were supported today
                    </p>
                </div>
            </div>
        </div>
    );
}
