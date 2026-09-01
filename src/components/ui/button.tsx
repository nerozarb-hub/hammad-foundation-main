import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "brand"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-[900] ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-0.5 active:border-b-0 uppercase tracking-wider"

        let variantStyles = ""
        switch (variant) {
            case "default":
            case "brand":
                variantStyles = "bg-brand-nero text-white hover:bg-brand-nero/90 hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(15,157,88,0.39)] hover:shadow-[0_6px_20px_0_rgba(15,157,88,0.45)] border-b-4 border-brand-nero/30"
                break
            case "secondary":
                variantStyles = "bg-brand-charcoal text-white hover:bg-brand-charcoal/90 hover:-translate-y-0.5 shadow-lg border-b-4 border-black/30"
                break
            case "destructive":
                variantStyles = "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md"
                break
            case "outline":
                variantStyles = "border-2 border-brand-charcoal bg-transparent text-brand-charcoal hover:bg-brand-charcoal hover:text-white"
                break
            case "ghost":
                variantStyles = "hover:bg-brand-charcoal/5 text-brand-charcoal"
                break
            case "link":
                variantStyles = "text-brand-nero underline-offset-4 hover:underline lowercase font-bold tracking-normal"
                break
        }

        let sizeStyles = ""
        switch (size) {
            case "default":
                sizeStyles = "h-12 px-8 py-3"
                break
            case "sm":
                sizeStyles = "h-10 rounded-lg px-4"
                break
            case "lg":
                sizeStyles = "h-14 rounded-2xl px-10 text-base"
                break
            case "icon":
                sizeStyles = "h-12 w-12"
                break
        }

        return (
            <Comp
                className={cn(baseStyles, variantStyles, sizeStyles, className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
