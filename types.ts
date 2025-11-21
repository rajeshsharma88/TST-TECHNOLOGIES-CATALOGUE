export interface Product {
  id: string;
  categoryId: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  features: string[];
  imageUrl: string;
  specifications: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface NavItem {
  label: string;
  path: string;
}