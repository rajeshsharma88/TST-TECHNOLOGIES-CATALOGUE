import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Check, FileText, Shield, ArrowRight, ChevronRight, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { useEnquiry } from '../context/EnquiryContext';

export const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const { openModal } = useEnquiry();
  const { products, categories } = useData();
  
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
          <Link to="/categories" className="text-blue-600 hover:underline flex items-center justify-center">
             <ArrowLeft size={20} className="mr-2" /> Back to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={16} className="mx-2 text-slate-400" />
          <Link to={`/categories?id=${product.categoryId}`} className="hover:text-blue-600 transition-colors">{category?.name}</Link>
          <ChevronRight size={16} className="mx-2 text-slate-400" />
          <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-slate-50 rounded-2xl p-8 flex items-center justify-center">
            <ImageWithFallback 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto rounded-lg shadow-lg max-h-[500px] object-contain"
            />
          </div>

          <div>
            <Link to={`/categories?id=${product.categoryId}`} className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-wide uppercase mb-4 hover:bg-blue-200 transition-colors">
              {category?.name}
            </Link>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
            <p className="text-xl text-slate-600 mb-6 leading-relaxed">{product.fullDescription}</p>
            
            <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
               <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Key Features</h3>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {product.features.map((feature, idx) => (
                   <li key={idx} className="flex items-center text-slate-700">
                     <Check size={18} className="text-green-500 mr-3 flex-shrink-0" />
                     {feature}
                   </li>
                 ))}
               </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openModal}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-center transition-colors shadow-lg shadow-blue-200 flex items-center justify-center"
              >
                Enquire Now <ArrowRight size={20} className="ml-2" />
              </button>
              <button 
                onClick={openModal}
                className="flex-1 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center"
              >
                <Calendar size={20} className="mr-2" /> Book A Demo
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Technical Specifications</h2>
          <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 max-w-3xl">
            <table className="w-full text-left border-collapse">
              <tbody>
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-4 border-b border-slate-100 font-medium text-slate-900 w-1/3">{key}</td>
                    <td className="p-4 border-b border-slate-100 text-slate-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start">
                <Shield className="text-blue-600 mt-1 mr-4" size={24} />
                <div>
                    <h4 className="font-bold text-slate-900">2 Year Warranty</h4>
                    <p className="text-sm text-slate-500 mt-1">Standard on all industrial components.</p>
                </div>
            </div>
            <div className="flex items-start">
                <FileText className="text-blue-600 mt-1 mr-4" size={24} />
                <div>
                    <h4 className="font-bold text-slate-900">ISO 9001 Certified</h4>
                    <p className="text-sm text-slate-500 mt-1">Manufacturing meets global standards.</p>
                </div>
            </div>
             <div className="flex items-start">
                <Check className="text-blue-600 mt-1 mr-4" size={24} />
                <div>
                    <h4 className="font-bold text-slate-900">In Stock</h4>
                    <p className="text-sm text-slate-500 mt-1">Ready to ship within 24 hours.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};