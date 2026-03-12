import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Mic, FileText, Leaf, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

import VoiceProfileForm from './components/VoiceProfileForm';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';

const Navbar = () => (
  <nav className="glass-card sticky top-0 z-50 px-6 py-4 flex justify-between items-center mb-8">
    <div className="flex items-center gap-2">
      <div className="bg-primary-600 p-2 rounded-xl text-white">
        <Leaf size={24} />
      </div>
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
        Niti-Setu
      </span>
    </div>
    <div className="flex gap-6 font-medium text-slate-600">
      <Link to="/admin" className="text-xs self-center bg-slate-200 px-2 py-1 rounded hover:bg-slate-300 transition-colors mr-4">
        Admin Upload
      </Link>
      <Link to="/dashboard" className="flex items-center gap-2 hover:text-primary-600 transition-colors">
        <LayoutDashboard size={18} /> Dashboard
      </Link>
      <Link to="/profile" className="flex items-center gap-2 hover:text-primary-600 transition-colors">
        <Mic size={18} /> New Profile
      </Link>
    </div>
  </nav>
);

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl"
    >
      <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
        Voice-Based Scheme <br />
        <span className="text-primary-600">Eligibility Engine</span>
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        Convert complex government PDF bureaucracy into simple Yes/No eligibility decisions for farmers using Voice AI.
      </p>
      <Link
        to="/profile"
        className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        <Mic size={20} /> Start Voice Input
      </Link>
    </motion.div>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] text-slate-900">
        <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<VoiceProfileForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
