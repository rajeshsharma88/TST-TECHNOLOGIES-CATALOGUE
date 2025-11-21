import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { CategoryList } from './pages/CategoryList';
import { ProductDetail } from './pages/ProductDetail';
import { Collections } from './pages/Collections';
import { EnquiryProvider } from './context/EnquiryContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ScrollToTop } from './components/ScrollToTop';

import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';

const App: React.FC = () => {
  return (
    <DataProvider>
      <AuthProvider>
        <EnquiryProvider>
          <HashRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="categories" element={<CategoryList />} />
                <Route path="collections" element={<Collections />} />
                <Route path="product/:productId" element={<ProductDetail />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="products" element={<AdminProducts />} />
                <Route path="collections" element={<div>Collections Management (Coming Soon)</div>} />
                <Route path="enquiries" element={<AdminEnquiries />} />
              </Route>
            </Routes>
          </HashRouter>
        </EnquiryProvider>
      </AuthProvider>
    </DataProvider>
  );
};

export default App;