import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const localOnly = {
  name: 'local-only-production-policy',
  apply: 'build',
  transformIndexHtml() {
    return [
      {
        tag: 'meta',
        attrs: {
          'http-equiv': 'Content-Security-Policy',
          content:
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; font-src 'self'; object-src 'none'; base-uri 'none'",
        },
        injectTo: 'headPrepend',
      },
    ]
  },
}
export default defineConfig({
  plugins: [vue(), localOnly],
  base: './',
  build: { sourcemap: false },
})
