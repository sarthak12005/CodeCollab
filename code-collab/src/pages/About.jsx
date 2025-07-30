import React from "react";
import {
  Users,
  Code,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme.bg.primary} ${theme.text.primary}`}>
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className={`px-6 py-24 text-center ${theme.gradient.secondary}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-6xl font-bold mb-8 ${theme.gradient.primary} bg-clip-text text-transparent`}>
            About CodeCollab
          </h1>
          <p className={`text-xl ${theme.text.secondary} mb-10 max-w-3xl mx-auto leading-relaxed`}>
            We are a passionate team of developers and innovators dedicated to
            transforming ideas into powerful digital solutions. Our expertise
            spans across modern web technologies, mobile development, and
            cutting-edge software architecture.
          </p>
          <button className={`${theme.button.primary} px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105`}>
            Discover More
          </button>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className={`text-4xl font-bold mb-6 ${theme.text.primary}`}>
                  Democratizing Coding Excellence
                </h2>
                <p className={`${theme.text.secondary} text-lg leading-relaxed mb-8`}>
                  At CodeCollab, we believe that exceptional software development
                  should be accessible to everyone. Our mission is to
                  democratize coding excellence by providing innovative
                  solutions that empower businesses to thrive in the digital
                  landscape.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className={`font-semibold ${theme.text.primary} mb-1`}>
                      Innovation-Driven Development
                    </h4>
                    <p className={`${theme.text.tertiary} text-sm`}>
                      Cutting-edge solutions using the latest technologies and
                      frameworks
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className={`font-semibold ${theme.text.primary} mb-1`}>
                      Scalable Architecture
                    </h4>
                    <p className={`${theme.text.tertiary} text-sm`}>
                      Robust and maintainable code built for long-term success
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className={`font-semibold ${theme.text.primary} mb-1`}>
                      Agile Methodology
                    </h4>
                    <p className={`${theme.text.tertiary} text-sm`}>
                      Fast, iterative development with continuous client
                      collaboration
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className={`font-semibold ${theme.text.primary} mb-1`}>
                      24/7 Support
                    </h4>
                    <p className={`${theme.text.tertiary} text-sm`}>
                      Comprehensive support and maintenance for peace of mind
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative flex justify-center">
              <div className="relative">
                {/* 3D Box Container */}
                <div className="w-80 h-80 relative transform-gpu perspective-1000">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500 shadow-2xl">
                    {/* Inner Content */}
                    <div className="absolute inset-4 bg-slate-800 rounded-xl p-6 border border-slate-700">
                      {/* Code Editor Header */}
                      <div className="flex items-center space-x-2 mb-6">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>

                      {/* Code Lines */}
                      <div className="space-y-3 font-mono text-sm">
                        <div className="flex space-x-2">
                          <span className="text-blue-400">const</span>
                          <span className="text-white">innovation</span>
                          <span className="text-purple-400">=</span>
                          <span className="text-green-400">'excellence'</span>
                        </div>
                        <div className="flex space-x-2">
                          <span className="text-blue-400">function</span>
                          <span className="text-yellow-400">transform</span>
                          <span className="text-white">()</span>
                          <span className="text-white">{"{"}</span>
                        </div>
                        <div className="ml-4 text-slate-400">
                          // Building the future
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <span className="text-purple-400">return</span>
                          <span className="text-green-400">'success'</span>
                        </div>
                        <div className="text-white">{"}"}</div>
                      </div>

                      {/* Tech Icons */}
                      <div className="mt-8 flex justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <Code className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-slate-800 border-y border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="group">
              <div className="text-5xl font-bold text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                150+
              </div>
              <div className="text-slate-300 text-lg font-medium">Projects</div>
              <div className="text-slate-500 text-sm">
                Successfully Delivered
              </div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                8.5k+
              </div>
              <div className="text-slate-300 text-lg font-medium">Clients</div>
              <div className="text-slate-500 text-sm">Worldwide Trust</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                99%
              </div>
              <div className="text-slate-300 text-lg font-medium">Success</div>
              <div className="text-slate-500 text-sm">Rate Achievement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Meet Our Team
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Our diverse team of experts combines creativity with technical
              excellence to deliver outstanding results for every project.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white group-hover:scale-105 transition-transform">
                  AS
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900"></div>
              </div>
              <h3 className="font-bold text-lg text-white mb-1">Alex Smith</h3>
              <p className="text-blue-400 text-sm font-medium mb-2">
                Lead Developer
              </p>
              <p className="text-slate-400 text-xs">
                Full-stack architect with 8+ years experience
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white group-hover:scale-105 transition-transform">
                  MJ
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900"></div>
              </div>
              <h3 className="font-bold text-lg text-white mb-1">
                Maria Johnson
              </h3>
              <p className="text-blue-400 text-sm font-medium mb-2">
                UI/UX Designer
              </p>
              <p className="text-slate-400 text-xs">
                Creative visionary specializing in user experience
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white group-hover:scale-105 transition-transform">
                  DL
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900"></div>
              </div>
              <h3 className="font-bold text-lg text-white mb-1">David Lee</h3>
              <p className="text-blue-400 text-sm font-medium mb-2">
                DevOps Engineer
              </p>
              <p className="text-slate-400 text-xs">
                Infrastructure and deployment specialist
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white group-hover:scale-105 transition-transform">
                  SW
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900"></div>
              </div>
              <h3 className="font-bold text-lg text-white mb-1">
                Sarah Wilson
              </h3>
              <p className="text-blue-400 text-sm font-medium mb-2">
                Project Manager
              </p>
              <p className="text-slate-400 text-xs">
                Agile methodology and client relations expert
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Clients Say */}
      <section className="px-6 py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-500 transition-colors">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Global Solutions</h3>
                  <p className="text-slate-400 text-sm">
                    Enterprise Development
                  </p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "CodeCollab transformed our legacy system into a modern, scalable
                platform. Their expertise in cloud architecture and
                microservices helped us achieve 99.9% uptime."
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mr-3"></div>
                <div>
                  <div className="text-white font-medium text-sm">
                    John Executive
                  </div>
                  <div className="text-slate-400 text-xs">CTO, GlobalTech</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-500 transition-colors">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Mobile Innovation</h3>
                  <p className="text-slate-400 text-sm">App Development</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "The mobile app they developed exceeded all our expectations.
                The user experience is seamless, and our customer engagement
                increased by 300% within the first quarter."
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mr-3"></div>
                <div>
                  <div className="text-white font-medium text-sm">
                    Lisa Manager
                  </div>
                  <div className="text-slate-400 text-xs">VP, InnovateCorp</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-500 transition-colors">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    Digital Transformation
                  </h3>
                  <p className="text-slate-400 text-sm">Consulting Services</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "Their consulting expertise guided our digital transformation
                journey. We reduced operational costs by 40% while improving our
                customer satisfaction scores significantly."
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mr-3"></div>
                <div>
                  <div className="text-white font-medium text-sm">
                    Mike Director
                  </div>
                  <div className="text-slate-400 text-xs">CEO, TechStart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 text-white">
            Ready to Level Up Your Digital Presence?
          </h2>
          <p className="text-xl mb-12 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into powerful digital solutions. Let's discuss
            how we can help accelerate your business growth through innovative
            technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-xl">
              Start Your Project
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105">
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
