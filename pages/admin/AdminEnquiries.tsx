import React from 'react';
import { useData } from '../../context/DataContext';
import { Calendar, Mail, Phone } from 'lucide-react';

export const AdminEnquiries: React.FC = () => {
  const { enquiries } = useData();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Enquiries</h1>
      
      <div className="grid gap-4">
        {enquiries.length === 0 ? (
          <div className="text-center text-slate-500 py-12 bg-white rounded-lg">No enquiries yet.</div>
        ) : (
          enquiries.map(enquiry => (
            <div key={enquiry.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{enquiry.name}</h3>
                  {enquiry.company && <p className="text-slate-500 text-sm">{enquiry.company}</p>}
                </div>
                <span className="text-xs text-slate-400 flex items-center bg-slate-50 px-2 py-1 rounded">
                  <Calendar size={12} className="mr-1" />
                  {new Date(enquiry.date).toLocaleDateString()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center text-slate-600">
                  <Mail size={16} className="mr-2 text-blue-500" />
                  <a href={`mailto:${enquiry.email}`} className="hover:underline">{enquiry.email}</a>
                </div>
                <div className="flex items-center text-slate-600">
                  <Phone size={16} className="mr-2 text-blue-500" />
                  <a href={`tel:${enquiry.mobile}`} className="hover:underline">{enquiry.mobile}</a>
                </div>
              </div>

              {enquiry.message && (
                <div className="mt-2 pt-3 border-t border-slate-50">
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded italic">"{enquiry.message}"</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};