"use client"

import { useState, useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { ShareButton } from '@/components/ShareButton';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/news-articles?limit=50');
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight-blue)] via-[var(--deep-brown)] to-black">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-28 pb-8 md:pb-12 px-4 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-[var(--gold)] mb-4 md:mb-6 glow-gold">
            News & Updates
          </h1>
          <p className="text-center text-[var(--cream)]/80 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto">
            Stay up to date with the latest announcements and artist features
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-6 md:py-8 px-4 pb-16 md:pb-20">
        <div className="container mx-auto max-w-4xl">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--gold)]"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center text-red-300">
              {error}
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-12 text-[var(--cream)]/60">
              No articles found.
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <div className="space-y-6 md:space-y-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-[var(--gold)]/30 hover:border-[var(--gold)] transition-all duration-300 flex flex-col md:flex-row"
                >
                  <Link href={`/news/${article.id}`} className="relative w-full md:w-80 aspect-[16/10] md:aspect-[4/3] overflow-hidden flex-shrink-0">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-[var(--gold)] text-black text-xs md:text-sm font-semibold rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </Link>
                  
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <Link href={`/news/${article.id}`}>
                      <h2 className="text-xl md:text-2xl font-bold text-[var(--gold)] mb-3 group-hover:glow-gold transition-all">
                        {article.title}
                      </h2>
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-[var(--cream)]/70 mb-3 md:mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="md:w-4 md:h-4" />
                        <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User size={14} className="md:w-4 md:h-4" />
                        <span>{article.author}</span>
                      </div>
                      <ShareButton 
                        title={article.title}
                        url={`/news/${article.id}`}
                        excerpt={article.excerpt}
                      />
                    </div>
                    
                    <p className="text-[var(--cream)]/80 mb-4 text-sm md:text-base flex-1">
                      {article.excerpt}
                    </p>
                    
                    <Link 
                      href={`/news/${article.id}`}
                      className="text-[var(--gold)] font-semibold text-sm md:text-base hover:underline"
                    >
                      Read Full Article →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}