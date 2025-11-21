import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowRight, Filter } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const CategoryList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('id');
  const { products, categories } = useData();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryId);

  useEffect(() => {
    setSelectedCategory(categoryId);
  }, [categoryId]);

  const handleCategoryChange = (id: string | null) => {
    setSelectedCategory(id);
    if (id) {
      setSearchParams({ id });
    } else {
      setSearchParams({});
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter(p => p.categoryId === selectedCategory)
    : products;

  const activeCategoryName = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)?.name 
    : 'All Products';

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24 border border-slate-100">
              <div className="flex items-center mb-6">
                <Filter size={20} className="text-slate-500 mr-2" />
                <h3 className="text-lg font-bold text-slate-900">Categories</h3>
              </div>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === null 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                        selectedCategory === cat.id 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-3/4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">{activeCategoryName}</h1>
              <p className="text-slate-500 mt-2">Showing {filteredProducts.length} results</p>
            </div>

            {filteredProducts.length === 0 ? (
               <div className="bg-white p-12 text-center rounded-lg border border-slate-100 shadow-sm">
                 <p className="text-slate-500 text-lg">No products found in this category.</p>
                 <button 
                   onClick={() => handleCategoryChange(null)}
                   className="mt-4 text-blue-600 hover:underline font-medium"
                 >
                   View all products
                 </button>
               </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col border border-slate-100 h-full">
                    <div className="h-52 overflow-hidden relative group bg-slate-100">
                      <ImageWithFallback 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                       <div className="mb-4">
                         <span className="text-xs font-bold tracking-wide text-blue-600 uppercase mb-2 block">
                            {categories.find(c => c.id === product.categoryId)?.name}
                         </span>
                         <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight hover:text-blue-700 transition-colors">
                           <Link to={`/product/${product.id}`}>{product.name}</Link>
                         </h3>
                         <p className="text-slate-600 text-sm line-clamp-3">{product.shortDescription}</p>
                       </div>
                       
                       <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                         <span className="font-semibold text-slate-900 text-sm">{product.price}</span>
                         <Link 
                           to={`/product/${product.id}`} 
                           className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wide rounded hover:bg-blue-600 transition-colors"
                         >
                           Details <ArrowRight size={14} className="ml-1.5" />
                         </Link>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};