import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { db } from '../services/db';

export const EnquiryModal: React.FC = () => {
  const { isOpen, closeModal } = useEnquiry();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      db.addEnquiry(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', mobile: '', email: '', company: '', message: '' });
        closeModal();
      }, 3000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - using flex to position content and button */}
        <div className="bg-slate-900 p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white">Enquire Now</h3>
          
          {/* Close Button - White background circle with dark X icon */}
          <button 
            onClick={closeModal} 
            className="flex items-center justify-center w-8 h-8 bg-white rounded-full hover:bg-gray-200 transition-colors focus:outline-none shadow-md"
            aria-label="Close"
            type="button"
          >
            <X size={20} color="#0f172a" strokeWidth={3} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-300">
                <CheckCircle size={40} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">Enquiry Sent!</h4>
              <p className="text-slate-600">Thanks for reaching out, {formData.name}.<br/>Our team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="Your Full Name"
                />
              </div>
              
              <div>
                <label htmlFor="mobile" className="block text-sm font-semibold text-slate-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  required
                  pattern="[0-9]{10,}"
                  title="Please enter a valid mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="Your Mobile Number"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-1">Company Name <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">Your Message <span className="text-slate-400 font-normal">(Optional)</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 resize-none"
                  placeholder="Tell us more about your requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-blue-200 flex items-center justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Enquiry <Send size={18} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};