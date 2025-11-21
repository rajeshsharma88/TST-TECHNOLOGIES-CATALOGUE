import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Settings, Globe, Star } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { useEnquiry } from '../context/EnquiryContext';

export const Home: React.FC = () => {
  const { openModal } = useEnquiry();
  const { categories } = useData();
  
  const featuredCategories = categories.slice(0, 6);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Operations Manager, TechSpace India",
      content: "TST Technologies transformed our office security. The facial recognition terminals are incredibly fast and accurate. Highly recommended for their professional service.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Facility Director, BlueChip Solutions",
      content: "We installed their flap barriers and turnstiles for our new campus in Bangalore. The build quality is excellent and the integration was seamless. Great support team!",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "CTO, SecureOne Systems",
      content: "Their UHF RFID readers have streamlined our vehicle access control significantly. Reliable products and top-notch after-sales support. A trusted partner for us.",
      rating: 5
    }
  ];

  return (
    <div>
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
           <img 
             src="https://picsum.photos/id/180/1920/1080" 
             alt="Background" 
             className="w-full h-full object-cover opacity-20"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Advanced <span className="text-blue-500">Security</span> & Automation Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              TST Technologies delivers state-of-the-art access control, biometrics, and perimeter security systems for a safer tomorrow.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/collections" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors flex items-center"
              >
                Explore Collections <ArrowRight className="ml-2" size={20} />
              </Link>
              <button 
                onClick={openModal}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white font-semibold px-8 py-4 rounded-lg transition-colors cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose TST Technologies?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We provide robust security infrastructure and automation tools trusted by major industries.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6 rounded-xl bg-slate-50 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Advanced Technology</h3>
              <p className="text-slate-600">From AI-powered facial recognition to high-speed boom barriers, we utilize the latest tech innovations.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-50 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrated Systems</h3>
              <p className="text-slate-600">Our products are designed to work together, creating a seamless security ecosystem for your facility.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-50 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Reliability</h3>
              <p className="text-slate-600">Deployed in sensitive government and corporate sectors worldwide with 24/7 support availability.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Collections</h2>
              <p className="text-slate-600">Comprehensive solutions for every security need.</p>
            </div>
            <Link to="/collections" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center">
              View All Collections <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.map((cat) => (
              <Link key={cat.id} to={`/categories?id=${cat.id}`} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <ImageWithFallback 
                      src={cat.imageUrl} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                    <p className="text-slate-600 text-sm line-clamp-2">{cat.description}</p>
                  </div>
                  <div className="px-6 pb-6">
                    <span className="text-blue-600 font-medium text-sm flex items-center">
                      Browse Products <ArrowRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Trusted by leading businesses across the country.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" className="mr-1" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Secure your premises today</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Contact our security experts for a customized assessment and quote for your facility.
          </p>
          <button 
            onClick={openModal}
            className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Get a Quote
          </button>
        </div>
      </section>
    </div>
  );
};