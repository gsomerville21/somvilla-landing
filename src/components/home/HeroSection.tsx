'use client';
import { motion } from 'framer-motion';
import { Play, Books, FileText, Users, Clock, FilmStrip, MonitorPlay, Headphones, VideoCamera, Devices, Desktop, DeviceMobile } from '@phosphor-icons/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Head from 'next/head';

interface MediaStats {
  movies: number;
  moviesSize: string;
  shows: number;
  showsSize: string;
  episodes: number;
  books: number;
  booksSize: string;
  audiobooks: number;
  audiobooksSize: string;
}

export default function HeroSection() {
  const [stats, setStats] = useState<MediaStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setError('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  // Simplified floating animation for better performance
  const floatingIconVariants = {
    initial: { y: 0 },
    animate: (custom: number) => ({
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }
    })
  };

  const services = [
    {
      name: 'TV & Movies',
      description: 'Stream the latest content with Jellyfin',
      icon: Play,
      url: 'https://tv.somvilla.com',
      color: 'text-primary'
    },
    {
      name: 'Books',
      description: 'Browse the digital book collection',
      icon: Books,
      url: 'https://books.somvilla.com',
      color: 'text-secondary'
    },
    {
      name: 'Audiobooks',
      description: 'Explore the audiobook collection',
      icon: Headphones,
      url: 'https://books.somvilla.com',
      color: 'text-accent'
    }
  ];

  const statsDisplay = [
    { 
      label: 'Movies', 
      value: loading ? '...' : stats?.movies.toLocaleString() || '0',
      subValue: loading ? '...' : stats?.moviesSize || '0 B',
      icon: VideoCamera,
      color: 'text-primary'
    },
    { 
      label: 'TV Series', 
      value: loading ? '...' : stats?.shows.toLocaleString() || '0',
      subValue: loading ? '...' : stats?.showsSize || '0 B',
      icon: MonitorPlay,
      color: 'text-secondary'
    },
    { 
      label: 'Episodes', 
      value: loading ? '...' : stats?.episodes.toLocaleString() || '0',
      subValue: loading ? '...' : '',
      icon: Play,
      color: 'text-accent'
    },
    { 
      label: 'Books', 
      value: loading ? '...' : stats?.books.toLocaleString() || '0',
      ssubValue: loading ? '...' : '',
      icon: Books,
      color: 'text-primary'
    },
    { 
      label: 'Audiobooks', 
      value: loading ? '...' : stats?.audiobooks.toLocaleString() || '0',
      subValue: loading ? '...' : '',
      icon: Headphones,
      color: 'text-secondary'
    }
  ];

  return (
    <>
      <Head>
        <title>Family Media Hub - Stream Movies, TV Shows, and Books</title>
        <meta name="description" content="Access your family's shared media collection including movies, TV shows, books, and audiobooks in one convenient location." />
        <meta property="og:title" content="Family Media Hub" />
        <meta property="og:description" content="Your family's complete media solution." />
        <meta name="theme-color" content="#1a1a1a" />
      </Head>
      <section 
        className="relative bg-base-200 min-h-[calc(100vh-4rem)]"
        role="banner"
        aria-label="Welcome to Family Media Hub"
      >
        {/* Hero Pattern Background - Optimized */}
        <div className="absolute inset-0 will-change-[background-image]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
          <div className="absolute inset-0 opacity-50 md:opacity-100" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2%, transparent 0%)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Large Decorative Device Illustration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative will-change-transform"
          >
            <Desktop size={400} weight="fill" className="text-primary" />
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <DeviceMobile size={200} weight="fill" className="text-secondary" />
            </div>
          </motion.div>
        </div>

        {/* Floating Icons - Hidden on mobile, simplified animation */}
        <div className="absolute inset-0 overflow-hidden hidden md:block pointer-events-none">
          <motion.div
            custom={10}
            initial="initial"
            animate="animate"
            variants={floatingIconVariants}
            className="absolute top-20 left-[15%] text-primary/20 will-change-transform"
          >
            <VideoCamera size={120} weight="fill" />
          </motion.div>
          <motion.div
            custom={-10}
            initial="initial"
            animate="animate"
            variants={floatingIconVariants}
            className="absolute top-40 right-[15%] text-secondary/20 will-change-transform"
          >
            <MonitorPlay size={100} weight="fill" />
          </motion.div>
          <motion.div
            custom={15}
            initial="initial"
            animate="animate"
            variants={floatingIconVariants}
            className="absolute bottom-20 left-[25%] text-accent/20 will-change-transform"
          >
            <Headphones size={80} weight="fill" />
          </motion.div>
          <motion.div
            custom={-15}
            initial="initial"
            animate="animate"
            variants={floatingIconVariants}
            className="absolute bottom-40 right-[25%] text-primary/20 will-change-transform"
          >
            <Devices size={90} weight="fill" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex min-h-[calc(100vh-4rem)] items-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto py-8 md:py-12 w-full"
              >
                {/* Hero Header */}
                <div className="text-center mb-8 md:mb-12">
                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-2 mb-6"
                  >
                    <span className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full">
                      <VideoCamera size={18} className="text-primary" weight="fill" />
                      <span className="text-sm font-medium text-primary">Movies</span>
                    </span>
                    <span className="flex items-center gap-2 px-4 py-1.5 bg-secondary/10 rounded-full">
                      <MonitorPlay size={18} className="text-secondary" weight="fill" />
                      <span className="text-sm font-medium text-secondary">TV Shows</span>
                    </span>
                    <span className="flex items-center gap-2 px-4 py-1.5 bg-accent/10 rounded-full">
                      <Books size={18} className="text-accent" weight="fill" />
                      <span className="text-sm font-medium text-accent">Books</span>
                    </span>
                  </motion.div>

                  <motion.h1 
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight"
                  >
                    The Family Media Hub
                  </motion.h1>
                  
                  <motion.p 
                    variants={itemVariants}
                    className="text-base md:text-xl mb-8 md:mb-12 text-base-content/70 max-w-2xl mx-auto px-4"
                  >
                    Welcome to our shared media collection! The perfect place for family and friends to enjoy movies, 
                    TV shows, books, and audiobooks - all in one convenient location.
                  </motion.p>
                </div>

                {/* Quick Access Grid - Optimized backdrop-blur */}
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 px-4"
                >
                  {services.map((service) => (
                    <motion.a
                      key={service.name}
                      href={service.url}
                      variants={itemVariants}
                      className="card bg-base-100/90 md:backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group h-full border border-base-content/5 will-change-transform"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="card-body items-center text-center p-4 md:p-6">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-base-200/80 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/10 transition-colors">
                          <service.icon size={24} className={`${service.color} group-hover:scale-110 transition-transform`} weight="fill" />
                        </div>
                        <h3 className="card-title text-base md:text-lg mb-2">{service.name}</h3>
                        <p className="text-base-content/70 text-sm mb-4">{service.description}</p>
                        <button className="btn btn-primary btn-sm btn-outline">
                          Access Now
                        </button>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>

                {/* Stats Section - Optimized backdrop-blur */}
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8 md:mb-12 px-4"
                >
                  {statsDisplay.map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex flex-col items-center p-4 md:p-6 rounded-xl bg-base-300/50 md:backdrop-blur-sm border border-base-content/5 hover:bg-base-300/70 transition-colors will-change-transform"
                      whileHover={{ scale: 1.02 }}
                    >
                      <stat.icon size={28} className={stat.color} weight="fill" />
                      <span className={`text-xl md:text-3xl font-bold mb-1 ${stat.color} ${loading ? 'animate-pulse' : ''}`}>
                        {stat.value}
                      </span>
                      <span className="text-sm text-base-content/70">{stat.label}</span>
                      {stat.subValue && (
                        <span className="text-xs text-base-content/50 mt-1">{stat.subValue}</span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                {error && (
                  <motion.div
                    variants={itemVariants}
                    className="text-error text-center mb-8"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4"
                >
                  <Link 
                    href="#services"
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Explore Services
                  </Link>
                  <Link 
                    href="/guides"
                    className="btn btn-outline w-full sm:w-auto"
                  >
                    View Guides
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
