import { sitio } from '../config/sitio';
export function GET() {
  const content = sitio.dominio
    ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap-index.xml', sitio.dominio).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
