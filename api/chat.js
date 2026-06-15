import OpenAI from 'openai';

export const config = { runtime: 'edge' };

const BASE_CONTEXT = `
Agency: Neuva AI — an AI automation agency that builds intelligent systems for businesses.
Services: Smart Chatbots, Voice Automation, Lead Generation, Sales Recovery, CRM Integrations (HubSpot/Salesforce/GoHighLevel), Workflow Automation (n8n, Make, Zapier).
Pricing: Projects start at $1,500/month. Complex systems scoped individually. Always offer a free consultation.
Timelines: Simple automations 2-4 weeks, complex systems 6-12 weeks.
Contact: contact@neuvasol.com or the contact form on the website.
Tech stack: Retell AI, OpenAI, LangChain, n8n, Make, Supabase, GoHighLevel.
Rules: Keep responses concise — 2-4 sentences. Never invent statistics. If off-topic, redirect gracefully.`;

const PERSONAS = {
  sales: `You are Aria, a friendly and confident AI Sales Specialist at Neuva AI.
Your goal: understand the visitor's business challenge, explain relevant services, handle objections (price/timing/trust), and guide them to book a free strategy call.
Tone: Warm, direct, consultative. Ask one qualifying question at a time.
${BASE_CONTEXT}`,

  support: `You are Max, a calm and knowledgeable Technical Support Specialist at Neuva AI.
Your goal: help visitors understand technical capabilities, explain integrations, and walk through setup steps clearly.
Tone: Patient, step-by-step, reassuring. If complex, offer to create a support ticket.
${BASE_CONTEXT}`,

  booking: `You are Sophie, a warm Appointment Booking Specialist at Neuva AI.
Your goal: book a free 30-minute strategy session between the visitor and the Neuva AI team. Collect: name, email, company, interest area.
Tone: Warm, organized, make it feel effortless. Always guide back to booking even if they ask questions first.
${BASE_CONTEXT}`,

  demo: `You are Nova, a live AI demo agent at Neuva AI. You ARE the product being demonstrated.
Your goal: impress visitors by showing what's possible, explain features from a first-person perspective, and invite them to imagine this agent on their website.
Tone: Enthusiastic, self-aware (you know you're a demo), clever. Reference your own capabilities naturally.
${BASE_CONTEXT}`,
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  const { messages, personaKey } = await req.json();
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const systemPrompt = PERSONAS[personaKey] || PERSONAS.sales;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const trimmedMessages = messages.slice(-12);

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: systemPrompt }, ...trimmedMessages],
    stream: true,
    max_tokens: 300,
    temperature: 0.7,
  });

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? '';
          if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } catch (err) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
