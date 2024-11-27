'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Your Entertainment Guide
            </h1>
            <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
              Everything you need to start watching your favorite shows and movies on any device
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <a href="#watch" className="card bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer p-6 text-center">
              <h3 className="text-xl font-semibold text-primary">📺 Watch Shows & Movies</h3>
            </a>
            <a href="#request" className="card bg-secondary/10 hover:bg-secondary/20 transition-colors cursor-pointer p-6 text-center">
              <h3 className="text-xl font-semibold text-secondary">🎬 Request New Content</h3>
            </a>
            <a href="#listen" className="card bg-accent/10 hover:bg-accent/20 transition-colors cursor-pointer p-6 text-center">
              <h3 className="text-xl font-semibold text-accent">🎧 Listen to Audiobooks</h3>
            </a>
          </div>

          {/* Watch Section */}
          <section id="watch" className="card bg-base-100 shadow-xl mb-12 overflow-hidden">
            <div className="bg-neutral text-neutral-content p-6">
              <h2 className="text-3xl font-bold">📺 Watch Shows & Movies</h2>
              <p className="mt-2">Your personal streaming service - like having your own Netflix!</p>
            </div>
            
            <div className="card-body">
              <div className="space-y-8">
                {/* Device Selection */}
                <div className="rounded-lg bg-base-200 p-6">
                  <h3 className="text-2xl font-semibold mb-4">Choose Your Device</h3>
                  <p className="mb-6 text-base-content/80">Select your device below to see easy setup instructions:</p>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* TV Devices */}
                    <div className="card bg-base-100 shadow-hover transition-shadow">
                      <div className="card-body">
                        <h4 className="card-title text-lg mb-4">Smart TV</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          <li>Open your TV's app store</li>
                          <li>Search for "Jellyfin"</li>
                          <li>Download the official app</li>
                          <li>Open the app</li>
                          <li>Choose "Add Server"</li>
                          <li>Type: <code className="bg-base-300 px-2 py-1 rounded">https://tv.somvilla.com</code></li>
                          <li>Sign in with your account</li>
                        </ol>
                        <div className="mt-4 text-sm bg-info/10 p-3 rounded">
                          <strong>Tip:</strong> Can't find the app? Your TV might be supported through another device like Chromecast or Firestick.
                        </div>
                      </div>
                    </div>

                    <div className="card bg-base-100 shadow-hover transition-shadow">
                      <div className="card-body">
                        <h4 className="card-title text-lg mb-4">Apple TV</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          <li>On your Apple TV, go to App Store</li>
                          <li>Search for "Jellyfin"</li>
                          <li>Download the app (it's free!)</li>
                          <li>Open Jellyfin</li>
                          <li>Select "Add Server"</li>
                          <li>Enter: <code className="bg-base-300 px-2 py-1 rounded">https://tv.somvilla.com</code></li>
                          <li>Log in with your account</li>
                        </ol>
                        <div className="mt-4 text-sm bg-info/10 p-3 rounded">
                          <strong>Tip:</strong> Use the Apple TV remote's touchpad to type faster!
                        </div>
                      </div>
                    </div>

                    <div className="card bg-base-100 shadow-hover transition-shadow">
                      <div className="card-body">
                        <h4 className="card-title text-lg mb-4">Amazon Firestick</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          <li>Go to Search (magnifying glass)</li>
                          <li>Type "Jellyfin"</li>
                          <li>Download the free app</li>
                          <li>Open Jellyfin</li>
                          <li>Choose "Add Server"</li>
                          <li>Type: <code className="bg-base-300 px-2 py-1 rounded">https://tv.somvilla.com</code></li>
                          <li>Sign in to your account</li>
                        </ol>
                        <div className="mt-4 text-sm bg-info/10 p-3 rounded">
                          <strong>Tip:</strong> Use the Alexa voice button on your remote to search instead of typing!
                        </div>
                      </div>
                    </div>

                    {/* Mobile Devices */}
                    <div className="card bg-base-100 shadow-hover transition-shadow">
                      <div className="card-body">
                        <h4 className="card-title text-lg mb-4">iPhone or iPad</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          <li>Open App Store</li>
                          <li>Search "Jellyfin"</li>
                          <li>Download the app</li>
                          <li>Open Jellyfin</li>
                          <li>Tap "Add Server"</li>
                          <li>Enter: <code className="bg-base-300 px-2 py-1 rounded">https://tv.somvilla.com</code></li>
                          <li>Sign in to watch</li>
                        </ol>
                        <div className="mt-4 text-sm bg-info/10 p-3 rounded">
                          <strong>Tip:</strong> Download content for offline viewing on trips!
                        </div>
                      </div>
                    </div>

                    <div className="card bg-base-100 shadow-hover transition-shadow">
                      <div className="card-body">
                        <h4 className="card-title text-lg mb-4">Android Phone/Tablet</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          <li>Open Play Store</li>
                          <li>Search "Jellyfin"</li>
                          <li>Install the app</li>
                          <li>Open it</li>
                          <li>Tap "Add Server"</li>
                          <li>Type: <code className="bg-base-300 px-2 py-1 rounded">https://tv.somvilla.com</code></li>
                          <li>Log in to start watching</li>
                        </ol>
                        <div className="mt-4 text-sm bg-info/10 p-3 rounded">
                          <strong>Tip:</strong> Enable dark mode in settings for comfortable night viewing!
                        </div>
                      </div>
                    </div>

                    <div className="card bg-base-100 shadow-hover transition-shadow">
                      <div className="card-body">
                        <h4 className="card-title text-lg mb-4">Chromecast</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          <li>Install Jellyfin on your phone</li>
                          <li>Connect phone to your WiFi</li>
                          <li>Open Jellyfin app</li>
                          <li>Pick something to watch</li>
                          <li>Tap the Cast icon (TV with waves)</li>
                          <li>Select your Chromecast</li>
                          <li>Enjoy on your TV!</li>
                        </ol>
                        <div className="mt-4 text-sm bg-info/10 p-3 rounded">
                          <strong>Note:</strong> Your phone becomes a remote control!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Common Questions */}
                <div className="rounded-lg bg-base-200 p-6">
                  <h3 className="text-2xl font-semibold mb-4">Quick Help</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="card bg-base-100">
                      <div className="card-body">
                        <h4 className="card-title text-lg">Navigation Tips</h4>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Browse Movies or TV Shows sections</li>
                          <li>Use search to find specific titles</li>
                          <li>Heart icon saves to favorites</li>
                          <li>Resume shows where you left off</li>
                        </ul>
                      </div>
                    </div>
                    <div className="card bg-base-100">
                      <div className="card-body">
                        <h4 className="card-title text-lg">Troubleshooting</h4>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Check your internet connection</li>
                          <li>Make sure the app is up to date</li>
                          <li>Try closing and reopening the app</li>
                          <li>Verify your login details</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Request Section */}
          <section id="request" className="card bg-base-100 shadow-xl mb-12 overflow-hidden">
            <div className="bg-neutral text-neutral-content p-6">
              <h2 className="text-3xl font-bold">🎬 Request New Content</h2>
              <p className="mt-2">Want to watch something that's not available? Let us know!</p>
            </div>
            
            <div className="card-body">
              <div className="space-y-8">
                <div className="rounded-lg bg-base-200 p-6">
                  <h3 className="text-2xl font-semibold mb-4">How to Request</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <ol className="list-decimal list-inside space-y-4">
                        <li className="p-3 bg-base-100 rounded-lg">
                          Visit <code className="bg-base-300 px-2 py-1 rounded">https://jelly.somvilla.com</code>
                        </li>
                        <li className="p-3 bg-base-100 rounded-lg">
                          Sign in with your account
                        </li>
                        <li className="p-3 bg-base-100 rounded-lg">
                          Type the name of what you want to watch
                        </li>
                        <li className="p-3 bg-base-100 rounded-lg">
                          Click the "Request" button
                        </li>
                        <li className="p-3 bg-base-100 rounded-lg">
                          We'll notify you when it's ready!
                        </li>
                      </ol>
                    </div>
                    
                    <div className="card bg-base-100">
                      <div className="card-body">
                        <h4 className="card-title text-lg">Request Status Meanings</h4>
                        <ul className="space-y-4">
                          <li className="flex items-center gap-2">
                            <span className="text-2xl">⏳</span>
                            <div>
                              <strong>Pending</strong>
                              <p className="text-sm text-base-content/70">We've got your request</p>
                            </div>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-2xl">✅</span>
                            <div>
                              <strong>Approved</strong>
                              <p className="text-sm text-base-content/70">We're adding it now</p>
                            </div>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-2xl">🎉</span>
                            <div>
                              <strong>Available</strong>
                              <p className="text-sm text-base-content/70">Ready to watch!</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Audiobooks Section */}
          <section id="listen" className="card bg-base-100 shadow-xl mb-12 overflow-hidden">
            <div className="bg-neutral text-neutral-content p-6">
              <h2 className="text-3xl font-bold">🎧 Listen to Audiobooks</h2>
              <p className="mt-2">Enjoy your favorite books anywhere, anytime!</p>
            </div>
            
            <div className="card-body">
              <div className="space-y-8">
                <div className="rounded-lg bg-base-200 p-6">
                  <h3 className="text-2xl font-semibold mb-4">Getting Started</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="card bg-base-100">
                      <div className="card-body">
                        <h4 className="card-title text-lg">On Your Phone</h4>
                        <p className="mb-4">Choose your favorite app:</p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <span>📱</span>
                            <div>
                              <strong>Audiobookshelf</strong>
                              <p className="text-sm text-base-content/70">Works on both iPhone & Android</p>
                            </div>
                          </li>
                          <li className="flex items-center gap-2">
                            <span>🍎</span>
                            <div>
                              <strong>Chronicle</strong>
                              <p className="text-sm text-base-content/70">Best for iPhone users</p>
                            </div>
                          </li>
                          <li className="flex items-center gap-2">
                            <span>🤖</span>
                            <div>
                              <strong>Smart AudioBook Player</strong>
                              <p className="text-sm text-base-content/70">Best for Android users</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="card bg-base-100">
                      <div className="card-body">
                        <h4 className="card-title text-lg">On Your Computer</h4>
                        <p className="mb-4">Access through your web browser:</p>
                        <div className="p-4 bg-base-200 rounded-lg">
                          <code className="text-lg">https://books.somvilla.com</code>
                        </div>
                        <p className="mt-4 text-sm text-base-content/70">
                          Works on any computer - just sign in and start listening!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-base-200 p-6">
                  <h3 className="text-2xl font-semibold mb-4">Helpful Features</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="card bg-base-100">
                      <div className="card-body">
                        <h4 className="card-title text-lg">⏱️ Smart Resume</h4>
                        <p className="text-sm">Picks up right where you left off, on any device</p>
                      </div>
                    </div>
                    <div className="card bg-base-100">
                      <div className="card-body">
                        <h4 className="card-title text-lg">🚗 Offline Mode</h4>
                        <p className="text-sm">Download books to listen without internet</p>
                      </div>
                    </div>
                    <div className="card bg-base-100">
                      <div className="card-body">
                        <h4 className="card-title text-lg">😴 Sleep Timer</h4>
                        <p className="text-sm">Set a timer to stop playing automatically</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center">
            <Link 
              href="/"
              className="btn btn-primary btn-lg"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
