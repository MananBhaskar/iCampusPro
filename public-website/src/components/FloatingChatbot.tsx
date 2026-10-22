'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, X, Send, Bot, User, ArrowRight, Loader2, Sparkles, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  suggestedActions?: { label: string; action: string; target?: string }[];
  timestamp: string;
}

interface FloatingChatbotProps {
  onOpenRegisterModal?: () => void;
}

export default function FloatingChatbot({ onOpenRegisterModal }: FloatingChatbotProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: 'Welcome to iCampusPro! I can help you discover accredited educational institutions, learn about platform features, or guide your institute registration enquiry.',
      suggestedActions: [
        { label: 'Register Institute (Phase 1)', action: 'open_registration_modal' },
        { label: 'Browse Verified Institutes', action: 'navigate', target: '/institutes' },
        { label: 'Contact Support Desk', action: 'navigate', target: '/contact' },
        { label: 'Platform Privacy & Compliance', action: 'navigate', target: '/privacy' },
      ],
      timestamp: '10:00 AM',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/public/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.data.reply,
          suggestedActions: data.data.suggestedActions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.error || 'Sorry, I encountered an issue. You can reach our support team directly at Contact Us.',
          suggestedActions: [{ label: 'Contact Us', action: 'navigate', target: '/contact' }],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err) {
      const networkErrorMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'The chatbot service is temporarily unavailable. Please visit our Contact Us page for immediate assistance.',
        suggestedActions: [{ label: 'Go to Contact Us', action: 'navigate', target: '/contact' }],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, networkErrorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action: { label: string; action: string; target?: string }) => {
    if (action.action === 'open_registration_modal') {
      if (onOpenRegisterModal) {
        onOpenRegisterModal();
      } else {
        const regBtn = document.getElementById('btn-header-register-institute');
        regBtn?.click();
      }
    } else if (action.action === 'navigate' && action.target) {
      router.push(action.target);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        type="button"
        className="chatbot-launcher"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
        id="btn-chatbot-launcher"
        title="iCampusPro Assistant"
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="chatbot-window" id="chatbot-window" role="region" aria-label="Interactive Campus Assistant">
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={16} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: 700 }}>iCampusPro Bot</h4>
                <span style={{ fontSize: '0.75rem', color: '#67e8f9', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                  Online &bull; Platform Guide
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ color: 'white', padding: '0.25rem', borderRadius: '4px' }}
              aria-label="Close Assistant"
              id="btn-close-chatbot"
            >
              <X size={18} />
            </button>
          </div>

          <div className="chat-messages" id="chatbot-message-list">
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className={`chat-bubble ${msg.sender}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem', fontSize: '0.75rem', color: msg.sender === 'bot' ? 'var(--text-muted)' : '#bfdbfe' }}>
                    {msg.sender === 'bot' ? <Bot size={13} /> : <User size={13} />}
                    <span>{msg.sender === 'bot' ? 'iCampusPro' : 'You'} &bull; {msg.timestamp}</span>
                  </div>
                  <div>{msg.text}</div>
                </div>

                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="chat-quick-actions">
                    {msg.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="quick-action-btn"
                        onClick={() => handleActionClick(action)}
                      >
                        <ArrowRight size={13} style={{ display: 'inline', marginRight: 4 }} />
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-bubble bot" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                <Loader2 size={16} className="animate-spin" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Analyzing response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            id="chatbot-input-form"
          >
            <input
              type="text"
              placeholder="Ask about institutes, features, registration..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input"
              id="chatbot-input-field"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn btn-primary"
              style={{ padding: '0.55rem 0.85rem' }}
              id="btn-chatbot-send"
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
