'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Question, CaretDown, MagnifyingGlass, Lightning, FileText } from '@phosphor-icons/react';
import Script from 'next/script';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const faqs = [
    {
      question: "How do I access the media servers?",
      answer: "Each service can be accessed through its respective subdomain (tv.somvilla.com, books.somvilla.com, etc.). You'll need to create an account or request access from the administrator to get started.",
      category: "access"
    },
    {
      question: "What devices are supported?",
      answer: "Our services support a wide range of devices including iOS/Android phones and tablets, smart TVs (Apple TV, Android TV, Google TV, Roku), and web browsers. Specific device support may vary by service.",
      category: "devices"
    },
    {
      question: "How do I request new content?",
      answer: "Use jelly.somvilla.com to submit content requests. You can search for movies, TV shows, or books and submit requests directly through the interface. You'll receive notifications when your requested content becomes available.",
      category: "content"
    },
    {
      question: "Is there offline access available?",
      answer: "Yes, both the Jellyfin and Audiobookshelf apps support downloading content for offline viewing/listening. This feature requires you to be signed in to your account.",
      category: "features"
    },
    {
      question: "What are the server maintenance windows?",
      answer: "Regular maintenance is performed during low-usage hours, typically between 3 AM and 5 AM EST. Emergency maintenance may occur outside these windows, but notifications will be sent in advance when possible.",
      category: "maintenance"
    },
    {
      question: "How do I get help if I'm having issues?",
      answer: "Check the wiki.somvilla.com documentation first for common solutions. If you can't find what you need, contact support through the provided channels in the wiki.",
      category: "support"
    }
  ];

  // Add structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <>
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <section id="faq" className="py-12 md:py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8 md:mb-12">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Question size={28} className="text-primary" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base-content/70 text-sm md:text-base">
                Find answers to common questions about our services and how to get started.
              </p>
            </div>

            {/* Search and Quick Links */}
            <motion.div 
              variants={containerVariants}
              className="mb-6 md:mb-8"
            >
              {/* Search Bar */}
              <div className="relative mb-4 md:mb-6">
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-bordered w-full pl-12 h-12"
                />
                <MagnifyingGlass 
                  size={20} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
                />
              </div>

              {/* Quick Category Links */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSearchQuery(category)}
                    className={`btn btn-sm ${
                      searchQuery === category ? 'btn-primary' : 'btn-ghost'
                    } text-xs md:text-sm`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              className="space-y-3 md:space-y-4"
            >
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="collapse collapse-arrow bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <input 
                      type="radio" 
                      name="faq-accordion" 
                      checked={openIndex === index}
                      onChange={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                    <div className="collapse-title text-base md:text-lg font-medium pr-12 py-3 md:py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-primary text-sm md:text-base">{index + 1}.</span>
                        {faq.question}
                      </div>
                    </div>
                    <div className="collapse-content">
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pt-2"
                          >
                            <p className="text-base-content/70 text-sm md:text-base">{faq.answer}</p>
                            <div className="mt-4 flex items-center gap-2">
                              <Lightning size={16} className="text-primary" />
                              <span className="text-xs md:text-sm font-medium">Category: {faq.category}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-8"
                >
                  <p className="text-base-content/70">No FAQs found matching your search.</p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center mt-8 md:mt-12"
            >
              <a 
                href="https://wiki.somvilla.com"
                className="btn btn-primary gap-2 w-full sm:w-auto"
              >
                <FileText size={20} />
                Visit Documentation
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
