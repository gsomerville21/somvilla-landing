'use client';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
      <div className="relative group">
        {/* Cloud SVG */}
        <svg
          viewBox="0 0 100 70"
          className="w-10 h-8 md:w-12 md:h-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M85 45C85 51.6274 79.6274 57 73 57H25C18.3726 57 13 51.6274 13 45C13 39.4029 17.0151 34.7237 22.3565 33.4438C22.1228 32.6611 22 31.8444 22 31C22 25.4772 26.4772 21 32 21C34.8395 21 37.4164 22.1268 39.3379 23.9415C41.9589 18.9699 47.2268 15.5 53.5 15.5C61.7843 15.5 68.5 22.2157 68.5 30.5C68.5 31.4019 68.4103 32.2827 68.2393 33.1308C77.1992 33.7405 84 41.1013 84 50"
            style={{
              fill: 'rgba(59, 130, 246, 0.1)',
              stroke: '#3B82F6',
              strokeWidth: '4'
            }}
            className="group-hover:!stroke-[#6366F1] group-hover:!fill-[rgba(99,102,241,0.1)] transition-all duration-300"
          />
        </svg>
        {/* Play Symbol */}
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 md:w-5 md:h-5 absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 7v10l8-5-8-5z"
            style={{
              stroke: '#3B82F6',
              strokeWidth: '2',
              strokeLinejoin: 'round',
              fill: 'none'
            }}
            className="group-hover:!stroke-[#6366F1] transition-colors duration-300"
          />
        </svg>
      </div>
      <span className="ml-2 text-xl md:text-2xl font-bold" style={{ 
        background: 'linear-gradient(to right, #3B82F6, #6366F1)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        somvilla.com
      </span>
    </Link>
  );
}
