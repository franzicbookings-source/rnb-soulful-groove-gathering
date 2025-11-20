"use client"

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Camera, Upload, Sparkles, Gift, X } from 'lucide-react';
import { toast } from 'sonner';

export default function CompetitionSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    email: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image must be less than 10MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToSupabase = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName.trim()) {
      toast.error('Please enter your first name');
      return;
    }
    if (!formData.lastName.trim()) {
      toast.error('Please enter your last name');
      return;
    }
    if (!formData.gender) {
      toast.error('Please select your gender');
      return;
    }
    if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      toast.error('Please enter a valid age');
      return;
    }
    if (!selectedImage) {
      toast.error('Please upload a photo of our branded car');
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image
      const imageUrl = await uploadImageToSupabase(selectedImage);

      // Submit entry
      const response = await fetch('/api/competition-entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          gender: formData.gender,
          age: parseInt(formData.age),
          photoUrl: imageUrl,
          email: formData.email.trim() || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit entry');
      }

      // Success!
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        email: ''
      });
      setSelectedImage(null);
      setImagePreview(null);
      
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to submit your entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <section className="section-purple py-8 xs:py-10 sm:py-16 px-3 xs:px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[var(--gold)] blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[var(--gold)] blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[var(--gold)] blur-3xl animate-pulse" style={{ animationDelay: '0.75s' }}></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Header */}
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 xs:px-6 py-2 xs:py-2.5 bg-[var(--gold)]/10 border-2 border-[var(--gold)]/40 rounded-full mb-4 xs:mb-6">
              <Sparkles className="w-4 h-4 xs:w-5 xs:h-5 text-[var(--gold)] animate-pulse" />
              <span className="text-[var(--gold)] text-xs xs:text-sm font-bold uppercase tracking-wider">Competition Active</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 xs:mb-4 glow-gold">
              SPOT & WIN
            </h2>
            <p className="text-sm xs:text-base sm:text-xl text-[var(--cream)] max-w-3xl mx-auto mb-2 xs:mb-3 font-semibold">
              Spotted Our Branded Car? Snap a Photo & Win!
            </p>
            <div className="flex items-center justify-center gap-2 text-[var(--gold)] text-xs xs:text-sm font-bold">
              <Gift className="w-4 h-4 xs:w-5 xs:h-5" />
              <span>Win 1 of 5 Event Tickets</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 items-start">
            {/* Left: Info Card */}
            <div className="bg-gradient-to-br from-black/60 via-[#2D1B3D]/50 to-black/60 backdrop-blur-md border-2 border-[var(--gold)]/30 rounded-2xl xs:rounded-3xl p-5 xs:p-6 sm:p-8">
              <div className="flex items-start gap-3 xs:gap-4 mb-4 xs:mb-6">
                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-[var(--gold)]/20 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5 xs:w-6 xs:h-6 text-[var(--gold)]" />
                </div>
                <div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-[var(--gold)] mb-2">How to Enter</h3>
                  <p className="text-xs xs:text-sm sm:text-base text-[var(--cream)]/80 leading-relaxed">
                    Keep your eyes peeled for our exclusive branded car around town!
                  </p>
                </div>
              </div>

              <div className="space-y-3 xs:space-y-4 mb-6 xs:mb-8">
                {[
                  { step: '1', text: 'Spot our branded RnB & Soulful Groove Gathering car' },
                  { step: '2', text: 'Take a clear photo of the car' },
                  { step: '3', text: 'Fill in your details below' },
                  { step: '4', text: 'Upload your photo and submit' },
                  { step: '5', text: 'Winners announced on 10 December 2025!' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 rounded-full bg-[var(--gold)] text-black flex items-center justify-center font-bold text-xs xs:text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <p className="text-xs xs:text-sm sm:text-base text-[var(--cream)]/90 pt-0.5">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="bg-black/40 border border-[var(--gold)]/20 rounded-xl p-3 xs:p-4">
                <p className="text-[10px] xs:text-xs sm:text-sm text-[var(--cream)]/70 leading-relaxed">
                  <strong className="text-[var(--gold)]">Prize:</strong> 5 Lucky winners will receive complimentary tickets to RnB & Soulful Groove Gathering on 14 December 2025.
                </p>
              </div>
            </div>

            {/* Right: Entry Form */}
            <div className="bg-gradient-to-br from-black/60 via-[#2D1B3D]/50 to-black/60 backdrop-blur-md border-2 border-[var(--gold)]/30 rounded-2xl xs:rounded-3xl p-5 xs:p-6 sm:p-8">
              <h3 className="text-xl xs:text-2xl font-bold text-[var(--gold)] mb-4 xs:mb-6">Enter Competition</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm xs:text-base text-[var(--cream)] mb-2 font-semibold">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-[var(--gold)]/30 rounded-lg text-white placeholder:text-[var(--cream)]/40 focus:outline-none focus:border-[var(--gold)] transition-colors text-sm xs:text-base"
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm xs:text-base text-[var(--cream)] mb-2 font-semibold">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-[var(--gold)]/30 rounded-lg text-white placeholder:text-[var(--cream)]/40 focus:outline-none focus:border-[var(--gold)] transition-colors text-sm xs:text-base"
                    placeholder="Enter your last name"
                    required
                  />
                </div>

                {/* Gender & Age Row */}
                <div className="grid grid-cols-2 gap-3 xs:gap-4">
                  <div>
                    <label htmlFor="gender" className="block text-sm xs:text-base text-[var(--cream)] mb-2 font-semibold">
                      Gender <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-[var(--gold)]/30 rounded-lg text-white focus:outline-none focus:border-[var(--gold)] transition-colors text-sm xs:text-base"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm xs:text-base text-[var(--cream)] mb-2 font-semibold">
                      Age <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="1"
                      max="120"
                      className="w-full px-4 py-3 bg-black/40 border border-[var(--gold)]/30 rounded-lg text-white placeholder:text-[var(--cream)]/40 focus:outline-none focus:border-[var(--gold)] transition-colors text-sm xs:text-base"
                      placeholder="Age"
                      required
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label htmlFor="email" className="block text-sm xs:text-base text-[var(--cream)] mb-2 font-semibold">
                    Email <span className="text-[var(--cream)]/50 text-xs">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-[var(--gold)]/30 rounded-lg text-white placeholder:text-[var(--cream)]/40 focus:outline-none focus:border-[var(--gold)] transition-colors text-sm xs:text-base"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm xs:text-base text-[var(--cream)] mb-2 font-semibold">
                    Upload Photo <span className="text-red-400">*</span>
                  </label>
                  
                  {!imagePreview ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="relative border-2 border-dashed border-[var(--gold)]/40 rounded-lg p-6 xs:p-8 text-center cursor-pointer hover:border-[var(--gold)] transition-colors bg-black/20 group"
                    >
                      <Upload className="w-8 h-8 xs:w-10 xs:h-10 text-[var(--gold)]/60 mx-auto mb-3 group-hover:text-[var(--gold)] transition-colors" />
                      <p className="text-[var(--cream)]/80 text-xs xs:text-sm mb-1">
                        Click to upload photo of our branded car
                      </p>
                      <p className="text-[var(--cream)]/50 text-[10px] xs:text-xs">
                        PNG, JPG up to 10MB
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        required
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden border-2 border-[var(--gold)]/40">
                      <Image
                        src={imagePreview}
                        alt="Selected car photo"
                        width={400}
                        height={300}
                        className="w-full h-48 xs:h-56 object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 xs:py-4 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-black font-bold text-sm xs:text-base rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Entry'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4">
          <div className="bg-gradient-to-br from-[var(--midnight-blue)] via-[#2D1B3D] to-black border-2 border-[var(--gold)] rounded-2xl xs:rounded-3xl p-6 xs:p-8 sm:p-10 max-w-md w-full text-center relative animate-fade-in-up">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 p-2 bg-[var(--gold)] text-black rounded-full hover:scale-110 transition-transform"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 xs:w-20 xs:h-20 mx-auto mb-4 xs:mb-6 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
              <Gift className="w-8 h-8 xs:w-10 xs:h-10 text-[var(--gold)] animate-pulse" />
            </div>

            <h3 className="text-2xl xs:text-3xl font-bold text-[var(--gold)] mb-3 xs:mb-4 glow-gold">
              Entry Submitted!
            </h3>
            
            <p className="text-sm xs:text-base text-[var(--cream)] mb-6 xs:mb-8 leading-relaxed">
              Thank you for entering our competition! Winners will be announced on <strong className="text-[var(--gold)]">10 December 2025</strong>.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-8 py-3 bg-[var(--gold)] text-black font-bold text-sm xs:text-base rounded-full hover:scale-105 transition-transform"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}