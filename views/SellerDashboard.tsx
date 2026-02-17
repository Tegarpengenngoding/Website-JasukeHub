
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const MOCK_DATA = [
  { name: 'Mon', revenue: 400 },
  { name: 'Tue', revenue: 300 },
  { name: 'Wed', revenue: 1200 },
  { name: 'Thu', revenue: 800 },
  { name: 'Fri', revenue: 2500 },
  { name: 'Sat', revenue: 1800 },
  { name: 'Sun', revenue: 900 },
];

const SellerDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <span className="text-slate-500 text-xs font-bold uppercase">Total Earnings</span>
              <div className="text-2xl font-bold text-white mt-1">$12,450.00</div>
              <div className="text-green-500 text-[10px] font-bold mt-2">
                <i className="fas fa-arrow-up mr-1"></i> 12% vs last month
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <span className="text-slate-500 text-xs font-bold uppercase">Active Orders</span>
              <div className="text-2xl font-bold text-white mt-1">14</div>
              <div className="text-indigo-400 text-[10px] font-bold mt-2">
                Avg. completion 3 days
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <span className="text-slate-500 text-xs font-bold uppercase">Escrow Balance</span>
              <div className="text-2xl font-bold text-white mt-1 text-yellow-500">$3,200.00</div>
              <div className="text-slate-500 text-[10px] font-bold mt-2 italic">
                Protecting your funds
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <i className="fas fa-chart-line text-indigo-400"></i> Revenue Analytics
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="font-bold mb-4">Manage My Gigs</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <img src={`https://picsum.photos/seed/${i}/80/80`} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-sm font-bold">UE5 Meta World Build {i}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Game Dev • $5,000</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-white transition-colors"><i className="fas fa-edit"></i></button>
                    <button className="p-2 text-slate-400 hover:text-red-400 transition-colors"><i className="fas fa-trash"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-600/20">
            <h3 className="text-lg font-bold mb-2">Available for Withdrawal</h3>
            <div className="text-4xl font-black mb-6">$8,450.00</div>
            <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-slate-100 transition-all active:scale-95">
              Withdraw Funds
            </button>
            <p className="text-[10px] mt-4 opacity-70 text-center uppercase tracking-widest font-bold">
              Processing time: Max 24 hours
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="font-bold mb-4">Pending Tasks</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-xs font-bold">Review revision request from "Marketing Dept"</p>
                  <p className="text-[10px] text-slate-500 mt-1">AR Filter Project • 2h ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-xs font-bold">New message from potential client "Elon M."</p>
                  <p className="text-[10px] text-slate-500 mt-1">Mars VR Tour • 5h ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
