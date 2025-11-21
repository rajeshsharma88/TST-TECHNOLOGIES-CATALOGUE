import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category } from '../types';
import { db, Enquiry } from '../services/db';

interface DataContextType {
  products: Product[];
  categories: Category[];
  enquiries: Enquiry[];
  refreshData: () => void;
  addProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const refreshData = () => {
    setProducts(db.getProducts());
    setCategories(db.getCategories());
    setEnquiries(db.getEnquiries());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addProduct = (product: Product) => {
    db.saveProduct(product);
    refreshData();
  };

  const deleteProduct = (id: string) => {
    db.deleteProduct(id);
    refreshData();
  };

  return (
    <DataContext.Provider value={{ 
      products, 
      categories, 
      enquiries, 
      refreshData,
      addProduct,
      deleteProduct
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};