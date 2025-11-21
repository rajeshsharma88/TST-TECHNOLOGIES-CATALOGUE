import { Product, Category } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES as INITIAL_CATEGORIES } from '../constants';

const KEYS = {
  PRODUCTS: 'tst_products',
  CATEGORIES: 'tst_categories',
  ENQUIRIES: 'tst_enquiries'
};

export interface Enquiry {
  id: string;
  name: string;
  mobile: string;
  email: string;
  company?: string;
  message?: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export const db = {
  init: () => {
    // Force update products and categories to match the latest code constants
    // This fixes the issue where old data persists in the browser
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));

    // Only initialize enquiries if missing, to preserve user submitted data
    if (!localStorage.getItem(KEYS.ENQUIRIES)) {
      localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify([]));
    }
  },

  getProducts: (): Product[] => {
    const data = localStorage.getItem(KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  saveProduct: (product: Product) => {
    const products = db.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.push(product);
    }
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  deleteProduct: (id: string) => {
    const products = db.getProducts().filter(p => p.id !== id);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  getCategories: (): Category[] => {
    const data = localStorage.getItem(KEYS.CATEGORIES);
    return data ? JSON.parse(data) : [];
  },

  getEnquiries: (): Enquiry[] => {
    const data = localStorage.getItem(KEYS.ENQUIRIES);
    return data ? JSON.parse(data) : [];
  },

  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>) => {
    const enquiries = db.getEnquiries();
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'New'
    };
    enquiries.unshift(newEnquiry);
    localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }
};

// Initialize database on load
db.init();