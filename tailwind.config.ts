import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'], theme: { extend: { colors: { luxury: { black: '#0a0a0a', gold: '#d4af37', emerald: '#2d5a3d', burgundy: '#6b1b35' } } } }, plugins: [] };
export default config;