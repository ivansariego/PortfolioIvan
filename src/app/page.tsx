"use client";

import Image from "next/image";
import '../app/globals.css';
import { useState, useEffect } from 'react';

interface Certificate {
  id: number;
  name: string;
  thumbnail: string;
  fullImage: string;
  issuer: string;
  dateIssued: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  status: string;
  images: string[];
  fullDescription: string;
  features: string[];
  github?: string;
  live?: string;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

    const openCertificateModal = (certificate: Certificate) => {
  setSelectedCertificate(certificate);
};

const closeCertificateModal = () => {
  setSelectedCertificate(null);
};

const openProjectModal = (project: Project) => {
  setSelectedProject(project);
};

const closeProjectModal = () => {
  setSelectedProject(null);
};

  useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isMobile) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleScroll = () => {
    const sections = ['home', 'about', 'certificates', 'experience', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        
        if (section === 'contact' && scrollPosition >= offsetTop - 200) {
          setActiveSection('contact');
          return;
        }
        else if (section !== 'contact') {
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            return;
          }
        }
      }
    }
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollPosition + windowHeight >= documentHeight - 100) {
      setActiveSection('contact');
    }
  };
  
  let scrollTimeout: NodeJS.Timeout | undefined;
  const throttledScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScroll, 10);
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('scroll', throttledScroll);
  
  handleScroll();
  document.documentElement.style.scrollBehavior = 'smooth';
  
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', checkMobile);
    window.removeEventListener('scroll', throttledScroll);
    clearTimeout(scrollTimeout);
  };
}, [isMobile]);

  const skills = [
    'C++', 'Java', 'C#', 'ReactJS', 'NextJS', 
    'Tailwind CSS', 'MySQL', 'Firebase', 'Android Studio', 
  ];

  const certificates = [
    {
      id: 1,
      name: 'C Programming Course Certificate',
      thumbnail: '/certificates/C.png',
      fullImage: '/certificates/C.png',
      issuer: 'Udemy',
      dateIssued: 'October 2024',
      description: 'The Complete C Programming Course for Basic to Expert'
    },
    {
      id: 2,
      name: 'C++ Programming Course Certificate',
      thumbnail: '/certificates/C++.png',
      fullImage: '/certificates/C++.png',
      issuer: 'Udemy',
      dateIssued: 'October 2024',
      description: 'The Complete C++ Programming Course from Basic to Expert'
    },
    {
      id: 3,
      name: 'React JS Course Certificate',
      thumbnail: '/certificates/ReactJS.png',
      fullImage: '/certificates/ReactJS.png',
      issuer: 'Udemy',
      dateIssued: 'October 2024',
      description: 'React.JS Crash Course: The Complete Course for Beginners'
    },
    {
      id: 4,
      name: 'Web Design Course Certificate',
      thumbnail: '/certificates/WebDesign.png',
      fullImage: '/certificates/WebDesign.png',
      issuer: 'Udemy',
      dateIssued: 'October 2024',
      description: 'Web Design Course with HTML CSS and Wordpress'
    },
    {
      id: 5,
      name: 'Microsoft Word Excel PowerPoint Course Certificate',
      thumbnail: '/certificates/MS Office.png',
      fullImage: '/certificates/MS Office.png',
      issuer: 'Udemy',
      dateIssued: 'October 2024',
      description: 'Complete Microsoft Word Excel PowerPoint Course'
    },
    {
      id: 6,
      name: 'Capstone Project Writing 1',
      thumbnail: '/certificates/Capstone Writing 1.png',
      fullImage: '/certificates/Capstone Writing 1.png',
      issuer: 'Holy Cross of Davao College Inc.',
      dateIssued: 'June 2024',
      description: 'MySQL and database design, optimization, and management'
    },
    {
      id: 7,
      name: 'Capstone Project Writing 2',
      thumbnail: '/certificates/Capstone Writing 2.png',
      fullImage: '/certificates/Capstone Writing 2.png',
      issuer: 'Holy Cross of Davao College Inc.',
      dateIssued: 'July 2024',
      description: 'MySQL and database design, optimization, and management'
    },
  ];

const projects = [
  {
    id: 1,
    title: 'Admin Panel Developer',
    description: 'Designed and built robust administrative panel for 5th CRG Website',
    tech: ['ReactJS', 'TailwindCSS', 'Firebase'],
    status: 'Completed',
    images: [
      '/projects/MainPage.png',
      '/projects/LoginPage.png',
      '/projects/Dashboard.png'
    ],
    fullDescription: 'Developed a comprehensive administrative panel for the 5th Civil Relations Group Website. The project included user management, content management system, real-time data visualization, and secure authentication. Built with modern React architecture and integrated with Firebase for backend services.',
    features: [
      'User Authentication & Authorization',
      'Real-time Data Management',
      'Responsive Design',
      'Content Management System',
      'Analytics Dashboard',
    ],
  },
  {
    id: 2,
    title: 'Frontend Developer, Server-side and Admin Panel Developer',
    description: 'Responsive Server-side and Admin Panel for Camarillo Dental Clinic',
    tech: ['HTML','ReactJS', 'CSS', 'mySQL', 'PHP'],
    status: 'Completed',
    images: [
      '/projects/DentalAD.png',
      '/projects/DentalList.png',
      '/projects/MedicalHistory.png'
    ],
    fullDescription: 'Complete web solution for Camarillo Dental Clinic including patient management system, appointment booking, treatment records, and administrative dashboard. Features responsive design and secure patient data management.',
    features: [
      'Patient Management System',
      'Treatment Records Management',
      'Responsive Web Design',
      'Admin Dashboard',
      'Secure Data Handling'
    ],
  },
  {
    id: 3,
    title: 'Frontend Developer',
    description: 'Designed interactive prototype and UI for AuGrow: An Augmented Reality Planner for Tomato Crop',
    tech: ['Android Studio', 'Figma'],
    status: 'Completed',
    images: [
      '/projects/Augrow1.png'
    ],
    fullDescription: 'AuGrow is an innovative augmented reality application designed to help farmers plan and visualize tomato crop layouts. The app uses AR technology to overlay virtual crop arrangements onto real farmland, helping optimize space utilization and crop yield.',
    features: [
      'Augmented Reality Visualization',
      'Crop Layout Planning',
      'Mobile-First Design',
      'Interactive Prototyping',
      'User-Friendly Interface',
      'Farming Optimization Tools'
    ],
  },
];
//Trigger
  const experience = [
    {
      role: 'Admin Panel - Web Developer',
      company: '5th Civil Relations Group, CRSAFP',
      period: 'March 2025 - June 2025',
      description: 'Specialized in Overall Admin Panel Frontend Design and Backend Development'
    },
  ];

  // Enhanced scroll function with multiple fallbacks
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Method 1: Native smooth scroll
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      
      // Fallback method for browsers that might not support smooth scroll
      setTimeout(() => {
        const navHeight = 80; // Approximate navbar height
        const elementPosition = element.offsetTop - navHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }, 50);
      
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }
        
        * {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .smooth-entrance {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .smooth-hover {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .glow-pulse {
          animation: glowPulse 4s ease-in-out infinite;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
        }
        
        .skill-hover {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .skill-hover:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 10px 30px -5px rgba(59, 130, 246, 0.3);
        }
        
        .button-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .button-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px -5px rgba(59, 130, 246, 0.4);
        }
        
        .nav-item {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 50%;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
        }
        
        .nav-item:hover::after,
        .nav-item.active::after {
          width: 100%;
        }
      `}</style>

      {/* Enhanced Animated Background - Desktop Only */}
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
          />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl glow-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-600/5 rounded-full blur-2xl glow-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl glow-pulse" style={{ animationDelay: '4s' }} />
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent smooth-hover hover:scale-110">
              ITS
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {['Home', 'About', 'Certificates', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`nav-item text-sm lg:text-base ${
                    activeSection === item.toLowerCase() ? 'text-blue-400 active' : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1 focus:outline-none smooth-hover hover:scale-110"
            >
              <div className={`w-5 h-0.5 bg-gray-300 transition-all duration-500 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`} />
              <div className={`w-5 h-0.5 bg-gray-300 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`} />
              <div className={`w-5 h-0.5 bg-gray-300 transition-all duration-500 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`} />
            </button>
          </div>

          {/* Enhanced Mobile Menu */}
          <div className={`md:hidden transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 space-y-3">
              {['Home', 'About', 'Certificates', 'Experience', 'Projects', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left py-3 px-2 rounded-lg transition-all duration-300 hover:text-blue-400 hover:bg-blue-500/10 ${
                    activeSection === item.toLowerCase() ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16">
        <div className="max-w-4xl mx-auto text-center smooth-entrance">
          <div className="mb-3 sm:mb-4">
            {/* Enhanced Larger Profile Image */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-2 sm:mb-3 relative floating-animation">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 via-cyan-500 to-purple-600 p-1 smooth-hover hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/40">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 smooth-hover">
                  <Image
                    src="/profile.JPG"
                    alt="Ivan T. Sariego - Full Stack Developer"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-600/20 blur-2xl glow-pulse" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent smooth-hover hover:scale-105 inline-block">
              Ivan T.
            </span>
            <br />
            <span className="text-white smooth-hover hover:scale-105 inline-block">Sariego</span>
          </h1>
          
          <p className="text-base sm:text-xl lg:text-2xl text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-4 smooth-entrance" style={{ animationDelay: '0.2s' }}>
            Full Stack Developer crafting innovative solutions with expertise in 
            <span className="text-blue-400 smooth-hover hover:text-cyan-400"> ReactJS, C#, NextJS </span> and modern web technologies
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 smooth-entrance" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full button-hover text-sm sm:text-base font-medium"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 sm:px-8 py-3 border border-blue-500 rounded-full button-hover hover:bg-blue-500/10 text-sm sm:text-base font-medium"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 smooth-entrance">
            About <span className="text-blue-400">Me</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1 smooth-entrance" style={{ animationDelay: '0.2s' }}>
              <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                I focus on creating secure, efficient applications and websites that contribute in solving real-world problems.
              </p>
              <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
               When I&apos;m not coding, you&apos;ll find me playing basketball, jogging, reading books, watching anime, or riding my motorcycle. I&apos;m always down for adventures and constantly exploring how technology can improve our daily lives and create meaningful impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a 
                  href="/Sariego.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-blue-600 rounded-lg button-hover text-sm sm:text-base font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Resume
                </a>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 sm:gap-6 smooth-entrance" style={{ animationDelay: '0.4s' }}>
              {[
                { value: '2+', label: 'Years Experience', color: 'blue' },
                { value: '4', label: 'Projects Completed', color: 'cyan' },
                { value: '7', label: 'Certifications', color: 'blue' },
                { value: '24/7', label: 'Available', color: 'cyan' }
              ].map((stat, index) => (
                <div key={index} className="bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-700 card-hover text-center" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 ${stat.color === 'blue' ? 'text-blue-400' : 'text-cyan-400'}`}>
                    {stat.value}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 smooth-entrance">
            My <span className="text-blue-400">Certificates</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {certificates.map((certificate, index) => (
              <div 
                key={certificate.id} 
                className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden card-hover group cursor-pointer smooth-entrance" 
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => openCertificateModal(certificate)}
              >
                <div className="h-48 sm:h-56 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                  <div className="w-full h-full flex items-center justify-center">
                    {/* Replace with actual certificate thumbnail */}
                    <div className="w-full h-full flex items-center justify-center p-4">
                    <Image
                      src={certificate.thumbnail}
                      alt={certificate.name}
                      width={200}
                      height={150}
                      className="w-full h-full object-cover rounded-lg"
                      onError={() => {
                        console.log('Image failed to load:', certificate.thumbnail);
                      }}
                    />
                  </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {certificate.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{certificate.issuer}</p>
                  <p className="text-gray-500 text-xs">{certificate.dateIssued}</p>
                </div>
              </div>
              
            ))}
          </div>
          {selectedCertificate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-400">
                      {selectedCertificate.name}
                    </h3>
                    <button 
                      onClick={closeCertificateModal}
                      className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="order-2 lg:order-1">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-semibold text-cyan-400 mb-2">Issuer</h4>
                          <p className="text-gray-300">{selectedCertificate.issuer}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-cyan-400 mb-2">Date Issued</h4>
                          <p className="text-gray-300">{selectedCertificate.dateIssued}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-cyan-400 mb-2">Description</h4>
                          <p className="text-gray-300 leading-relaxed">{selectedCertificate.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="order-1 lg:order-2">
                      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-600">
                        <div className="aspect-[4/3] flex items-center justify-center bg-gray-700/50 rounded-lg overflow-hidden">
                          <Image
                            src={selectedCertificate.fullImage}
                            alt={selectedCertificate.name}
                            width={600}
                            height={450}
                            className="w-full h-full object-contain"
                            onError={() => {
                              console.log('Modal image failed to load:', selectedCertificate.fullImage);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROJECT MODAL - SEPARATE FROM CERTIFICATE MODAL */}
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">
                        {selectedProject.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          selectedProject.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                          selectedProject.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {selectedProject.status}
                        </span>
                        <div className="flex gap-2">
                          {selectedProject.github && (
                            <a 
                              href={selectedProject.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              GitHub
                            </a>
                          )}
                          {selectedProject.live && (
                            <a 
                              href={selectedProject.live} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                            >
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={closeProjectModal}
                      className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="order-2 lg:order-1 space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-cyan-400 mb-3">Description</h4>
                        <p className="text-gray-300 leading-relaxed">{selectedProject.fullDescription}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-cyan-400 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index} className="text-gray-300 flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-cyan-400 mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((tech) => (
                            <span key={tech} className="px-3 py-1 text-sm bg-gray-700 rounded-lg text-gray-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="order-1 lg:order-2 space-y-4">
                      <h4 className="text-lg font-semibold text-cyan-400">Project Screenshots</h4>
                      {selectedProject.images && selectedProject.images.map((image, index) => (
                        <div key={index} className="bg-gray-900/50 rounded-xl p-4 border border-gray-600">
                          <div className="aspect-video flex items-center justify-center bg-gray-700/50 rounded-lg overflow-hidden">
                            <Image
                              src={image}
                              alt={`${selectedProject.title} screenshot ${index + 1}`}
                              width={600}
                              height={400}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-project.png'; // fallback image
                            }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showResumeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-bold text-blue-400">Ivan T. Sariego - Resume</h3>
                <div className="flex gap-2">
                  <a 
                    href="/resume.pdf" 
                    download="Ivan_Sariego_Resume.pdf"
                    className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                  >
                    Download
                  </a>
                  <button 
                    onClick={() => setShowResumeModal(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-[calc(90vh-80px)]">
                <iframe
                  src="/resume.pdf"
                  className="w-full h-full"
                  title="Ivan T. Sariego Resume"
                />
              </div>
            </div>
          </div>
        )}
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 smooth-entrance">
            Technical <span className="text-blue-400">Skills</span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className="bg-gray-800 p-3 sm:p-4 rounded-lg text-center skill-hover cursor-pointer group border border-gray-700 min-h-[60px] sm:min-h-[70px] flex items-center justify-center smooth-entrance"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-xs sm:text-sm font-medium group-hover:text-blue-400 transition-colors text-center leading-tight">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Experience Section */}
      <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 smooth-entrance">
            Professional <span className="text-blue-400">Experience</span>
          </h2>
          
          <div className="space-y-6 sm:space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-6 sm:pl-8 border-l-2 border-blue-500/30 smooth-entrance" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full glow-pulse" />
                <div className="bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-700 card-hover">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-1">{exp.role}</h3>
                  <p className="text-cyan-400 mb-1 sm:mb-2 text-sm sm:text-base">{exp.company}</p>
                  <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">{exp.period}</p>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 smooth-entrance">
            Featured <span className="text-blue-400">Projects</span>
          </h2>
          
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden card-hover group smooth-entrance cursor-pointer" 
              style={{ animationDelay: `${index * 0.15}s` }}
              onClick={() => openProjectModal(project)}
            >
              <div className="h-32 sm:h-48 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                {project.images && project.images[0] && (
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-project.png'; // fallback image
                  }}
                  />
                )}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <span className={`px-2 sm:px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                    project.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs bg-gray-700 rounded text-gray-300 smooth-hover hover:bg-blue-600/20 hover:text-blue-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
    {/* Enhanced Contact Section */}
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 smooth-entrance">
         Let&apos;s Work <span className="text-blue-400">Together</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 px-4 smooth-entrance" style={{ animationDelay: '0.2s' }}>
          From lines of code to winding trails, I&apos;m always chasing the next big adventure — ready when you are
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12 px-4 smooth-entrance" style={{ animationDelay: '0.4s' }}>
          {/* Updated Send Email button with Gmail integration */}
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ivansariego.dvo@gmail.com&su=Portfolio%20Inquiry&body=Hello%20Ivan,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss..."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl button-hover text-sm sm:text-base font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <span>Send Email</span>
          </a>
        </div>
        
        <div className="flex justify-center space-x-4 sm:space-x-6 smooth-entrance" style={{ animationDelay: '0.6s' }}>
          {[
            { name: 'FB', href: 'https://www.facebook.com/ivnsariego14', label: 'Facebook' },
            { name: 'LI', href: 'https://www.linkedin.com/in/ivnsariego', label: 'LinkedIn' }
          ].map((social, index) => {
            const isMailto = social.href.startsWith('mailto:');
            
            return (
              <a 
                key={social.name}
                href={social.href} 
                {...(!isMailto && { target: "_blank", rel: "noopener noreferrer" })}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-800 rounded-xl flex items-center justify-center smooth-hover hover:bg-blue-600 hover:scale-110 group touch-target"
                aria-label={social.label}
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <span className="text-gray-400 group-hover:text-white text-sm sm:text-base font-bold transition-colors duration-300">
                  {social.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>

      {/* Enhanced Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm sm:text-base smooth-entrance">
          <p>&copy; 2025 Ivan T. Sariego. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
