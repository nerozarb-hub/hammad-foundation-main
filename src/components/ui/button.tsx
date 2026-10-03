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

        const baseStyles = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl text-base font-bold transition-colors disabled:pointer-events-none disabled:opacity-50"

        let variantStyles = ""
        switch (variant) {
            case "default":
            case "brand":
                variantStyles = "bg-brand-nero text-white hover:bg-[#036B31]"
                break
            case "secondary":
                variantStyles = "bg-brand-charcoal text-white hover:bg-[#304238]"
                break
            case "destructive":
                variantStyles = "bg-brand-rust text-white hover:bg-[#7d4330]"
                break
            case "outline":
                variantStyles = "border border-brand-nero bg-transparent text-[#075e2e] hover:bg-brand-gray-100"
                break
            case "ghost":
                variantStyles = "text-primary hover:bg-brand-gray-100"
                break
            case "link":
                variantStyles = "border border-brand-nero text-[#075e2e] hover:bg-brand-gray-100"
                break
        }

        let sizeStyles = ""
        switch (size) {
            case "default":
                sizeStyles = "h-12 px-8 py-3"
                break
            case "sm":
                sizeStyles = "min-h-11 px-4"
                break
            case "lg":
                sizeStyles = "min-h-14 px-10"
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
