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

const App: React.FC = () => {
  return (
    <EnquiryProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="collections" element={<Collections />} />
            <Route path="product/:productId" element={<ProductDetail />} />
          </Route>
        </Routes>
      </HashRouter>
    </EnquiryProvider>
  );
};

export default App;