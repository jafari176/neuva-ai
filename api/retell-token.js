export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Map of agent keys sent from the frontend to env var names.
// This keeps actual agent IDs server-side only.
const AGENT_MAP = {
  sales:   'RETELL_AGENT_SALES',
  support: 'RETELL_AGENT_SUPPORT',
  booking: 'RETELL_AGENT_BOOKING',
  demo:    'RETELL_AGENT_DEMO',
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json', ...CORS } });
  }

  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'RETELL_API_KEY not configured' }), { status: 500, headers: { 'Content-Type': 'application/json', ...CORS } });
  }

  // Frontend sends { agentKey: 'sales' | 'support' | 'booking' | 'demo' }
  let agentKey = 'sales';
  try {
    const body = await req.json();
    if (body.agentKey) agentKey = body.agentKey;
  } catch {}

  const envVar = AGENT_MAP[agentKey] || AGENT_MAP.sales;
  const agentId = process.env[envVar];

  if (!agentId) {
    return new Response(JSON.stringify({ error: `Agent not configured: ${agentKey}` }), { status: 500, headers: { 'Content-Type': 'application/json', ...CORS } });
  }

  const retellRes = await fetch('https://api.retellai.com/v2/create-web-call', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ agent_id: agentId }),
  });

  if (!retellRes.ok) {
    const err = await retellRes.text();
    return new Response(JSON.stringify({ error: `Retell error: ${err}` }), { status: retellRes.status, headers: { 'Content-Type': 'application/json', ...CORS } });
  }

  const data = await retellRes.json();
  return new Response(JSON.stringify({ access_token: data.access_token }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}
