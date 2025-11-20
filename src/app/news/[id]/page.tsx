"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Calendar, User, ArrowLeft } from 'lucide-react';
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

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/news-articles?id=${params.id}`);
        
        if (!response.ok) {
          throw new Error('Article not found');
        }
        
        const data = await response.json();
        setArticle(data);

        // Update document title and meta tags
        if (data.title) {
          document.title = `${data.title} - RnB & Soulful Groove Gathering`;
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Article not found. Please check the URL and try again.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--midnight-blue)] via-[var(--deep-brown)] to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--gold)]"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--midnight-blue)] via-[var(--deep-brown)] to-black">
        <NavigationHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--gold)] mb-4">
            Article Not Found
          </h1>
          <p className="text-[var(--cream)]/70 mb-8">
            {error || 'The article you are looking for does not exist.'}
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--gold)] text-black font-semibold rounded-full hover:scale-105 transition-transform"
          >
            <ArrowLeft size={20} />
            Back to News
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--midnight-blue)] via-[var(--deep-brown)] to-black">
      <NavigationHeader />

      {/* Article Header */}
      <article className="relative pt-20 md:pt-24">
        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight-blue)] via-[var(--midnight-blue)]/50 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="relative -mt-16 md:-mt-24">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="bg-gradient-to-b from-[var(--midnight-blue)]/95 via-[var(--deep-brown)]/95 to-[var(--deep-brown)]/95 backdrop-blur-lg rounded-2xl border-2 border-[var(--gold)]/30 p-6 md:p-8 lg:p-10 shadow-2xl">
              {/* Back Button */}
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors mb-6 text-sm md:text-base"
              >
                <ArrowLeft size={18} />
                Back to News
              </Link>

              {/* Category Badge */}
              <div className="mb-4">
                <span className="px-3 md:px-4 py-1 md:py-1.5 bg-[var(--gold)] text-black text-xs md:text-sm font-semibold rounded-full uppercase tracking-wider">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--gold)] mb-4 md:mb-6 glow-gold leading-tight">
                {article.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm text-[var(--cream)]/70 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-[var(--gold)]/30">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="md:w-[18px] md:h-[18px]" />
                  <span>
                    {new Date(article.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="md:w-[18px] md:h-[18px]" />
                  <span>{article.author}</span>
                </div>
                <ShareButton
                  title={article.title}
                  url={`/news/${article.id}`}
                  excerpt={article.excerpt}
                />
              </div>

              {/* Excerpt */}
              <p className="text-base md:text-lg text-[var(--cream)]/90 mb-6 md:mb-8 leading-relaxed font-semibold border-l-4 border-[var(--gold)] pl-4 md:pl-6">
                {article.excerpt}
              </p>

              {/* Content */}
              <div
                className="prose prose-invert prose-sm md:prose-base lg:prose-lg max-w-none 
                prose-headings:text-[var(--gold)] prose-headings:font-bold prose-headings:mb-3 prose-headings:mt-6 
                prose-h3:text-xl prose-h3:md:text-2xl
                prose-p:text-[var(--cream)]/90 prose-p:leading-relaxed prose-p:text-sm prose-p:md:text-base prose-p:mb-4
                prose-li:text-[var(--cream)]/90 prose-li:text-sm prose-li:md:text-base
                prose-strong:text-[var(--gold)] prose-strong:font-semibold
                prose-ul:list-disc prose-ul:ml-5 prose-ul:space-y-1
                prose-a:text-[var(--gold)] prose-a:hover:text-[var(--gold-light)] prose-a:transition-colors"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share Again at Bottom */}
              <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-[var(--gold)]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-[var(--cream)]/70 text-sm md:text-base">
                  Share this article with your friends
                </p>
                <ShareButton
                  title={article.title}
                  url={`/news/${article.id}`}
                  excerpt={article.excerpt}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/news"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--gold)] text-black font-semibold rounded-full hover:scale-105 transition-transform text-sm md:text-base"
                >
                  <ArrowLeft size={18} />
                  All News
                </Link>
                <a
                  href="https://computicket.com/event/rnb-soulful-groove-gathering-summer-edition-/f6574621-5e8d-4a8a-aba9-8fa8bb6651aM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-[var(--gold)] text-[var(--gold)] font-semibold rounded-full hover:bg-[var(--gold)]/10 transition-all text-sm md:text-base"
                >
                  Get Tickets
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="py-12 md:py-16"></div>

      <Footer />
    </div>
  );
}
