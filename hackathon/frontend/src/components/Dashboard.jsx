import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle, XCircle, FileText, ChevronDown, ChevronUp, Clock, Activity, FileCheck, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProofCard = ({ result }) => {
    const [expanded, setExpanded] = useState(false);

    const speakText = () => {
        const text = `${result.isEligible ? 'Eligible.' : 'Not Eligible.'} ${result.reasoning}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    // Determine card styling based on status
    const getCardStyle = () => {
        if (result.status === 'pending_document') {
            return 'bg-amber-50 border-amber-200';
        }
        if (result.status === 'error') {
            return 'bg-slate-50 border-slate-200';
        }
        if (result.isEligible === true) {
            return 'bg-success-50 border-success-200';
        }
        if (result.isEligible === false) {
            return 'bg-red-50 border-red-200';
        }
        return 'bg-slate-50 border-slate-200';
    };

    const getIcon = () => {
        if (result.status === 'pending_document') {
            return <FileText className="text-amber-600" size={24} />;
        }
        if (result.status === 'error') {
            return <Clock className="text-slate-400" size={24} />;
        }
        if (result.isEligible) {
            return <CheckCircle className="text-success-600" size={24} />;
        }
        return <XCircle className="text-red-500" size={24} />;
    };

    const getTitle = () => {
        if (result.status === 'pending_document') {
            return 'PDF Pending';
        }
        if (result.status === 'error') {
            return 'Analysis Error';
        }
        if (result.isEligible === true) {
            return 'Eligible for Scheme';
        }
        if (result.isEligible === false) {
            return 'Not Eligible';
        }
        return 'Checking...';
    };

    const getTitleColor = () => {
        if (result.status === 'pending_document') {
            return 'text-amber-700';
        }
        if (result.status === 'error') {
            return 'text-slate-700';
        }
        if (result.isEligible) {
            return 'text-success-700';
        }
        return 'text-red-700';
    };

    return (
        <div className={`mt-4 p-4 rounded-xl border ${getCardStyle()} transition-all`}>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {getIcon()}
                    <div>
                        <h4 className={`font-bold ${getTitleColor()}`}>
                            {getTitle()}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-slate-600">{result.reasoning}</p>
                            {result.isEligible !== null && result.status === 'completed' && (
                                <button onClick={speakText} className="text-primary-500 hover:text-primary-700" title="Read Aloud"><Volume2 size={16} /></button>
                            )}
                        </div>
                    </div>
                </div>
                {result.status !== 'pending_document' && (
                    <button onClick={() => setExpanded(!expanded)} className="text-slate-400 hover:text-slate-600">
                        {expanded ? <ChevronUp /> : <ChevronDown />}
                    </button>
                )}
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4 pt-4 border-t border-slate-200/50"
                    >
                        {result.citation && result.citation !== 'N/A' && (
                            <div className="bg-white/60 p-4 rounded-lg text-sm font-medium text-slate-700 font-mono mb-4 border border-slate-200">
                                <span className="text-primary-600 flex items-center gap-2 mb-2"><FileText size={16} /> Official Citation:</span>
                                "{result.citation}"
                            </div>
                        )}

                        {result.requiredDocuments && result.requiredDocuments.length > 0 && (
                            <div>
                                <h5 className="font-bold text-slate-700 mb-2 flex items-center gap-2 text-sm"><FileCheck size={16} /> Required Documents:</h5>
                                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                                    {result.requiredDocuments.map((doc, idx) => <li key={idx}>{doc}</li>)}
                                </ul>
                            </div>
                        )}

                        {result.missingInfo && result.missingInfo !== 'System temporarily unavailable' && (
                            <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg text-orange-800 text-sm">
                                <strong>Missing Info:</strong> {result.missingInfo}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Dashboard = () => {
    const [profile, setProfile] = useState(null);
    const [schemes, setSchemes] = useState([]);
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);
    const [metrics, setMetrics] = useState({ checks: 0, avgTime: 0 });

    useEffect(() => {
        const initDashboard = async () => {
            try {
                const pId = localStorage.getItem('farmerProfileId');
                if (!pId) return setLoading(false);

                const pRes = await axios.get(`http://localhost:5000/api/profiles/${pId}`);
                setProfile(pRes.data);

                const sRes = await axios.get('http://localhost:5000/api/schemes');
                const availableSchemes = sRes.data;
                setSchemes(availableSchemes);
                setLoading(false);

                // Run checks in parallel and measure time
                let totalTime = 0;
                let checksDone = 0;

                for (const scheme of availableSchemes) {
                    const start = Date.now();
                    axios.post('http://localhost:5000/api/check-eligibility', { profileId: pId, schemeId: scheme._id })
                        .then(res => {
                            const timeTaken = Date.now() - start;
                            setResults(prev => ({ ...prev, [scheme._id]: res.data }));
                            checksDone++;
                            totalTime += timeTaken;
                            setMetrics({ checks: checksDone, avgTime: Math.round(totalTime / checksDone) });
                        })
                        .catch(err => console.error("Error checking scheme:", err));
                }

            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        initDashboard();
    }, []);

    if (loading) return <div className="flex h-[50vh] justify-center items-center"><Loader2 className="animate-spin text-primary-500" size={48} /></div>;

    if (!profile) return (
        <div className="text-center p-12 glass-card rounded-2xl max-w-lg mx-auto mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">No Profile Found</h2>
            <p className="text-slate-600 mb-6">Please create a farmer profile first to view eligibility.</p>
            <a href="/profile" className="bg-primary-600 text-white px-6 py-3 rounded-full font-bold hover:bg-primary-700 transition">Create Profile</a>
        </div>
    );

    return (
        <div className="animate-fade-in max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Sidebar: Profile & Metrics */}
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><Activity className="text-primary-500" /> Impact Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                                <p className="text-3xl font-black text-primary-600">{metrics.checks}</p>
                                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Checks Done</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                                <p className="text-3xl font-black text-success-500">{metrics.avgTime}<span className="text-lg">ms</span></p>
                                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Avg AI Time</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Farmer Profile</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-500">State</span> <span className="font-semibold text-slate-800">{profile.state}</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-500">District</span> <span className="font-semibold text-slate-800">{profile.district}</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-500">Land Holding</span> <span className="font-semibold text-slate-800">{profile.landHolding} Acres</span></li>
                            <li className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-500">Category</span> <span className="font-semibold text-slate-800">{profile.socialCategory}</span></li>
                            <li className="flex justify-between"><span className="text-slate-500">Crops</span> <span className="font-semibold text-slate-800">{profile.cropType.join(', ')}</span></li>
                        </ul>
                    </div>
                </div>

                {/* Right Content: Scheme Cards */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-primary-100 pb-2 inline-block">Eligible Schemes Overview</h2>

                    {schemes.length === 0 ? (
                        <div className="glass-card p-8 rounded-2xl text-center text-slate-500">
                            No government schemes loaded in the database yet.
                        </div>
                    ) : (
                        schemes.map(scheme => (
                            <motion.div
                                key={scheme._id}
                                className="glass-card p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-slate-800">{scheme.name}</h3>
                                    <span className="bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full">{scheme.department || 'Govt. of India'}</span>
                                </div>
                                <p className="text-slate-600 mb-4 text-sm">{scheme.description}</p>

                                {results[scheme._id] ? (
                                    <ProofCard result={results[scheme._id]} />
                                ) : (
                                    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-slate-500">
                                        <Loader2 className="animate-spin text-primary-500" size={20} />
                                        <span className="font-medium">Analyzing eligibility via PDF Guidelines...</span>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
