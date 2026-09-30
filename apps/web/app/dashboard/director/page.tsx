"use client";

import { authClient } from "@/lib/auth-client";
import { 
  BarChart, CheckCircle2, MessageCircle, PhoneMissed, 
  Play, Bot, User, Sparkles, Clock, Calendar, 
  Activity, Share2, Camera, PhoneCall, ArrowRight, AudioLines, Send
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function DirectorDashboard() {
  const { data: session } = authClient.useSession();
  
  // @ts-ignore
  const userRole = session?.user?.roleId || '';

  // Fake State for Interactive Demo
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Rahul! 👋 Thank you for your interest in Godrej Splendour via Facebook. Are you looking for a 2BHK or 3BHK?', time: '11:30 PM' },
    { id: 2, sender: 'client', text: '3BHK, what is the price?', time: '11:35 PM' },
    { id: 3, sender: 'ai', text: 'Our 3BHKs start at ₹1.2 Cr. I can schedule a site visit for you tomorrow or send the digital brochure right now. What do you prefer? 🏢', time: '11:35 PM' },
    { id: 4, sender: 'client', text: 'Send brochure, will visit on Sunday.', time: '11:40 PM' }
  ]);

  const mockLeads = [
    { id: 1, name: "Rahul Verma", source: "Facebook Ads", icon: Share2, color: "text-blue-600 bg-blue-50", intent: "High", status: "Site Visit Scheduled", time: "10 mins ago", aiAction: "Qualified by AI" },
    { id: 2, name: "Priya Singh", source: "WhatsApp", icon: MessageCircle, color: "text-green-600 bg-green-50", intent: "Medium", status: "Sent Brochure", time: "25 mins ago", aiAction: "AI Sent Details" },
    { id: 3, name: "Amit Sharma", source: "Missed Call", icon: PhoneMissed, color: "text-red-500 bg-red-50", intent: "High", status: "Call Back Required", time: "1 hour ago", aiAction: "AI Receptionist Answered" },
    { id: 4, name: "Neha Gupta", source: "Instagram", icon: Camera, color: "text-pink-600 bg-pink-50", intent: "Low", status: "Nurturing", time: "2 hours ago", aiAction: "Added to Drip Campaign" },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = { id: Date.now(), sender: 'client', text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput("");
    setIsTyping(true);

    // Fake AI Response delay
    setTimeout(() => {
      let aiReply = "I have noted that down! Let me connect you with a senior broker right away to assist you further.";
      const lowerInput = newMsg.text.toLowerCase();
      
      if (lowerInput.includes('4bhk')) {
        aiReply = "Yes! Our premium 4BHK sky-villas start at ₹3.5 Cr. Would you like me to share the floor plan?";
      } else if (lowerInput.includes('location') || lowerInput.includes('where')) {
        aiReply = "We are located at Plot 42, Palm Beach Road. It's just 5 mins from the upcoming metro station! 🚇";
      } else if (lowerInput.includes('discount') || lowerInput.includes('offer')) {
        aiReply = "We currently have a special spot-booking offer where GST is waived off! Should I book a site visit so you can claim this?";
      }

      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">AI Command Center</h1>
            <p className="text-gray-500 font-medium">Real-time overview of AI lead engagement across all channels.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-green-50 text-green-700 rounded-xl font-semibold border border-green-100 flex items-center gap-2">
            <Activity className="w-4 h-4 animate-pulse" />
            AI Agents Active
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Omnichannel Leads", value: "1,284", increase: "+12%", color: "blue" },
          { title: "Leads Qualified by AI", value: "842", increase: "+34%", color: "purple" },
          { title: "AI Site Visits Booked", value: "156", increase: "+18%", color: "green" },
          { title: "Missed Calls Saved by AI", value: "48", increase: "100%", color: "red" },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-gray-500 text-sm font-medium mb-2">{stat.title}</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              <span className={`text-sm font-semibold text-${stat.color}-600 bg-${stat.color}-50 px-2 py-1 rounded-md`}>
                {stat.increase}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Unified Inbox (Takes 2 columns) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Omnichannel Leads Table */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                Live Unified Inbox
              </h2>
              <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {mockLeads.map((lead) => (
                <div key={lead.id} className="p-5 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${lead.color}`}>
                      <lead.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{lead.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Clock className="w-4 h-4" /> {lead.time} • {lead.source}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col items-end">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {lead.aiAction}
                    </span>
                    <span className="text-sm font-medium text-gray-600">{lead.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Voice Logs Section */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-red-500" />
                  AI Receptionist Call Logs
                </h2>
                <p className="text-sm text-gray-500 mt-1">Interactive demo of a missed call handled by AI.</p>
              </div>
            </div>
            <div className="p-6">
              <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <PhoneMissed className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Amit Sharma - Missed Call</h4>
                      <p className="text-xs text-gray-500">Duration: 1m 45s • Intent: High • Phase 1 Villas</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setPlayingAudio(playingAudio === '1' ? null : '1')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                      playingAudio === '1' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {playingAudio === '1' ? <AudioLines className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4 fill-current" />}
                    {playingAudio === '1' ? 'Playing Fake Audio...' : 'Simulate Call'}
                  </button>
                </div>
                
                {/* Simulated Transcript */}
                <div className={`space-y-4 max-h-[250px] overflow-y-auto pr-2 transition-opacity duration-500 ${playingAudio === '1' ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-2xl rounded-tl-none text-sm text-gray-800 border border-indigo-100">
                      Hello, you've reached the sales desk at Godrej Properties. I see we just missed your call. How can I help you today?
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-tr-none text-sm text-gray-800">
                      Yeah, I saw a billboard for the new villas, are they still available?
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-2xl rounded-tl-none text-sm text-gray-800 border border-indigo-100">
                      Yes, Phase 1 is currently open! Prices start at ₹2.5 Cr. Would you like me to connect you to a senior broker right now, or schedule a site visit?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: WhatsApp AI Showcase (1 column width) */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-b from-green-500 to-green-600 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[650px] border border-green-700">
            <div className="p-5 flex items-center gap-3 text-white border-b border-green-400/30">
              <MessageCircle className="w-7 h-7 fill-white" />
              <div>
                <h3 className="font-bold text-lg">WhatsApp AI Agent</h3>
                <p className="text-green-100 text-xs">Live Interactive Simulator</p>
              </div>
            </div>
            
            <div className="p-4 bg-[#E5DDD5] flex-1 flex flex-col gap-4 overflow-y-auto relative" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')"}}>
              
              <div className="flex justify-center">
                <span className="bg-white/90 text-gray-500 text-[11px] px-3 py-1 rounded-lg shadow-sm">Today</span>
              </div>

              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 items-end ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${msg.sender === 'client' ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'} p-3 rounded-2xl shadow-sm max-w-[85%] text-sm text-gray-800 relative`}>
                    {msg.text}
                    <div className={`text-[10px] text-gray-400 mt-1 flex items-center gap-1 ${msg.sender === 'client' ? 'justify-end text-gray-500' : 'text-right'}`}>
                      {msg.time} {msg.sender === 'client' && <span className="text-blue-500">✓✓</span>}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-end justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-sm text-gray-500 flex items-center gap-1">
                    <span className="animate-bounce">●</span><span className="animate-bounce delay-100">●</span><span className="animate-bounce delay-200">●</span>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendChat} className="bg-gray-100 p-3 border-t border-gray-200 flex gap-2 items-center">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type to test the AI bot..."
                className="bg-white rounded-full flex-1 px-4 py-3 text-sm text-gray-800 shadow-inner outline-none border border-gray-200 focus:border-green-400"
              />
              <button type="submit" disabled={!chatInput.trim() || isTyping} className="w-12 h-12 rounded-full bg-green-500 disabled:bg-gray-300 flex items-center justify-center shadow-md transition-colors cursor-pointer">
                <Send className="w-5 h-5 text-white ml-1" />
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
