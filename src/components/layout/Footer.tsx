'use client';
import { motion } from 'framer-motion';
import { 
  TelevisionSimple, 
  Books, 
  FileText, 
  GithubLogo, 
  Globe, 
  Heart,
  DiscordLogo,
  Envelope,
  Clock,
  Lightning,
  ArrowSquareOut
} from '@phosphor-icons/react';

export default function Footer() {
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
      y: 0
    }
  };

  const services = [
    {
      name: "TV (Jellyfin)",
      url: "https://tv.somvilla.com",
      icon: TelevisionSimple,
      status: "Operational",
      statusColor: "bg-success"
    },
    {
      name: "Requests (Jellyseerr)",
      url: "https://jelly.somvilla.com",
      icon: Globe,
      status: "Operational",
      statusColor: "bg-success"
    },
    {
      name: "Books (Audiobookshelf)",
      url: "https://books.somvilla.com",
      icon: Books,
      status: "Operational",
      statusColor: "bg-success"
    },
    {
      name: "Wiki (WikiJS)",
      url: "https://wiki.somvilla.com",
      icon: FileText,
      status: "Operational",
      statusColor: "bg-success"
    }
  ];

  const quickLinks = [
    { label: "Setup Guides", href: "#guides" },
    { label: "FAQ", href: "#faq" },
    { label: "Support", href: "#support" },
    { label: "System Status", href: "#status" }
  ];

  const stats = [
    { label: "Uptime", value: "99.9%", icon: Clock },
    { label: "Response Time", value: "<100ms", icon: Lightning }
  ];

  return (
    <footer className="bg-base-200 pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12"
        >
          {/* Branding and Social */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              somvilla.com
            </h3>
            <p className="text-base-content/70 text-sm md:text-base">
              Your comprehensive media server solution for streaming, books, and documentation.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="btn btn-circle btn-sm md:btn-md btn-ghost hover:bg-primary/10 group"
                aria-label="GitHub"
              >
                <GithubLogo size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="btn btn-circle btn-sm md:btn-md btn-ghost hover:bg-primary/10 group"
                aria-label="Discord"
              >
                <DiscordLogo size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="mailto:support@somvilla.com" 
                className="btn btn-circle btn-sm md:btn-md btn-ghost hover:bg-primary/10 group"
                aria-label="Email"
              >
                <Envelope size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>
          
          {/* Services Status */}
          <motion.div variants={itemVariants}>
            <h4 className="text-base md:text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 md:space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.url} 
                    className="flex items-center justify-between group hover:bg-base-100 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2 text-base-content/70 group-hover:text-primary">
                      <service.icon size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${service.statusColor}`} />
                      <ArrowSquareOut 
                        size={14} 
                        className="opacity-0 group-hover:opacity-100 transition-opacity" 
                      />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-base md:text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-base-content/70 hover:text-primary transition-colors block hover:translate-x-1 transform duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* System Stats */}
          <motion.div variants={itemVariants}>
            <h4 className="text-base md:text-lg font-bold mb-4">System Status</h4>
            <div className="space-y-3 md:space-y-4">
              {stats.map((stat) => (
                <div 
                  key={stat.label} 
                  className="bg-base-100 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <stat.icon size={18} />
                    <span className="font-medium text-sm">{stat.label}</span>
                  </div>
                  <span className="text-xl font-bold">{stat.value}</span>
                </div>
              ))}
              <a 
                href="#status" 
                className="btn btn-outline btn-primary btn-sm md:btn-md w-full gap-2"
              >
                <Lightning size={18} />
                View Detailed Status
              </a>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-base-300 pt-6 md:pt-8 text-center text-base-content/70"
        >
          <p className="flex items-center justify-center gap-2 text-sm">
            Made with <Heart size={16} className="text-red-500 hover:scale-110 transition-transform" /> by somvilla.com
          </p>
          <p className="mt-2 text-xs md:text-sm">&copy; {new Date().getFullYear()} somvilla.com. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
