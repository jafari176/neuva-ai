import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Minimal local API handler so /api/* works in `npm run dev`
// without needing Vercel CLI. Each api/*.js file is imported and run as
// a Node http handler that receives a Web-compatible Request.
function localApiPlugin(env) {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) return next();

        const name = req.url.split('?')[0].replace('/api/', '');
        const filePath = resolve(__dirname, `api/${name}.js`);
        try {
          readFileSync(filePath); // existence check
        } catch {
          return next();
        }

        // Collect body
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const body = Buffer.concat(chunks).toString();

        // Build a minimal Web Request
        const url = `http://localhost${req.url}`;
        const webReq = new Request(url, {
          method: req.method,
          headers: req.headers,
          body: req.method !== 'GET' && req.method !== 'HEAD' ? body : undefined,
        });

        // Inject env vars so serverless functions see them
        for (const [k, v] of Object.entries(env)) {
          if (!process.env[k]) process.env[k] = v;
        }

        try {
          // Dynamic import with cache-bust so file changes reload
          // On Windows, absolute paths need file:// scheme for ESM import()
          const fileUrl = `file:///${filePath.replace(/\\/g, '/')}?t=${Date.now()}`;
          const mod = await import(fileUrl);
          const handler = mod.default;
          const webRes = await handler(webReq);

          res.statusCode = webRes.status;
          webRes.headers.forEach((v, k) => res.setHeader(k, v));

          const reader = webRes.body.getReader();
          const pump = async () => {
            const { done, value } = await reader.read();
            if (done) { res.end(); return; }
            res.write(value);
            await pump();
          };
          await pump();
        } catch (err) {
          console.error('[local-api]', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), localApiPlugin(env)],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-lenis': ['lenis'],
            'vendor-retell': ['retell-client-js-sdk'],
            'vendor-openai': ['openai'],
          },
        },
      },
    },
  };
});
