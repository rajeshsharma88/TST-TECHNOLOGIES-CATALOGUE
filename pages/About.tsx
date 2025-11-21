import React from 'react';
import { COMPANY_INFO } from '../constants';
import { Users, Award, TrendingUp } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About TST Technologies</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Innovating for a sustainable and automated future since 2003.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://picsum.photos/id/48/800/600" 
              alt="Our Office" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Who We Are</h2>
            <div className="prose prose-slate text-slate-600 space-y-4">
              <p className="leading-relaxed whitespace-pre-line">{COMPANY_INFO.aboutLong}</p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="border border-slate-200 p-4 rounded text-center">
                    <Users className="mx-auto text-blue-600 mb-2" size={24} />
                    <div className="text-2xl font-bold text-slate-900">500+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Employees</div>
                </div>
                <div className="border border-slate-200 p-4 rounded text-center">
                    <Award className="mx-auto text-blue-600 mb-2" size={24} />
                    <div className="text-2xl font-bold text-slate-900">50+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Patents</div>
                </div>
                <div className="border border-slate-200 p-4 rounded text-center">
                    <TrendingUp className="mx-auto text-blue-600 mb-2" size={24} />
                    <div className="text-2xl font-bold text-slate-900">15k+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Installations</div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Our Vision</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            "To become the global standard for industrial reliability, creating a world where technology and manufacturing coexist in perfect harmony with the environment."
          </p>
        </div>
      </div>
    </div>
  );
};