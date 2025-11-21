import React, { useState } from 'react';
import { COMPANY_INFO } from '../constants';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => setSubmitted(true), 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
       <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">
            Have a question about our products? We're here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600">Thank you for contacting us. A representative will get back to you within 24 hours.</p>
                <button 
                  onClick={() => { setSubmitted(false); setFormState({name: '', email: '', subject: '', message: ''}) }}
                  className="mt-8 text-blue-600 font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow outline-none"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                    <select 
                       id="subject"
                       name="subject"
                       value={formState.subject}
                       onChange={handleChange}
                       className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow outline-none bg-white"
                    >
                      <option value="">Select a topic...</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="general">General Information</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5}
                      required
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow outline-none resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors shadow-lg shadow-blue-100"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
             <div>
               <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
               <p className="text-slate-600 mb-8">
                 Our headquarters is located in the heart of Tech Valley. Feel free to reach out to us via phone, email, or visit our office.
               </p>
               
               <div className="space-y-6">
                 <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-slate-100">
                   <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                     <MapPin className="text-blue-600" size={24} />
                   </div>
                   <div>
                     <h3 className="text-lg font-bold text-slate-900 mb-1">Our Office</h3>
                     <p className="text-slate-600">{COMPANY_INFO.address}</p>
                   </div>
                 </div>

                 <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-slate-100">
                   <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                     <Phone className="text-blue-600" size={24} />
                   </div>
                   <div>
                     <h3 className="text-lg font-bold text-slate-900 mb-1">Phone Support</h3>
                     <p className="text-slate-600">{COMPANY_INFO.phone}</p>
                     <p className="text-sm text-slate-400 mt-1">Mon-Fri from 8am to 6pm PST</p>
                   </div>
                 </div>

                 <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-slate-100">
                   <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                     <Mail className="text-blue-600" size={24} />
                   </div>
                   <div>
                     <h3 className="text-lg font-bold text-slate-900 mb-1">Email Us</h3>
                     <p className="text-slate-600">{COMPANY_INFO.email}</p>
                     <p className="text-sm text-slate-400 mt-1">We usually reply within 24 hours</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Placeholder Map */}
             <div className="bg-slate-200 rounded-xl h-64 w-full flex items-center justify-center">
                <span className="text-slate-500 font-medium flex items-center">
                  <MapPin size={20} className="mr-2" /> Google Map Integration Placeholder
                </span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};