import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// npm install --save-dev -rollup-plugin-visualizer

// vite config
// import {visualizer} from "rollup-plugin-visualizer"

// plugins={
// visualizer({
// filename:"bundle-report.html",
// open:true,
// gzipSize:true,
// brotliSize:true
// });
// }