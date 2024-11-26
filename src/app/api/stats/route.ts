import { NextResponse } from 'next/server';

// Helper function to fetch data from APIs
async function fetchWithTimeout(url: string, options = {}) {
  const timeout = 5000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      cache: 'no-store', // Disable caching
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// Helper function to format bytes to human readable format
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export const dynamic = 'force-dynamic'; // Disable static generation
export const fetchCache = 'force-no-store'; // Disable fetch caching

export async function GET() {
  try {
    const RADARR_URL = process.env.RADARR_URL;
    const SONARR_URL = process.env.SONARR_URL;
    const READARR_URL = process.env.READARR_URL;
    const JELLYFIN_URL = "http://192.168.1.216:8096";
    const JELLYSEERR_URL = "http://192.168.1.147:5055";
    
    // Get API keys
    const [RADARR_API_KEY, SONARR_API_KEY, READARR_API_KEY] = (process.env.MEDIA_API_KEY || '').split(',');
    const JELLYFIN_API_KEY = "3d851a5a44a64e3396fe1c1c63b3fdda";
    const JELLYSEERR_API_KEY = "MTcyOTM1MTc2NjgzNDZmMmVkZWEzLTkyZTktNGJjZS1hOTJmLWNkMTYxYzVjYTE3MQ==";

    if (!RADARR_URL || !SONARR_URL || !READARR_URL || !RADARR_API_KEY || !SONARR_API_KEY || !READARR_API_KEY) {
      throw new Error('Missing required environment variables');
    }

    // Fetch movies from Radarr
    const moviesResponse = await fetchWithTimeout(
      `${RADARR_URL}/api/v3/movie?apikey=${RADARR_API_KEY}`
    );
    const movies = await moviesResponse.json();
    const movieStats = {
      count: movies.length,
      totalSize: movies.reduce((acc: number, movie: any) => {
        return acc + (movie.movieFile?.size || 0);
      }, 0)
    };

    // Fetch TV shows from Sonarr
    const showsResponse = await fetchWithTimeout(
      `${SONARR_URL}/api/v3/series?apikey=${SONARR_API_KEY}`
    );
    const shows = await showsResponse.json();
    const showStats = {
      count: shows.length,
      totalSize: shows.reduce((acc: number, show: any) => {
        return acc + (show.statistics?.sizeOnDisk || 0);
      }, 0)
    };

    // Calculate total episodes
    let totalEpisodes = 0;
    for (const show of shows) {
      totalEpisodes += show.statistics?.totalEpisodeCount || 0;
    }

    // Fetch books from Readarr
    const booksResponse = await fetchWithTimeout(
      `${READARR_URL}/api/v1/book?apikey=${READARR_API_KEY}`
    );
    const books = await booksResponse.json();
    
    // Count audiobooks (books with audio files)
    const audiobooks = books.filter((book: any) => book.audioFiles?.length > 0);
    
    // Calculate sizes
    const booksTotalSize = books.reduce((acc: number, book: any) => {
      const bookFilesSize = (book.bookFiles || []).reduce((sum: number, file: any) => sum + (file.size || 0), 0);
      return acc + bookFilesSize;
    }, 0);

    const audiobooksTotalSize = books.reduce((acc: number, book: any) => {
      const audioFilesSize = (book.audioFiles || []).reduce((sum: number, file: any) => sum + (file.size || 0), 0);
      return acc + audioFilesSize;
    }, 0);

    // Fetch Jellyfin stats
    const jellyfinUsersResponse = await fetchWithTimeout(
      `${JELLYFIN_URL}/Users?api_key=${JELLYFIN_API_KEY}`
    );
    const jellyfinUsers = await jellyfinUsersResponse.json();

    // Fetch Jellyfin sessions (active streams)
    const jellyfinSessionsResponse = await fetchWithTimeout(
      `${JELLYFIN_URL}/Sessions?api_key=${JELLYFIN_API_KEY}`
    );
    const jellyfinSessions = await jellyfinSessionsResponse.json();

    // Fetch Jellyseerr stats
    const jellyseerrStatsResponse = await fetchWithTimeout(
      `${JELLYSEERR_URL}/api/v1/status`, {
        headers: {
          'X-Api-Key': JELLYSEERR_API_KEY
        }
      }
    );
    const jellyseerrStats = await jellyseerrStatsResponse.json();

    return NextResponse.json({
      movies: movieStats.count,
      moviesSize: formatBytes(movieStats.totalSize),
      shows: showStats.count,
      showsSize: formatBytes(showStats.totalSize),
      episodes: totalEpisodes,
      books: books.length,
      booksSize: formatBytes(booksTotalSize),
      audiobooks: audiobooks.length,
      audiobooksSize: formatBytes(audiobooksTotalSize),
      activeStreams: jellyfinSessions.length,
      totalUsers: jellyfinUsers.length,
      pendingRequests: jellyseerrStats.pendingRequests || 0,
      processingRequests: jellyseerrStats.processingRequests || 0
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching media stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media statistics' },
      { status: 500 }
    );
  }
}
