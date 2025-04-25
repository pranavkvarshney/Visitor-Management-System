"use client"
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';

// Client Marquee Component
const ClientMarquee = () => {
  const clientLogos = [
    '/sc1.png',
    '/sc2.png',
    '/sc3.png',
    '/sc4.png',
    '/sc5.png',
    '/sc6.png',
    '/sc8.png',
    '/sc9.png',
    '/sc10.png',
    '/sc11.png',
    '/sc15.png',
    '/sc16.png'
  ];

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 ">
          Trusted by Leading Organizations
        </h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee space-x-12 justify-center items-center">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 transition-all duration-300 ease-in-out opacity-100"
              >
                <Image
                  src={logo}
                  alt={`Client logo ${index + 1}`}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
            {clientLogos.map((logo, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-shrink-0  transition-all duration-300 ease-in-out opacity-70 hover:opacity-100"
              >
                <Image
                  src={logo}
                  alt={`Client logo ${index + 1}`}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Home Page Component
const Home = () => {
  const router = useRouter()
  const handleget = () => {
    router.push('/getstarted')
  }
  return (
    <>
      <Head>
        <title>VisitorPro - Streamline Visitor Management</title>
        <meta name="description" content="Efficient visitor management system for modern businesses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="light-mode pt-20">
        <section className="text-center py-20 ">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 ">
              Welcome to VisitorPro
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Streamline your visitor management process with our cutting-edge system.
            </p>
            <button
              onClick={handleget}
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center mx-auto space-x-2"
            >
              <span>Get Started</span>
              <span className="ml-2">→</span>
            </button>
          </div>
        </section>

        <section id="features" className="py-16 ">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center space-x-0 md:space-x-8">
              {[
                {
                  icon: '/im1.svg',
                  title: 'Easy Check-In',
                  description: 'Quick and efficient visitor registration process.'
                },
                {
                  icon: '/im2.svg',
                  title: 'Real-time Notifications',
                  description: 'Instant alerts for host when visitors arrive.'
                },
                {
                  icon: '/im3.svg',
                  title: 'Reporting & Analytics',
                  description: 'Comprehensive insights into visitor traffic.'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="text-center max-w-xs mb-8 md:mb-0 hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    className="mx-auto mb-4"
                    src={feature.icon}
                    height={100}
                    width={100}
                    alt={feature.title}
                    priority
                  />
                  <h3 className="text-xl font-semibold mb-2 ">
                    {feature.title}
                  </h3>
                  <p className="">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ClientMarquee />
    </>
  );
};

export default Home;