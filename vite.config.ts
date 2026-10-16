import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],build:{rollupOptions:{output:{manualChunks:{three:['three'],gsap:['gsap'],vendor:['react','react-dom','react-router-dom']}}},chunkSizeWarningLimit:1000,minify:'esbuild'},esbuild:{drop:['debugger']},optimizeDeps:{include:['three','gsap','lenis']}});
