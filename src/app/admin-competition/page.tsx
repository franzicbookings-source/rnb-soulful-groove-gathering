"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, Search, User, Calendar, Mail, Hash } from 'lucide-react';
import { toast } from 'sonner';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';

interface CompetitionEntry {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  email?: string;
  photoUrl: string;
  submittedAt: string;
}

export default function AdminCompetitionPage() {
  const [entries, setEntries] = useState<CompetitionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  useEffect(() => {
    fetchEntries();
  }, [genderFilter]);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      let url = '/api/competition-entries?limit=100';
      if (genderFilter) {
        url += `&gender=${genderFilter}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch entries');
      
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
      toast.error('Failed to load competition entries');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = async (photoUrl: string, firstName: string, lastName: string, id: number) => {
    try {
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `competition-entry-${id}-${firstName}-${lastName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Photo downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download photo');
    }
  };

  const downloadAllAsLinks = () => {
    const linksText = entries
      .map((entry) => `Entry #${entry.id} - ${entry.firstName} ${entry.lastName}:\n${entry.photoUrl}`)
      .join('\n\n');
    
    const blob = new Blob([linksText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `competition-entries-links-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    toast.success('All photo links downloaded!');
  };

  const filteredEntries = entries.filter((entry) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      entry.firstName.toLowerCase().includes(searchLower) ||
      entry.lastName.toLowerCase().includes(searchLower) ||
      entry.email?.toLowerCase().includes(searchLower) ||
      entry.id.toString().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-black">
      <NavigationHeader />
      
      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-20"></div>

      <section className="section-purple py-8 xs:py-10 sm:py-16 px-3 xs:px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3 xs:mb-4 glow-gold">
              COMPETITION ENTRIES
            </h1>
            <p className="text-sm xs:text-base sm:text-xl text-[var(--cream)] max-w-3xl mx-auto">
              View and download all competition submissions
            </p>
          </div>

          {/* Controls */}
          <div className="bg-gradient-to-br from-black/60 via-[#2D1B3D]/50 to-black/60 backdrop-blur-md border-2 border-[var(--gold)]/30 rounded-2xl p-4 xs:p-6 mb-6 xs:mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gold)]/60" />
                <input
                  type="text"
                  placeholder="Search by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-[var(--gold)]/30 rounded-lg text-white placeholder:text-[var(--cream)]/40 focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
              </div>

              {/* Gender Filter */}
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="px-4 py-3 bg-black/40 border border-[var(--gold)]/30 rounded-lg text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {/* Download All Links */}
              <button
                onClick={downloadAllAsLinks}
                disabled={entries.length === 0}
                className="px-6 py-3 bg-[var(--gold)] text-black font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Download All Links</span>
                <span className="sm:hidden">Links</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 text-sm text-[var(--cream)]">
              <span>Total Entries: <strong className="text-[var(--gold)]">{entries.length}</strong></span>
              <span>Showing: <strong className="text-[var(--gold)]">{filteredEntries.length}</strong></span>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-[var(--gold)]/30 border-t-[var(--gold)] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[var(--cream)]">Loading entries...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredEntries.length === 0 && (
            <div className="text-center py-12 bg-gradient-to-br from-black/60 via-[#2D1B3D]/50 to-black/60 backdrop-blur-md border-2 border-[var(--gold)]/30 rounded-2xl">
              <User className="w-16 h-16 text-[var(--gold)]/40 mx-auto mb-4" />
              <p className="text-[var(--cream)] text-lg">No entries found</p>
            </div>
          )}

          {/* Entries Grid */}
          {!isLoading && filteredEntries.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-gradient-to-br from-black/60 via-[#2D1B3D]/50 to-black/60 backdrop-blur-md border-2 border-[var(--gold)]/30 rounded-xl overflow-hidden hover:border-[var(--gold)]/60 transition-colors"
                >
                  {/* Photo */}
                  <div className="relative w-full h-48 xs:h-56 bg-black/40">
                    <Image
                      src={entry.photoUrl}
                      alt={`Entry by ${entry.firstName} ${entry.lastName}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-[var(--gold)]">
                          {entry.firstName} {entry.lastName}
                        </h3>
                        <p className="text-sm text-[var(--cream)]/70">
                          {entry.gender}, {entry.age} years old
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[var(--cream)]/60">
                        <Hash size={12} />
                        {entry.id}
                      </div>
                    </div>

                    {entry.email && (
                      <div className="flex items-center gap-2 text-xs text-[var(--cream)]/80">
                        <Mail size={14} className="flex-shrink-0" />
                        <span className="truncate">{entry.email}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-[var(--cream)]/60">
                      <Calendar size={14} />
                      {new Date(entry.submittedAt).toLocaleString()}
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => downloadImage(entry.photoUrl, entry.firstName, entry.lastName, entry.id)}
                      className="w-full mt-3 px-4 py-2.5 bg-[var(--gold)] text-black font-bold text-sm rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      <Download size={16} />
                      Download Photo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
