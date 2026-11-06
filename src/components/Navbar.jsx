import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  // Get current path for active state
  const getActiveItem = (path) => {
    if (path === '/') return 'HOME';
    if (path === '/destination') return 'DESTINATION';
    if (path === '/tripplanner') return 'TRIP PLANNER';
    if (path === '/aboutus') return 'ABOUT US';
    return 'HOME';
  };

  const activeItem = getActiveItem(location.pathname);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'DESTINATION', path: '/destination' },
    { name: 'TRIP PLANNER', path: '/tripplanner' },
    { name: 'ABOUT US', path: '/aboutus' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out ${
        isScrolled 
          ? 'bg-black/30 backdrop-blur-2xl shadow-2xl shadow-black/30 border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      {/* Animated Gradient Accent Line - Orange */}
      <div className={`h-[2px] bg-gradient-to-r from-transparent via-orange-400/80 via-orange-300/60 to-orange-400/80 to-transparent transition-all duration-700 ${
        isScrolled ? 'opacity-100 scale-x-100' : 'opacity-40 scale-x-75'
      }`}>
        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>

      <nav className="w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 2xl:px-10">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            
            {/* Logo - Link to Home */}
            <Link to="/" className="flex items-center gap-2 sm:gap-4 flex-shrink-0 -ml-2 sm:-ml-4 md:-ml-4 lg:-ml-6 xl:-ml-6 2xl:-ml-32">
              <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white/12 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg shadow-black/20">
                <span className="text-white text-sm sm:text-base font-black tracking-wider">
                  TP
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent"></div>
              </div>
              <div className="leading-tight">
                <p className="text-white text-[11px] sm:text-[13px] lg:text-[16px] font-black tracking-[1px] drop-shadow-lg">
                  TRAVEL
                </p>
                <p className="text-white text-[11px] sm:text-[13px] lg:text-[13px] font-black tracking-[1px] drop-shadow-lg">
                  PLANNER
                </p>
              </div>
            </Link>

            {/* Desktop Navigation - Clean White Theme with Smaller Text - MOVED TO RIGHT */}
            <ul className="hidden lg:flex items-center gap-1 xl:gap-2 ml-auto lg:ml-6 xl:-ml-12 2xl:-ml-6">
              {navItems.map((item) => {
                const isActive = activeItem === item.name;
                const isHovered = hoveredItem === item.name;
                
                return (
                  <li 
                    key={item.name}
                    className="relative"
                  >
                    <Link 
                      to={item.path}
                      className={`
                        relative block px-2 xl:px-3 py-1.5 xl:py-1.5 rounded-xl transition-all duration-300
                        ${isActive || isHovered ? 'scale-[1]' : ''}
                      `}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {/* Background - Clean White/Transparent */}
                      <div className={`
                        absolute inset-0 rounded-xl transition-all duration-500
                        ${isActive 
                          ? 'bg-white/5 backdrop-blur-sm' 
                          : isHovered 
                            ? 'bg-white/5 backdrop-blur-sm' 
                            : ''
                        }
                      `}>
                        {isActive && (
                          <>
                            <div className="absolute inset-0 rounded-xl bg-white/5"></div>
                          </>
                        )}
                      </div>
                      
                      {/* Button Text - Smaller Size */}
                      <span className={`
                        relative font-bold tracking-[0.15em] text-[10px] xl:text-[14px] uppercase transition-all duration-300
                        ${isActive 
                          ? 'text-white' 
                          : isHovered
                            ? 'text-white'
                            : 'text-white/70 hover:text-white'
                        }
                        ${isHovered && !isActive ? 'scale-100' : ''}
                      `}>
                        {item.name}
                      </span>
                      
                      {/* Active Indicator - Dynamic Underline Size */}
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-full px-2 xl:px-3">
                          <div className="w-full h-[2px] bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 rounded-full"></div>
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="lg:hidden relative w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center gap-1.5 hover:bg-white/20 transition-all duration-300 shadow-xl shadow-black/20 group active:scale-95"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-500 ease-out ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-500 ease-out ${
                isMenuOpen ? 'opacity-0 scale-x-0' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-500 ease-out ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
              
              {/* Button Glow - White */}
              <div className={`absolute inset-0 rounded-2xl bg-white/10 blur-xl transition-opacity duration-500 ${
                isMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </button>
          </div>

          {/* Mobile Menu - Clean White Theme */}
          <div 
            className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
              isMenuOpen ? 'max-h-[700px] opacity-100 mt-3' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col gap-2 py-6 px-4 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    relative font-bold tracking-[0.15em] text-[13px] py-3 px-4 rounded-2xl transition-all duration-300 text-center border overflow-hidden
                    ${activeItem === item.name 
                      ? 'bg-white/10 border-white/20 text-white' 
                      : 'border-transparent text-white/70 hover:text-white hover:bg-white/5 hover:border-white/10'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isMenuOpen ? 1 : 0,
                    transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 50}ms`
                  }}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="relative z-10">
                    {item.name}
                  </span>
                  
                  {/* Active indicator for mobile - Dynamic Size */}
                  {activeItem === item.name && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-orange-400 to-orange-300 rounded-r-full"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;