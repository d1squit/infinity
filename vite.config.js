import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/"),
			"@components": path.resolve(__dirname, "./src/components/"),
			"@public": path.resolve(__dirname, "./public/"),
			"@img": path.resolve(__dirname, "./src/img/"),
			"@pages": path.resolve(__dirname, "./src/pages/"),
			"@types": path.resolve(__dirname, "./src/@types"),
			"@fonts": path.resolve(__dirname, "./public/fonts/"),
			"@scss": path.resolve(__dirname, "./src/scss/"),
		},
	}
})