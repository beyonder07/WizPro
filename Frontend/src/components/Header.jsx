import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaCode, FaGithub, FaRocket,FaLinkedin  } from 'react-icons/fa';

const Header = ({ onThemeChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    } else {
      document.body.classList.add('light');
    }
    
    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.body.classList.replace('light', 'dark');
    } else {
      document.body.classList.replace('dark', 'light');
    }
    
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    onThemeChange && onThemeChange(newTheme);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">
            <FaCode size={18} color="white" />
          </div>
          <div className="logo-text">
            <span className="brand-name">wiZpro</span>
            <span className="brand-tagline">AI-Powered Code Review</span>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#docs" className="nav-link">Documentation</a>
        </nav>

        <div className="header-actions">
          <a 
            href="https://github.com/beyonder07" 
            target="_blank" 
            rel="noopener noreferrer"
            className="theme-toggle"
          >
            <FaGithub size={18} />
          </a>
          
          <a 
            href="https://www.linkedin.com/in/rajul-mishra-621548258/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="theme-toggle"
          >
            <FaLinkedin size={18} />
          </a>
          
         
          
      
        </div>
      </div>
      
      {/* Mobile menu overlay - will need additional CSS for this */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav-links">
            <a href="#features" className="mobile-nav-link">Features</a>
            <a href="#how-it-works" className="mobile-nav-link">How It Works</a>
            <a href="#pricing" className="mobile-nav-link">Pricing</a>
            <a href="#docs" className="mobile-nav-link">Documentation</a>
          </nav>
          <button className="button button-primary mobile-cta">
            <FaRocket size={14} />
            <span>Get Started</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;