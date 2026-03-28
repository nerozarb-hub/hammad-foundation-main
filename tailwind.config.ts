import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1.5rem',
                sm: '2rem',
                lg: '4rem',
            },
            screens: {
                '2xl': '1280px',
            },
        },
        extend: {
            colors: {
                brand: {
                    white: '#FFFFFF',
                    charcoal: '#0C0F13',
                    nero: '#0F9D58',
                    amber: '#F59E0B',
                    red: '#DC2626',
                    blue: '#2563EB',
                    gray: {
                        50: '#F9FAFB',
                        900: '#111827',
                    }
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
                '3xl': '24px',
            },
            boxShadow: {
                'card': '0 4px 24px rgba(15, 157, 88, 0.08)',
                'soft': '0 2px 12px rgba(0, 0, 0, 0.05)',
            }
        }
    },
    plugins: [],
};
export default config;
