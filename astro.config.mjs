import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
const site = process.env.PUBLIC_SITE_URL;
export default defineConfig({
  output: 'static',
  redirects: {
    '/proyectos/ciudad-victoria/': { status: 302, destination: '/' },
  },
  ...(site ? { site } : {}),
  integrations: [react(), ...(site ? [sitemap()] : [])],
  build: { inlineStylesheets: 'never' },
  markdown: { syntaxHighlight: false },
  devToolbar: { enabled: false },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
    },
  },
});
