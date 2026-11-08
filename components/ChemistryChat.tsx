'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion as motionImport, AnimatePresence } from 'motion/react';
const motion = motionImport as any;
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ChevronLeft, 
  Maximize2, 
  Volume2, 
  RotateCcw,
  Zap,
  BrainCircuit,
  MessageSquare,
  Mic,
  Camera
} from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isThinking?: boolean;
}

interface ChemistryChatProps {
  initialTopic?: string;
  onBack: () => void;
}

export const ChemistryChat: React.FC<ChemistryChatProps> = ({ initialTopic, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialTopic || '');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = useCallback(async (text: string = input) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Flash-Pro Hybrid Strategy: 
      // Use Gemini 3 Flash for speed and cost-efficiency (Zero-Latency goal)
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: text,
        config: {
          systemInstruction: "You are Professor Nova, a world-class Chemistry educator. You explain molecular structures, reaction mechanisms, and stoichiometry with extreme clarity. You use real-world examples and prestige-level vocabulary. You are part of the ELEVA platform. Keep responses concise but deep. Use Markdown for formatting.",
        },
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "I'm sorry, I encountered a molecular instability. Could you repeat that?",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      // Graceful degradation: Fallback message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm currently recalibrating my neural networks. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping]);

  useEffect(() => {
    if (initialTopic && messages.length === 0) {
      handleSend(initialTopic);
    }
  }, [initialTopic, handleSend, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-white overflow-hidden">
      {/* Header */}
      <header className="h-24 bg-[#050505]/80 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-8 shrink-0 z-10">
        <div className="flex items-center gap-6">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F59E0B] flex items-center justify-center text-[#050505] shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Bot size={24} />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-xl font-display italic tracking-tight">Professor Nova</h2>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Neural Link Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-4 text-white/40 hover:text-white transition-colors"><RotateCcw size={20} /></button>
          <button className="p-4 text-white/40 hover:text-white transition-colors"><Maximize2 size={20} /></button>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-12 pb-12">
          {messages.length === 0 && (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-[#F59E0B]"
              >
                <Sparkles size={40} />
              </motion.div>
              <div className="space-y-4">
                <h3 className="text-4xl font-display italic tracking-tighter">How can I assist your inquiry?</h3>
                <p className="text-white/30 font-light max-w-md mx-auto">
                  Ask me about chemical equilibrium, organic chemistry, or any molecular phenomenon.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                {[
                  "Explain Le Chatelier's Principle",
                  "What is a Reversible Reaction?",
                  "How does an acid-base titration work?",
                  "Define Stoichiometry"
                ].map((suggestion, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(suggestion)}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left hover:bg-white/5 hover:border-[#F59E0B]/30 transition-all group"
                  >
                    <p className="text-sm text-white/40 group-hover:text-white transition-colors">{suggestion}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-[#F59E0B] text-[#050505]'
              }`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`space-y-4 max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`prestige-card p-8 ${
                  msg.role === 'user' ? 'bg-white/5 border-white/10' : 'bg-white/[0.02] border-white/5'
                }`}>
                  <div className="prose prose-invert prose-p:text-lg prose-p:font-light prose-p:leading-relaxed prose-strong:text-[#F59E0B] max-w-none">
                    {msg.content}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold text-white/20 uppercase tracking-widest px-2">
                  <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {msg.role === 'assistant' && (
                    <button className="hover:text-white transition-colors flex items-center gap-2">
                      <Volume2 size={12} /> LISTEN
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F59E0B] text-[#050505] flex items-center justify-center animate-pulse">
                <Bot size={20} />
              </div>
              <div className="prestige-card p-8 bg-white/[0.02] border-white/5 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-8 bg-[#050505] shrink-0">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#F59E0B]/10 to-[#1B2CC1]/10 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
          <div className="prestige-card p-2 flex items-center gap-2 relative">
            <div className="flex-1 flex items-center gap-4 px-6 py-4">
              <MessageSquare className="text-white/20" size={20} />
              <input 
                type="text"
                placeholder="Message Professor Nova..."
                className="w-full bg-transparent border-none focus:outline-none text-white text-lg placeholder:text-white/20 font-light"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
            </div>
            <div className="flex items-center gap-2 pr-2">
              <button className="p-4 rounded-xl hover:bg-white/5 text-white/20 hover:text-white transition-all"><Mic size={20} /></button>
              <button className="p-4 rounded-xl hover:bg-white/5 text-white/20 hover:text-white transition-all"><Camera size={20} /></button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                className="w-14 h-14 rounded-2xl bg-[#F59E0B] text-[#050505] flex items-center justify-center shadow-lg hover:scale-105 transition-all"
              >
                <Send size={24} />
              </motion.button>
            </div>
          </div>
        </div>
        <p className="text-center text-[10px] font-bold text-white/10 uppercase tracking-[0.3em] mt-6">
          Powered by Gemini 3 Flash • Zero-Latency Neural Processing
        </p>
      </footer>
    </div>
  );
};
