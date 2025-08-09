import React, { useState, useEffect, useRef } from 'react';
import { Search, CheckCircle, Users, TrendingUp, Award, Zap, Target, Shield, ChevronRight, Star, ArrowUp } from 'lucide-react';

// Custom hook for intersection observer animations
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.3 });

  useEffect(() => {
    if (!isIntersecting) return;
    
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isIntersecting]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// Main App Component
const AranceloApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll for show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate API call for tariff classification
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResult({
        classification: '8471.30.00',
        description: 'Máquinas automáticas para tratamiento o procesamiento de datos, portátiles',
        certainty: 87,
        additionalQuestions: [
          '¿El producto tiene pantalla integrada?',
          '¿Cuál es el peso aproximado del dispositivo?',
          '¿Incluye teclado físico o virtual?'
        ]
      });
      setIsLoading(false);
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Arancelo
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors">Acerca de</a>
              <a href="#services" className="text-slate-300 hover:text-cyan-400 transition-colors">Servicios</a>
              <a href="#contact" className="text-slate-300 hover:text-cyan-400 transition-colors">Contacto</a>
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105">
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent leading-tight">
              Clasificación Arancelaria
              <br />
              <span className="text-white">Inteligente</span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Encuentra la clasificación arancelaria correcta para tus productos con precisión de IA. 
              Optimiza tus importaciones con confianza y cumplimiento.
            </p>
          </div>

          {/* Search Form */}
          <div className="animate-fade-in-up animation-delay-300">
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  placeholder="Describe tu producto para encontrar su clasificación arancelaria..."
                  className="w-full pl-6 pr-32 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 text-lg backdrop-blur-sm"
                />
                <button
                  onClick={handleSearch}
                  disabled={isLoading || !searchQuery.trim()}
                  className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 rounded-xl flex items-center space-x-2 text-white font-medium transition-all duration-200 hover:scale-105"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">Buscar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-blue-400/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </section>

      {/* Search Results */}
      {searchResult && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
              <div className="text-center mb-8">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Clasificación Encontrada</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Código Arancelario</h3>
                  <div className="text-3xl font-bold text-white mb-2">{searchResult.classification}</div>
                  <p className="text-slate-300">{searchResult.description}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Nivel de Certeza</h3>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-1 bg-slate-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-cyan-400 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${searchResult.certainty}%` }}
                      ></div>
                    </div>
                    <span className="text-2xl font-bold text-white">{searchResult.certainty}%</span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2">
                    <span>Responder más preguntas para mejorar certeza</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <StatsSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* About Section */}
      <AboutSection />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Arancelo
                </span>
              </div>
              <p className="text-slate-400 mb-4">
                Clasificación arancelaria inteligente para importadores colombianos.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Inicio</a></li>
                <li><a href="#about" className="hover:text-cyan-400 transition-colors">Acerca de</a></li>
                <li><a href="#services" className="hover:text-cyan-400 transition-colors">Servicios</a></li>
                <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Soporte</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Ayuda</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Estado</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Contacto</h3>
              <div className="space-y-2 text-slate-400">
                <p>Bogotá, Colombia</p>
                <p>contact@arancelo.com</p>
                <p>+57 1 234 5678</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Arancelo. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-50"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
};

// Stats Section Component
const StatsSection = () => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Resultados que Hablan</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Miles de importadores confían en Arancelo para sus clasificaciones arancelarias
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, label: 'Clasificaciones Realizadas', value: 15847, suffix: '+' },
            { icon: TrendingUp, label: 'Certeza Promedio', value: 94, suffix: '%' },
            { icon: Award, label: 'Clientes Satisfechos', value: 2341, suffix: '+' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center transform transition-all duration-500 hover:scale-105 ${
                isIntersecting ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <stat.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-slate-300 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Reviews Section Component
const ReviewsSection = () => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.2 });

  const reviews = [
    {
      name: 'María González',
      company: 'ImportCol S.A.S',
      review: 'Arancelo ha revolucionado nuestro proceso de clasificación. La precisión es excepcional.',
      rating: 5,
      avatar: 'MG'
    },
    {
      name: 'Carlos Rodríguez',
      company: 'TradeSolutions',
      review: 'La velocidad y confiabilidad del sistema nos ha ahorrado horas de trabajo manual.',
      rating: 5,
      avatar: 'CR'
    },
    {
      name: 'Ana Martínez',
      company: 'Global Import Co.',
      review: 'Excelente herramienta. El soporte técnico es excepcional y siempre están disponibles.',
      rating: 5,
      avatar: 'AM'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-xl text-slate-300">
            Testimonios reales de importadores que confían en Arancelo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 ${
                isIntersecting ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {review.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{review.name}</h3>
                  <p className="text-slate-400 text-sm">{review.company}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-slate-300 leading-relaxed">"{review.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.3 });

  const benefits = [
    {
      icon: Zap,
      title: 'Velocidad',
      description: 'Clasificaciones en segundos, no en horas'
    },
    {
      icon: Target,
      title: 'Precisión',
      description: 'IA entrenada con miles de clasificaciones reales'
    },
    {
      icon: Shield,
      title: 'Cumplimiento',
      description: 'Garantiza conformidad con normativas colombianas'
    }
  ];

  return (
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`${isIntersecting ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl font-bold mb-6">
              Sobre <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Arancelo</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Somos la plataforma líder en Colombia para clasificación arancelaria automatizada. 
              Utilizamos aprendizaje automático supervisado para ofrecer clasificaciones precisas 
              y confiables que ayudan a los importadores a cumplir con las normativas aduaneras.
            </p>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Nuestro sistema está entrenado con miles de clasificaciones reales y se actualiza 
              constantemente para mantenerse al día con los cambios normativos. Esto garantiza 
              que siempre obtengas la clasificación más precisa y actualizada.
            </p>
          </div>

          <div className={`grid gap-6 ${isIntersecting ? 'animate-fade-in-up animation-delay-300' : 'opacity-0 translate-y-8'}`}>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-cyan-400/30 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-slate-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Add custom animations
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  .animation-delay-300 {
    animation-delay: 300ms;
  }

  .animation-delay-1000 {
    animation-delay: 1000ms;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default AranceloApp;