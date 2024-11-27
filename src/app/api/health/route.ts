
import { NextResponse } from 'next/server';

async function checkService(url: string) {
  const startTime = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const endTime = Date.now();

    return {
      isOnline: response.ok,
      responseTime: endTime - startTime,
      lastChecked: new Date()
    };
  } catch (error) {
    return {
      isOnline: false,
      responseTime: Date.now() - startTime,
      lastChecked: new Date()
    };
  }
}

export async function GET() {
  const serviceUrls = [
    'tv.somvilla.com',
    'jelly.somvilla.com',
    'books.somvilla.com',
    'wiki.somvilla.com'
  ];

  const results = await Promise.all(
    serviceUrls.map(async (domain) => {
      const url = `https://${domain}`;
      const status = await checkService(url);
      return [url, status];
    })
  );

  const services = Object.fromEntries(results);
  
  return NextResponse.json(services);
}