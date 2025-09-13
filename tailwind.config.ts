import type { Config } from 'tailwindcss'


export default {
content: [
'./index.html',
'./src/**/*.{ts,tsx}',
],
theme: {
extend: {
colors: {
sky: {
50: '#f2f8ff',
100: '#e6f1ff',
},
mint: {
50: '#f1fcf7',
100: '#e3f8ef',
},
lavender: {
50: '#f7f5ff',
100: '#eee9ff',
},
mood: {
positive: '#86efac',
neutral: '#c7d2fe',
negative: '#fca5a5'
}
},
boxShadow: {
soft: '0 10px 25px -10px rgba(31, 38, 135, 0.2)'
},
fontFamily: {
sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif']
}
}
},
plugins: [],
} satisfies Config