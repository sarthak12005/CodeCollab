import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MicrosoftLogo from '../logo/MicrosoftLogo';
import { FcGoogle } from "react-icons/fc";
import AWSLogo from '../logo/AwsLogo';
import { useTheme } from '../../context/ThemeContext';

const Testimonial = () => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "CodeCollab transformed our remote team's productivity. Real-time code collaboration with zero lag - it's like having everyone in the same room.",
      author: "Michael Chen",
      role: "Senior Developer @ Acme Inc",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format"
    },
    {
      id: 2,
      quote: "The integrated video call feature alongside live coding is brilliant. We've cut our meeting time in half while doubling our output.",
      author: "Sarah Johnson",
      role: "Tech Lead @ TechGrowth",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face&auto=format"
    },
    {
      id: 3,
      quote: "I teach coding bootcamps, and CodeCollab has revolutionized how I interact with students. The real-time feedback loop is invaluable for learning.",
      author: "David Rodriguez",
      role: "Instructor @ CodeAcademy",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format"
    }
  ];

  

  const companyLogos = [
    { name: 'Google', icon: <FcGoogle size={30} /> },
    { name: 'Microsoft', icon: <MicrosoftLogo /> },
    { name: 'AWS', icon: <AWSLogo /> },
    { name: 'GitHub', icon: '⚡' },
    { name: 'Slack', icon: '#' },
    { name: 'Spotify', icon: '♪' }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className={`${theme.bg.secondary} ${theme.text.primary} py-20 px-4 border-b-1 border-[white]`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">
            Trusted by{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6e44ff] to-[#1cb8ff]">Developers</span>{' '}
            Worldwide
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-16">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-gray-800 rounded-lg p-8 max-w-4xl mx-auto">
                    <div className="text-blue-400 text-6xl mb-4 font-serif">"</div>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-white">
                          {testimonial.author}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentSlide ? 'bg-blue-400' : 'bg-gray-600'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <p className="text-gray-400 mb-8">Trusted by innovative teams at:</p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {companyLogos.map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center   w-12 h-12 text-2xl font-bold text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {company.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Online Developers Counter */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-gray-800 rounded-lg px-6 py-3">
            <div className="flex items-center mr-3">
              <div className="w-2 h-6 bg-blue-400 rounded mr-1"></div>
              <div className="w-2 h-4 bg-blue-400 rounded mr-1"></div>
              <div className="w-2 h-8 bg-blue-400 rounded mr-1"></div>
              <div className="w-2 h-3 bg-blue-400 rounded"></div>
            </div>
            <span className="text-blue-400 font-bold text-xl">10,847+</span>
            <span className="text-gray-300 ml-2">developers online now</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;