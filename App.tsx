
import React, { useState, useMemo } from 'react';
import { AppView, Service, Message, ProjectStatus } from './types';
import { MOCK_SERVICES } from './constants';
import Navbar from './components/Navbar';
import DiscoveryView from './views/DiscoveryView';
import SellerDashboard from './views/SellerDashboard';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.CLIENT);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Simulation state for chat
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'system', text: 'Negotiation space created', timestamp: '10:00 AM', type: 'system' }
  ]);

  const filteredServices = useMemo(() => {
    return MOCK_SERVICES.filter(s => {
      const matchSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'All Services' || s.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
  };

  const startNegotiation = () => {
    setShowChat(true);
    setMessages(prev => [
      ...prev,
      { 
        id: Date.now().toString(), 
        senderId: 'client', 
        text: `Hi! I'm interested in your service: ${selectedService?.title}. Can we discuss the requirements?`, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        type: 'text' 
      }
    ]);
  };

  const sendMessage = (text: string) => {
    const senderId = currentView === AppView.CLIENT ? 'client' : 'seller';
    setMessages(prev => [
      ...prev,
      { 
        id: Date.now().toString(), 
        senderId, 
        text, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        type: 'text' 
      }
    ]);
  };

  const sendInvoice = (amount: number, description: string) => {
    setMessages(prev => [
      ...prev,
      { 
        id: Date.now().toString(), 
        senderId: 'seller', 
        text: '', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        type: 'invoice',
        invoiceData: { id: 'INV-' + Math.random().toString(36).substr(2, 9), amount, description }
      }
    ]);
  };

  const handlePay = (id: string, amount: number) => {
    setShowPaymentModal(true);
  };

  const confirmPayment = () => {
    setMessages(prev => [
      ...prev,
      { id: 'pay-' + Date.now(), senderId: 'system', text: 'Payment confirmed. Funds held in escrow.', timestamp: 'Now', type: 'system' }
    ]);
    setShowPaymentModal(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        currentView={currentView} 
        setView={(v) => {
          setCurrentView(v);
          setShowChat(false);
          setSelectedService(null);
        }} 
        onSearch={setSearchTerm} 
      />

      <main>
        {currentView === AppView.CLIENT ? (
          <>
            {!selectedService && !showChat ? (
              <DiscoveryView 
                services={filteredServices} 
                onSelectService={handleSelectService}
                selectedCategory={selectedCategory}
                setCategory={setSelectedCategory}
              />
            ) : selectedService && !showChat ? (
              <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <button onClick={() => setSelectedService(null)} className="mb-6 text-slate-500 hover:text-white flex items-center gap-2">
                    <i className="fas fa-arrow-left"></i> Back to search
                  </button>
                  <img src={selectedService.image} className="w-full rounded-3xl shadow-2xl border border-slate-800" />
                  <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
                    {[1, 2, 3].map(i => (
                      <img key={i} src={`https://picsum.photos/seed/port${i}/400/300`} className="w-40 rounded-xl cursor-pointer hover:opacity-80 border border-slate-800" />
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <img src={selectedService.sellerAvatar} className="w-12 h-12 rounded-full" />
                    <div>
                      <h2 className="text-xl font-bold">{selectedService.sellerName}</h2>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500"><i className="fas fa-star"></i> {selectedService.rating}</span>
                        <span className="text-slate-500">• {selectedService.reviews} Reviews</span>
                      </div>
                    </div>
                  </div>
                  <h1 className="text-4xl font-black">{selectedService.title}</h1>
                  <p className="text-slate-400 leading-relaxed text-lg">{selectedService.description}</p>
                  
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">Premium Package</span>
                      <span className="text-3xl font-black">${selectedService.price}</span>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2"><i className="fas fa-check text-indigo-400"></i> Full Source Code</li>
                      <li className="flex items-center gap-2"><i className="fas fa-check text-indigo-400"></i> Deployment Assistance</li>
                      <li className="flex items-center gap-2"><i className="fas fa-check text-indigo-400"></i> 3 Commercial Revisions</li>
                    </ul>
                    <button 
                      onClick={startNegotiation}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/30"
                    >
                      Consult & Use Service
                    </button>
                  </div>
                </div>
              </div>
            ) : showChat && selectedService ? (
              <div className="max-w-4xl mx-auto px-4 py-8">
                 <button onClick={() => setShowChat(false)} className="mb-4 text-slate-500 hover:text-white flex items-center gap-2">
                    <i className="fas fa-arrow-left"></i> Back to project
                  </button>
                <ChatWindow 
                  service={selectedService} 
                  isSeller={false} 
                  messages={messages} 
                  onSendMessage={sendMessage}
                  onPayInvoice={handlePay}
                />
              </div>
            ) : null}
          </>
        ) : (
          /* Seller View Logic - Always shows dashboard unless in chat */
          <div className="max-w-7xl mx-auto px-4">
            {showChat && selectedService ? (
               <div className="max-w-4xl mx-auto px-4 py-8">
                 <button onClick={() => setShowChat(false)} className="mb-4 text-slate-500 hover:text-white flex items-center gap-2">
                    <i className="fas fa-arrow-left"></i> Back to dashboard
                  </button>
                <ChatWindow 
                  service={selectedService} 
                  isSeller={true} 
                  messages={messages} 
                  onSendMessage={sendMessage}
                  onSendInvoice={sendInvoice}
                />
              </div>
            ) : (
              <div className="relative">
                <SellerDashboard />
                {/* Simulated Floating Chat Button for Active Negotiation */}
                <button 
                  onClick={() => {
                    setSelectedService(MOCK_SERVICES[0]);
                    setShowChat(true);
                  }}
                  className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <i className="fas fa-comment-dots text-2xl"></i>
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Payment Modal (QRIS Simulator) */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white text-slate-900 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-xl font-black mb-1">QRIS Payment</h3>
            <p className="text-xs text-slate-500 mb-6 uppercase font-bold tracking-widest">Powered by Jasuke HUB Escrow</p>
            
            <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center p-6 mb-6">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=JASUKEHUB-ESCROW-001" alt="QRIS" className="w-full" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Amount</span>
                <span className="font-bold text-lg">${selectedService?.price}</span>
              </div>
              <button 
                onClick={confirmPayment}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all"
              >
                I have paid
              </button>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-sm font-bold text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <footer className="mt-20 py-12 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-cube text-white"></i>
              </div>
              <span className="text-xl font-bold">Jasuke HUB</span>
            </div>
            <p className="text-slate-500 text-sm max-w-md">
              The premier marketplace for XR (AR/VR), Gamification, and Interactive experiences. 
              Secure transactions, world-class talent, and AI-powered project management.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Categories</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="hover:text-indigo-400 cursor-pointer">Augmented Reality</li>
              <li className="hover:text-indigo-400 cursor-pointer">Virtual Reality</li>
              <li className="hover:text-indigo-400 cursor-pointer">Gamification</li>
              <li className="hover:text-indigo-400 cursor-pointer">Game Dev</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Community</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="hover:text-indigo-400 cursor-pointer">Success Stories</li>
              <li className="hover:text-indigo-400 cursor-pointer">Seller Guidelines</li>
              <li className="hover:text-indigo-400 cursor-pointer">Affiliate</li>
              <li className="hover:text-indigo-400 cursor-pointer">Help Center</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600 font-bold uppercase tracking-widest">
          © 2024 Jasuke HUB Marketplace • Built for the Immersive Age
        </div>
      </footer>
    </div>
  );
};

export default App;
