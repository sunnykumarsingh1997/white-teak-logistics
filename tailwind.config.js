/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'wt-black': '#121212',
                'wt-charcoal': '#1F1F1F',
                'wt-gold': '#B59252',
                'wt-gold-light': '#CFAA76',
                'wt-white': '#F5EFE6',
            },
            fontFamily: {
                'cinzel': ['Cinzel', 'serif'],
                'playfair': ['"Playfair Display"', 'serif'],
                'inter': ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
