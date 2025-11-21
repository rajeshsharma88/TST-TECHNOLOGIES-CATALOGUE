
import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Collections: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Product Collections</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore our comprehensive range of security and automation solutions tailored for every industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/categories?id=${cat.id}`} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-slate-100 hover:border-blue-100">
                <div className="h-56 overflow-hidden relative">
                  <ImageWithFallback 
                    src={cat.imageUrl} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                     <h3 className="text-2xl font-bold text-white mb-1 shadow-sm">{cat.name}</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-slate-600 mb-4">{cat.description}</p>
                  <span className="text-blue-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform">
                    View Products <ArrowRight size={18} className="ml-2" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
