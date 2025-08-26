import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Consolas", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
        "pulse-slow": "pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "hsl(var(--foreground))",
            '[class~="lead"]': {
              color: "hsl(var(--muted-foreground))",
            },
            a: {
              color: "hsl(var(--primary))",
              textDecoration: "underline",
              fontWeight: "500",
            },
            strong: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
            },
            "ol[type='A']": {
              "--list-counter-style": "upper-alpha",
            },
            "ol[type='a']": {
              "--list-counter-style": "lower-alpha",
            },
            "ol[type='A' s]": {
              "--list-counter-style": "upper-alpha",
            },
            "ol[type='a' s]": {
              "--list-counter-style": "lower-alpha",
            },
            "ol[type='I']": {
              "--list-counter-style": "upper-roman",
            },
            "ol[type='i']": {
              "--list-counter-style": "lower-roman",
            },
            "ol[type='I' s]": {
              "--list-counter-style": "upper-roman",
            },
            "ol[type='i' s]": {
              "--list-counter-style": "lower-roman",
            },
            "ol[type='1']": {
              "--list-counter-style": "decimal",
            },
            "ul > li::marker": {
              color: "hsl(var(--muted-foreground))",
            },
            "ol > li::marker": {
              color: "hsl(var(--muted-foreground))",
            },
            hr: {
              borderColor: "hsl(var(--border))",
              marginTop: "3em",
              marginBottom: "3em",
            },
            blockquote: {
              fontWeight: "500",
              fontStyle: "italic",
              color: "hsl(var(--foreground))",
              borderLeftWidth: "0.25rem",
              borderLeftColor: "hsl(var(--border))",
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
            },
            h1: {
              color: "hsl(var(--foreground))",
              fontWeight: "800",
            },
            h2: {
              color: "hsl(var(--foreground))",
              fontWeight: "700",
            },
            h3: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
            },
            h4: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
            },
            "figure figcaption": {
              color: "hsl(var(--muted-foreground))",
            },
            code: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
            },
            "a code": {
              color: "hsl(var(--primary))",
            },
            pre: {
              color: "hsl(var(--foreground))",
              backgroundColor: "hsl(var(--muted))",
              overflowX: "auto",
            },
            "pre code": {
              backgroundColor: "transparent",
              borderWidth: "0",
              borderRadius: "0",
              padding: "0",
              fontWeight: "400",
              color: "inherit",
              fontSize: "inherit",
              fontFamily: "inherit",
              lineHeight: "inherit",
            },
            table: {
              width: "100%",
              tableLayout: "auto",
              textAlign: "left",
              marginTop: "2em",
              marginBottom: "2em",
              fontSize: "0.875em",
              lineHeight: "1.7142857",
            },
            thead: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              borderBottomWidth: "1px",
              borderBottomColor: "hsl(var(--border))",
            },
            "thead th": {
              verticalAlign: "bottom",
              paddingRight: "0.5714286em",
              paddingBottom: "0.5714286em",
              paddingLeft: "0.5714286em",
            },
            "tbody tr": {
              borderBottomWidth: "1px",
              borderBottomColor: "hsl(var(--border))",
            },
            "tbody tr:last-child": {
              borderBottomWidth: "0",
            },
            "tbody td": {
              verticalAlign: "baseline",
            },
            tfoot: {
              borderTopWidth: "1px",
              borderTopColor: "hsl(var(--border))",
            },
            "tfoot td": {
              verticalAlign: "top",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
