import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { Product } from '../../types';
import { ImageWithFallback } from '../../components/ImageWithFallback';

export const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, deleteProduct } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    categoryId: '',
    price: 'Request Quote',
    shortDescription: '',
    fullDescription: '',
    imageUrl: '',
    features: [],
    specifications: {}
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.includes(searchTerm)
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        categoryId: categories[0]?.id || '',
        price: 'Request Quote',
        shortDescription: '',
        fullDescription: '',
        imageUrl: '',
        features: [],
        specifications: {}
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productToSave: Product = {
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      name: formData.name!,
      categoryId: formData.categoryId!,
      price: formData.price!,
      shortDescription: formData.shortDescription!,
      fullDescription: formData.fullDescription!,
      imageUrl: formData.imageUrl || 'https://via.placeholder.com/400',
      features: Array.isArray(formData.features) ? formData.features : [],
      specifications: formData.specifications || {}
    };
    addProduct(productToSave);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Product Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={20} className="mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProducts.map(product => (
              <tr key={product.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="w-12 h-12 rounded-md overflow-hidden border border-slate-200 bg-slate-50">
                    <ImageWithFallback 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-4 font-medium text-slate-900">{product.name}</td>
                <td className="p-4 text-slate-600">
                  {categories.find(c => c.id === product.categoryId)?.name || product.categoryId}
                </td>
                <td className="p-4 text-slate-600">{product.price}</td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => handleOpenModal(product)}
                    className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => {
                      if(window.confirm('Delete this product?')) deleteProduct(product.id);
                    }}
                    className="text-red-600 hover:bg-red-50 p-2 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <div className="p-8 text-center text-slate-500">No products found.</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full p-2 border rounded" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={formData.categoryId}
                    onChange={e => setFormData({...formData, categoryId: e.target.value})}
                  >
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  value={formData.shortDescription}
                  onChange={e => setFormData({...formData, shortDescription: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Full Description</label>
                <textarea 
                  className="w-full p-2 border rounded h-32" 
                  value={formData.fullDescription}
                  onChange={e => setFormData({...formData, fullDescription: e.target.value})}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};