"use client"

import { useState, useEffect } from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Calendar, User, X } from 'lucide-react';

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
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
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
                  onClick={() => setSelectedArticle(article)}
                  className="group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-[var(--gold)]/30 hover:border-[var(--gold)] transition-all duration-300 cursor-pointer touch-manipulation flex flex-col md:flex-row"
                >
                  <div className="relative w-full md:w-80 aspect-[16/10] md:aspect-[4/3] overflow-hidden flex-shrink-0">
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
                  </div>
                  
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <h2 className="text-xl md:text-2xl font-bold text-[var(--gold)] mb-3 group-hover:glow-gold transition-all">
                      {article.title}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-[var(--cream)]/70 mb-3 md:mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="md:w-4 md:h-4" />
                        <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User size={14} className="md:w-4 md:h-4" />
                        <span>{article.author}</span>
                      </div>
                    </div>
                    
                    <p className="text-[var(--cream)]/80 mb-4 text-sm md:text-base flex-1">
                      {article.excerpt}
                    </p>
                    
                    <span className="text-[var(--gold)] font-semibold text-sm md:text-base">
                      Read Full Article →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full min-h-screen md:min-h-0 md:max-w-4xl md:my-8 md:max-h-[90vh] md:overflow-y-auto bg-gradient-to-b from-[var(--midnight-blue)] to-[var(--deep-brown)] md:border-2 md:border-[var(--gold)] md:rounded-lg shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="sticky md:absolute top-4 right-4 z-10 p-2.5 md:p-2 bg-[var(--gold)] text-black rounded-full hover:scale-110 transition-transform shadow-lg touch-manipulation"
              aria-label="Close article"
            >
              <X size={22} className="md:w-6 md:h-6" />
            </button>

            {/* Article Header Image */}
            <div className="relative w-full h-64 md:h-80 lg:h-96">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight-blue)] to-transparent" />
            </div>

            {/* Article Content */}
            <div className="p-6 md:p-8 lg:p-10">
              <div className="mb-4">
                <span className="px-3 py-1 bg-[var(--gold)] text-black text-xs md:text-sm font-semibold rounded-full">
                  {selectedArticle.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--gold)] mb-4 md:mb-5 glow-gold leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm text-[var(--cream)]/70 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-[var(--gold)]/30">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="md:w-[18px] md:h-[18px]" />
                  <span>{new Date(selectedArticle.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="md:w-[18px] md:h-[18px]" />
                  <span>{selectedArticle.author}</span>
                </div>
              </div>

              <div 
                className="prose prose-invert prose-sm md:prose-base lg:prose-lg max-w-none 
                prose-headings:text-[var(--gold)] prose-headings:font-bold prose-headings:mb-3 prose-headings:mt-6 
                prose-h3:text-xl prose-h3:md:text-2xl
                prose-p:text-[var(--cream)]/90 prose-p:leading-relaxed prose-p:text-sm prose-p:md:text-base
                prose-li:text-[var(--cream)]/90 prose-li:text-sm prose-li:md:text-base
                prose-strong:text-[var(--gold)] prose-strong:font-semibold
                prose-ul:list-disc prose-ul:ml-5 prose-ul:space-y-1"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-[var(--gold)]/30">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full md:w-auto px-8 md:px-10 py-3 md:py-3.5 bg-[var(--gold)] text-black text-sm md:text-base font-semibold rounded-full hover:scale-105 transition-transform touch-manipulation"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}