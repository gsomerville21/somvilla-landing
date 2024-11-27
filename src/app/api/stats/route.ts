import { NextResponse } from 'next/server';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Helper function to fetch data from APIs with better error handling
async function fetchWithTimeout(url: string, options: FetchOptions = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    clearTimeout(timeoutId);
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`Failed to fetch from ${url}:`, error);
    return null;
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    // Get all required environment variables
    const [RADARR_API_KEY, SONARR_API_KEY, READARR_API_KEY] = (process.env.MEDIA_API_KEY || '').split(',');
    const JELLYFIN_API_KEY = process.env.JELLYFIN_API_KEY;
    const JELLYSEERR_API_KEY = process.env.JELLYSEERR_API_KEY;

    // Validate required environment variables
    if (!RADARR_API_KEY || !SONARR_API_KEY || !READARR_API_KEY || !JELLYFIN_API_KEY || !JELLYSEERR_API_KEY) {
      throw new Error('Missing required API keys in environment variables');
    }

    // Fetch all data in parallel
    const [
      movies,
      shows,
      books,
      jellyfinUsers,
      jellyfinSessions,
      jellyseerrStats
    ] = await Promise.all([
      // Radarr
      fetchWithTimeout(
        `${process.env.RADARR_URL}/api/v3/movie?apikey=${RADARR_API_KEY}`
      ),
      // Sonarr
      fetchWithTimeout(
        `${process.env.SONARR_URL}/api/v3/series?apikey=${SONARR_API_KEY}`
      ),
      // Readarr
      fetchWithTimeout(
        `${process.env.READARR_URL}/api/v1/book/?apikey=${READARR_API_KEY}`
      ),
      // Jellyfin Users
      fetchWithTimeout(
        `${process.env.JELLYFIN_URL}/Users?api_key=${JELLYFIN_API_KEY}`
      ),
      // Jellyfin Sessions
      fetchWithTimeout(
        `${process.env.JELLYFIN_URL}/Sessions?api_key=${JELLYFIN_API_KEY}`
      ),
      // Jellyseerr
      fetchWithTimeout(
        `${process.env.JELLYSEERR_URL}/api/v1/status`,
        {
          headers: {
            'X-Api-Key': JELLYSEERR_API_KEY
          }
        }
      )
    ]);

    // Process movie stats
    const movieStats = {
      count: movies?.length || 0,
      totalSize: movies?.reduce((acc: number, movie: any) => 
        acc + (movie.movieFile?.size || 0), 0) || 0
    };

    // Process show stats
    const showStats = {
      count: shows?.length || 0,
      totalSize: shows?.reduce((acc: number, show: any) => 
        acc + (show.statistics?.sizeOnDisk || 0), 0) || 0,
      episodes: shows?.reduce((acc: number, show: any) => 
        acc + (show.statistics?.totalEpisodeCount || 0), 0) || 0
    };

    // Process book stats
    const audiobooks = books?.filter((book: any) => book.audioFiles?.length > 0) || [];
    const booksTotalSize = books?.reduce((acc: number, book: any) => {
      const bookFilesSize = (book.bookFiles || [])
        .reduce((sum: number, file: any) => sum + (file.size || 0), 0);
      return acc + bookFilesSize;
    }, 0) || 0;

    const audiobooksTotalSize = books?.reduce((acc: number, book: any) => {
      const audioFilesSize = (book.audioFiles || [])
        .reduce((sum: number, file: any) => sum + (file.size || 0), 0);
      return acc + audioFilesSize;
    }, 0) || 0;

    return NextResponse.json({
      movies: movieStats.count,
      moviesSize: formatBytes(movieStats.totalSize),
      shows: showStats.count,
      showsSize: formatBytes(showStats.totalSize),
      episodes: showStats.episodes,
      books: books?.length || 0,
      booksSize: formatBytes(booksTotalSize),
      audiobooks: audiobooks.length,
      audiobooksSize: formatBytes(audiobooksTotalSize),
      activeStreams: jellyfinSessions?.length || 0,
      totalUsers: jellyfinUsers?.length || 0,
      pendingRequests: jellyseerrStats?.pendingRequests || 0,
      processingRequests: jellyseerrStats?.processingRequests || 0
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error in stats API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media statistics' },
      { status: 500 }
    );
  }
}
