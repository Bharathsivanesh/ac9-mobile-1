import React, { useState } from 'react';
import { MessageSquare, Camera, Send, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MockApi } from '../services/mockApi';

const Complaints = () => {
  const { state, dispatch } = useAppContext();
  const { complaints } = state;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Food Quality',
    description: '',
    image: null as File | null
  });

  const complaintTypes = [
    'Food Quality',
    'Menu Variety', 
    'Service Speed',
    'Cleanliness',
    'Pricing',
    'Other'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description.trim()) {
      try {
        await MockApi.createComplaint({
          type: formData.type,
          description: formData.description,
          image: formData.image ? URL.createObjectURL(formData.image) : undefined
        });
        
        dispatch({
          type: 'ADD_COMPLAINT',
          complaint: {
            type: formData.type,
            description: formData.description,
            image: formData.image ? URL.createObjectURL(formData.image) : undefined
          }
        });
        setFormData({ type: 'Food Quality', description: '', image: null });
        setShowForm(false);
      } catch (error) {
        console.error('Failed to submit complaint:', error);
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle2 className="text-green-600" size={16} />;
      case 'in-progress':
        return <AlertCircle className="text-yellow-600" size={16} />;
      default:
        return <Clock className="text-blue-600" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-amber-200/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-64 left-20 w-12 h-12 bg-orange-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-8 w-24 h-24 bg-yellow-300/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-12 w-14 h-14 bg-amber-300/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Geometric Patterns */}
        <div className="absolute top-20 right-4 w-8 h-8 border-2 border-yellow-300/40 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-32 left-6 w-6 h-6 border-2 border-amber-400/30 rotate-12 animate-spin" style={{ animationDuration: '12s' }}></div>
        
        {/* Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-100/50 to-transparent">
          <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="rgba(251, 191, 36, 0.1)"></path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 pb-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Food Complaints</h1>
          <p className="text-gray-600 mt-1">Help us improve our cafeteria</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
        >
          <MessageSquare size={18} />
          <span>New</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-yellow-50/80 backdrop-blur-sm rounded-xl border border-yellow-200 text-center shadow-lg">
          <p className="text-2xl font-bold text-yellow-600">
            {complaints.filter(c => c.status === 'submitted').length}
          </p>
          <p className="text-sm text-gray-600">Submitted</p>
        </div>
        <div className="p-4 bg-yellow-50/80 backdrop-blur-sm rounded-xl border border-yellow-200 text-center shadow-lg">
          <p className="text-2xl font-bold text-yellow-600">
            {complaints.filter(c => c.status === 'in-progress').length}
          </p>
          <p className="text-sm text-gray-600">In Progress</p>
        </div>
        <div className="p-4 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-200 text-center shadow-lg">
          <p className="text-2xl font-bold text-green-600">
            {complaints.filter(c => c.status === 'resolved').length}
          </p>
          <p className="text-sm text-gray-600">Resolved</p>
        </div>
      </div>

      {/* Complaint Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Submit Complaint</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  {complaintTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Please describe your complaint in detail..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo (Optional)</label>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                    <Camera size={18} className="text-gray-600" />
                    <span className="text-sm text-gray-700">Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.image && (
                    <span className="text-sm text-gray-600">{formData.image.name}</span>
                  )}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send size={16} />
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complaints History */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Your Complaints</h2>
        
        {complaints.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No complaints submitted yet</p>
            <p className="text-sm">Help us improve by sharing your feedback</p>
          </div>
        ) : (
          <div className="space-y-3">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{complaint.type}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(complaint.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(complaint.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(complaint.status)}`}>
                      {complaint.status.replace('-', ' ').charAt(0).toUpperCase() + complaint.status.replace('-', ' ').slice(1)}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{complaint.description}</p>
                
                {complaint.image && (
                  <div className="mb-3">
                    <img
                      src={complaint.image}
                      alt="Complaint"
                      className="w-full max-w-xs rounded-lg border border-gray-200"
                    />
                  </div>
                )}

                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>ID: #{complaint.id}</span>
                  {complaint.status === 'in-progress' && (
                    <span className="text-yellow-600">Under Review</span>
                  )}
                  {complaint.status === 'resolved' && (
                    <span className="text-green-600">✓ Resolved</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Note */}
      <div className="p-4 bg-green-50/90 backdrop-blur-sm rounded-xl border border-green-200 shadow-lg">
        <h3 className="font-semibold text-green-900 mb-2">We Value Your Feedback</h3>
        <p className="text-sm text-green-800">
          Your complaints help us improve our cafeteria services. We review all submissions 
          and work to address issues promptly. Thank you for helping us serve you better!
        </p>
      </div>
      </div>
    </div>
  );
};

export default Complaints;