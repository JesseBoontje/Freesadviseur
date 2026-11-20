// Worker voor Freesadviseur: /api/ask gaat naar dezelfde code als vroeger in Pages Functions,
// de rest komt uit de statische bestanden.
import { onRequestPost, onRequest } from './functions/api/ask.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/ask') {
      const context = { request, env, ctx, waitUntil: p => ctx.waitUntil(p) };
      return request.method === 'POST' ? onRequestPost(context) : onRequest(context);
    }
    if (url.pathname.startsWith('/api/')) return new Response('Niet gevonden', { status: 404 });
    return env.ASSETS.fetch(request);
  }
};
