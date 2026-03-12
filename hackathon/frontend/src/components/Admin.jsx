import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, UploadCloud, CheckCircle } from 'lucide-react';

const Admin = () => {
    const [formData, setFormData] = useState({ name: '', department: '', description: '' });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a PDF file.");

        setLoading(true);
        setSuccess(false);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('department', formData.department);
        data.append('description', formData.description);
        data.append('pdf', file);

        try {
            await axios.post('http://localhost:5000/api/schemes/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess(true);
            setFormData({ name: '', department: '', description: '' });
            setFile(null);
        } catch (err) {
            console.error(err);
            alert("Error uploading scheme: " + (err.response?.data?.error || err.message));
        }
        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto glass-card p-8 rounded-2xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 flex items-center gap-3">
                <UploadCloud className="text-primary-600" size={32} /> Scheme Admin
            </h2>
            <p className="text-slate-600 mb-8">Upload official scheme PDFs to the Vector Database for RAG processing.</p>

            {success && (
                <div className="mb-6 p-4 bg-success-50 text-success-800 rounded-lg flex items-center gap-2 border border-success-200">
                    <CheckCircle /> Scheme Processed and Ingested successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Scheme Name</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department (Optional)</label>
                    <input type="text" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
                    <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" rows="2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Official Document (PDF)</label>
                    <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} className="w-full p-2 border border-slate-300 rounded-lg text-sm" required />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold p-4 rounded-xl flex items-center justify-center gap-2 mt-4 transition-colors disabled:bg-slate-400">
                    {loading ? <><Loader2 className="animate-spin" /> Ingesting to LLM Vector DB...</> : 'Upload & Process Scheme'}
                </button>
            </form>
        </div>
    );
};

export default Admin;
