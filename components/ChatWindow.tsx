
import React, { useState, useEffect, useRef } from 'react';
import { Message, Service, ProjectStatus } from '../types';
import { getSmartResponseSuggestions } from '../services/geminiService';

interface ChatWindowProps {
  service: Service;
  onSendInvoice?: (amount: number, desc: string) => void;
  onPayInvoice?: (id: string, amount: number) => void;
  isSeller: boolean;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ service, onSendInvoice, onPayInvoice, isSeller, messages, onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    
    // Auto-suggest replies when messages change
    if (messages.length > 0 && messages[messages.length - 1].senderId !== (isSeller ? 'seller' : 'client')) {
      getSmartResponseSuggestions(messages[messages.length - 1].text).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [messages, isSeller]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={isSeller ? "https://picsum.photos/seed/client/100/100" : service.sellerAvatar} className="w-10 h-10 rounded-full" />
          <div>
            <h4 className="text-sm font-bold">{isSeller ? "Alice (Client)" : service.sellerName}</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Online</span>
            </div>
          </div>
        </div>
        {isSeller && (
          <button 
            onClick={() => onSendInvoice?.(service.price, "Initial deposit for project")}
            className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <i className="fas fa-file-invoice mr-2"></i>
            Send Invoice
          </button>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        {messages.map((msg) => {
          const isOwn = (isSeller && msg.senderId === 'seller') || (!isSeller && msg.senderId === 'client');
          
          if (msg.type === 'invoice') {
            return (
              <div key={msg.id} className="flex justify-center my-4">
                <div className="bg-slate-800 border-2 border-indigo-500/50 rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-receipt text-indigo-400 text-xl"></i>
                  </div>
                  <h5 className="font-bold text-lg mb-1">Project Invoice</h5>
                  <p className="text-xs text-slate-400 mb-4">{msg.invoiceData?.description}</p>
                  <div className="text-2xl font-bold text-white mb-6">${msg.invoiceData?.amount}</div>
                  {!isSeller && (
                    <button 
                      onClick={() => onPayInvoice?.(msg.id, msg.invoiceData!.amount)}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
                    >
                      Pay via QRIS
                    </button>
                  )}
                  {isSeller && <span className="text-xs text-indigo-400 font-bold italic">Awaiting Payment...</span>}
                </div>
              </div>
            );
          }

          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="text-center py-2">
                <span className="bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-slate-700">
                  {msg.text}
                </span>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                isOwn ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                {msg.text}
                <div className="text-[9px] mt-1 opacity-50 text-right">{msg.timestamp}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          {suggestions.map((s, idx) => (
            <button 
              key={idx}
              onClick={() => onSendMessage(s)}
              className="whitespace-nowrap bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] px-3 py-1.5 rounded-full border border-slate-700 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button 
            onClick={handleSend}
            className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center justify-center transition-colors"
          >
            <i className="fas fa-paper-plane text-white text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
