import React, { useState } from 'react';
import { Mic, MicOff, Save, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VoiceProfileForm = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [profile, setProfile] = useState({
        state: '', district: '', landHolding: '', cropType: '', socialCategory: ''
    });
    const navigate = useNavigate();

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support Speech Recognition. Please type manually.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-IN';

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const text = event.results[current][0].transcript;
            setTranscript(text);
            processTranscript(text);
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
    };

    const processTranscript = async (text) => {
        setIsProcessing(true);
        try {
            const res = await axios.post('http://localhost:5000/api/parse-voice', { transcript: text });
            console.log('Voice parse response:', res.data);
            
            // Ensure all fields are properly formatted
            const cropTypeStr = Array.isArray(res.data.cropType) 
                ? res.data.cropType.join(', ') 
                : (res.data.cropType || '');
            
            setProfile({
                state: res.data.state || '',
                district: res.data.district || '',
                landHolding: res.data.landHolding || '',
                cropType: cropTypeStr,
                socialCategory: res.data.socialCategory || ''
            });
        } catch (err) {
            console.error('Voice parsing error:', err);
            alert(`Failed to parse voice data: ${err.response?.data?.error || err.message}`);
        }
        setIsProcessing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSave = { ...profile, cropType: profile.cropType.split(',').map(c => c.trim()) };
            const res = await axios.post('http://localhost:5000/api/profiles', dataToSave);
            localStorage.setItem('farmerProfileId', res.data._id);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Error saving profile");
        }
    };

    return (
        <div className="max-w-3xl mx-auto glass-card p-8 rounded-2xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">Farmer Profile</h2>

            <div className="mb-8 p-6 bg-primary-50 rounded-xl border border-primary-100 flex flex-col items-center">
                <button
                    type="button"
                    onClick={startListening}
                    className={`p-6 rounded-full mb-4 shadow-lg transition-all ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-primary-600 hover:bg-primary-700'} text-white`}
                >
                    {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                </button>
                <p className="text-slate-600 mb-2 font-medium">
                    {isListening ? "Listening... Speak now." : "Click to dictate your details (State, District, Land, Crop, Category)"}
                </p>
                {isProcessing && <div className="flex items-center gap-2 text-primary-600 mt-2"><Loader2 className="animate-spin" /> Parsing voice data...</div>}
                {transcript && <p className="italic text-slate-500 mt-2 text-center text-sm">"{transcript}"</p>}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                    <input type="text" value={profile.state} onChange={e => setProfile({ ...profile, state: e.target.value })} className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none transition-shadow" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
                    <input type="text" value={profile.district} onChange={e => setProfile({ ...profile, district: e.target.value })} className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none transition-shadow" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Land Holding (Acres)</label>
                    <input type="number" step="0.1" value={profile.landHolding} onChange={e => setProfile({ ...profile, landHolding: e.target.value })} className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none transition-shadow" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Social Category</label>
                    <select value={profile.socialCategory} onChange={e => setProfile({ ...profile, socialCategory: e.target.value })} className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none transition-shadow" required>
                        <option value="">Select Category</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Crop Type(s) - Comma separated</label>
                    <input type="text" value={profile.cropType} onChange={e => setProfile({ ...profile, cropType: e.target.value })} className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none transition-shadow" required />
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type="submit" className="w-full bg-success-500 hover:bg-success-600 text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg transition-transform hover:-translate-y-1">
                        <Save /> Save Profile & View Schemes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VoiceProfileForm;
