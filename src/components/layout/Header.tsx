'use client';
import { useState, useEffect } from 'react';
import { List, X, Sun, Moon, House, TelevisionSimple, Books, FileText } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isScrolled, setIsScrolled] = useState(false);

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const menuItems = [
    { href: '/', label: 'Home', icon: House },
    { href: '#services', label: 'Services', icon: TelevisionSimple },
    { href: 'https://wiki.somvilla.com', label: 'Documentation', icon: FileText },
    { href: '#faq', label: 'FAQ', icon: Books },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: {
      x: -20,
      opacity: 0
    },
    open: {
      x: 0,
      opacity: 1
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-base-100 shadow-lg' : 'bg-base-100/80 backdrop-blur-md'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-base-content hover:text-primary transition-colors group py-2"
              >
                <item.icon 
                  size={20} 
                  className="group-hover:scale-110 transition-transform" 
                />
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="btn btn-circle btn-ghost hover:bg-primary/10"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={24} className="hover:rotate-12 transition-transform" />
              ) : (
                <Sun size={24} className="hover:rotate-12 transition-transform" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn btn-circle btn-sm btn-ghost hover:bg-primary/10"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={20} className="hover:rotate-12 transition-transform" />
              ) : (
                <Sun size={20} className="hover:rotate-12 transition-transform" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`btn btn-sm ${isOpen ? 'btn-primary' : 'btn-ghost'} hover:bg-primary/10 px-3 flex items-center gap-2`}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  {isOpen ? (
                    <>
                      <X size={20} />
                      <span className="text-sm font-medium">Close</span>
                    </>
                  ) : (
                    <>
                      <List size={20} />
                      <span className="text-sm font-medium">Menu</span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden bg-base-100 rounded-lg shadow-lg mt-2"
            >
              <motion.div className="flex flex-col p-2">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={menuItemVariants}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 text-base-content hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/10 active:bg-primary/20"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        className="h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
      />
    </header>
  );
}
