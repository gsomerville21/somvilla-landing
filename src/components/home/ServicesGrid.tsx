'use client';
import { motion } from 'framer-motion';
import { 
  TelevisionSimple, 
  FilmStrip, 
  Books, 
  FileText, 
  ListPlus, 
  Bell,
  DeviceMobile,
  Download,
  Gear,
  Desktop,
  ArrowRight,
  Users,
  Clock,
  Activity,
  Queue
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

interface MediaStats {
  activeStreams: number;
  totalUsers: number;
  pendingRequests: number;
  processingRequests: number;
}

export default function ServicesGrid() {
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

  const services = [
    {
      title: "TV.somvilla.com",
      description: "Stream your media library with Jellyfin's powerful interface. Support for direct play and transcoding ensures compatibility across all your devices.",
      icon: TelevisionSimple,
      features: [
        { text: "iOS/Android apps", icon: DeviceMobile },
        { text: "Apple TV support", icon: Desktop },
        { text: "Android TV/Google TV", icon: TelevisionSimple },
        { text: "Direct play support", icon: FilmStrip },
        { text: "Transcoding available", icon: Gear }
      ],
      stats: [
        { 
          label: "Active Streams", 
          value: loading ? "..." : stats?.activeStreams.toString() || "0", 
          icon: Activity 
        },
        { 
          label: "Total Users", 
          value: loading ? "..." : stats?.totalUsers.toString() || "0", 
          icon: Users 
        }
      ],
      status: "Operational",
      statusColor: "bg-success",
      url: "http://192.168.1.216:8096"
    },
    {
      title: "Jelly.somvilla.com",
      description: "Request new content through Jellyseerr. Keep track of your requests and get notified when content becomes available.",
      icon: ListPlus,
      features: [
        { text: "Easy content requests", icon: ListPlus },
        { text: "Request tracking", icon: Bell },
        { text: "Automatic notifications", icon: Bell },
        { text: "Integration with Jellyfin", icon: TelevisionSimple },
        { text: "Status updates", icon: Bell }
      ],
      stats: [
        { 
          label: "Pending Requests", 
          value: loading ? "..." : stats?.pendingRequests.toString() || "0", 
          icon: Queue 
        },
        { 
          label: "Processing", 
          value: loading ? "..." : stats?.processingRequests.toString() || "0", 
          icon: Gear 
        }
      ],
      status: "Operational",
      statusColor: "bg-success",
      url: "http://192.168.1.147:5055"
    },
    {
      title: "Books.somvilla.com",
      description: "Access your audiobook collection through Audiobookshelf. Sync progress across devices and manage your listening experience.",
      icon: Books,
      features: [
        { text: "Mobile apps available", icon: DeviceMobile },
        { text: "Progress syncing", icon: Gear },
        { text: "Kindle integration", icon: Books },
        { text: "Bookmark support", icon: Bell },
        { text: "Offline downloads", icon: Download }
      ],
      stats: [
        { label: "Total Books", value: "150", icon: Books },
        { label: "Currently Reading", value: "5", icon: Users }
      ],
      status: "Operational",
      statusColor: "bg-success",
      url: "https://books.somvilla.com"
    },
    {
      title: "Wiki.somvilla.com",
      description: "Find comprehensive documentation and guides for all services through WikiJS. Easy to navigate and constantly updated.",
      icon: FileText,
      features: [
        { text: "Detailed guides", icon: FileText },
        { text: "Search functionality", icon: Bell },
        { text: "Regular updates", icon: Bell },
        { text: "Mobile-friendly", icon: DeviceMobile },
        { text: "Easy navigation", icon: Bell }
      ],
      stats: [
        { label: "Total Articles", value: "75", icon: FileText },
        { label: "Last Updated", value: "2h ago", icon: Clock }
      ],
      status: "Operational",
      statusColor: "bg-success",
      url: "https://wiki.somvilla.com"
    }
  ];

  return (
    <section id="services" className="py-12 md:py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12 md:space-y-16"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Our Services</h2>
            <p className="text-base-content/70 text-sm md:text-base">
              Explore our comprehensive suite of media services designed to give you 
              the best possible experience with your content.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full"
                whileHover={{ y: -5 }}
              >
                <div className="card-body p-4 md:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 md:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-base-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <service.icon size={24} className="text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h3 className="card-title text-lg md:text-xl">{service.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`w-2 h-2 rounded-full ${service.statusColor}`} />
                          <span className="text-xs md:text-sm text-base-content/70">{service.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-base-content/70 text-sm md:text-base mb-4 md:mb-6">{service.description}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                    {service.stats.map((stat, index) => (
                      <div key={index} className="bg-base-100 rounded-lg p-2 md:p-3">
                        <div className="flex items-center gap-2 text-primary mb-1">
                          <stat.icon size={16} />
                          <span className="text-xs md:text-sm">{stat.label}</span>
                        </div>
                        <span className={`text-lg md:text-xl font-bold ${loading ? 'animate-pulse' : ''}`}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-4 md:mb-6">
                    <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Features:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-base-content/70 bg-base-100 p-2 rounded-lg">
                          <feature.icon size={16} className="text-primary flex-shrink-0" />
                          <span className="text-xs md:text-sm">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="card-actions justify-end mt-auto">
                    <a 
                      href={service.url}
                      className="btn btn-primary btn-sm md:btn-md gap-2 group/button w-full sm:w-auto"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Access Service
                      <ArrowRight 
                        size={16} 
                        className="group-hover/button:translate-x-1 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
