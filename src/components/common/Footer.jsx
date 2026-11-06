import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destination' },
    { name: 'Trip Planner', path: '/tripplanner' },
    { name: 'About Us', path: '/aboutus' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Instagram', icon: '📸', url: '#' },
    { name: 'YouTube', icon: '▶️', url: '#' }
  ];

  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-black">TP</span>
              </div>
              <div>
                <p className="text-base-content font-black text-sm tracking-wide">TRAVEL</p>
                <p className="text-base-content font-black text-sm tracking-wide">PLANNER</p>
              </div>
            </div>
            <p className="text-base-content/70 text-sm leading-relaxed">
              Discover the beauty of Bangladesh with our smart travel planner. 
              Plan your dream trips within your budget.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-9 h-9 rounded-lg bg-base-300/50 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label={social.name}
                >
                  <span className="text-base-content/70 hover:text-primary transition-colors text-lg">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base-content font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-base-content/70 hover:text-primary text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base-content font-bold text-sm uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5">
              <li>
                <span className="text-base-content/70 text-sm flex items-center gap-2">
                  <span className="text-primary">🏖️</span> Beaches
                </span>
              </li>
              <li>
                <span className="text-base-content/70 text-sm flex items-center gap-2">
                  <span className="text-primary">🏔️</span> Hill Stations
                </span>
              </li>
              <li>
                <span className="text-base-content/70 text-sm flex items-center gap-2">
                  <span className="text-primary">🌿</span> Nature
                </span>
              </li>
              <li>
                <span className="text-base-content/70 text-sm flex items-center gap-2">
                  <span className="text-primary">🏛️</span> Historical
                </span>
              </li>
              <li>
                <span className="text-base-content/70 text-sm flex items-center gap-2">
                  <span className="text-primary">🏙️</span> Cities
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base-content font-bold text-sm uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="text-base-content/70 text-sm flex items-start gap-3">
                <span className="text-primary text-lg">📍</span>
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="text-base-content/70 text-sm flex items-start gap-3">
                <span className="text-primary text-lg">📧</span>
                <span>info@travelplanner.com</span>
              </li>
              <li className="text-base-content/70 text-sm flex items-start gap-3">
                <span className="text-primary text-lg">📞</span>
                <span>+880 1234 567890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-base-300 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-base-content/60 text-xs">
            © {currentYear} Travel Planner. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-base-content/60 hover:text-primary text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-base-content/60 hover:text-primary text-xs transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-base-content/60 hover:text-primary text-xs transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;