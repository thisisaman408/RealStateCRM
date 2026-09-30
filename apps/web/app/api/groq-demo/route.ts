import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({ reply: "I am a real AI, but my GROQ_API_KEY is missing in the Vercel environment variables!" });
    }

    // Format messages for Groq
    const formattedMessages = [
      {
        role: "system",
        content: "You are a professional, polite, and persuasive real estate AI assistant for Godrej Properties. Your goal is to qualify the lead and push them to schedule a site visit or ask for a brochure. Keep responses short, natural, like a WhatsApp message (1-2 sentences max). Use emojis sparingly. Inventory Context: 2BHK starts at 85 Lakhs, 3BHK starts at 1.2 Cr, 4BHK sky-villas start at 3.5 Cr. Location: Plot 42, Palm Beach Road, near metro. Current offer: Spot booking GST waiver."
      },
      ...messages.map((m: any) => ({
        role: m.sender === 'client' ? 'user' : 'assistant',
        content: m.text
      }))
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // Fast model for chat
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I couldn't process that right now.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Groq Demo Error:', error);
    return NextResponse.json({ reply: "Sorry, I am facing some technical issues right now." }, { status: 500 });
  }
}
