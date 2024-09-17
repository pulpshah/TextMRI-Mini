"use client";

import { useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = () => {
  const [isPasswordPopupOpen, setPasswordPopupOpen] = useState(true); // Initially open the password popup
  const [isEmailPopupOpen, setEmailPopupOpen] = useState(false); // Initially closed
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { title: 'Scoring Debates', content: 'Placeholder content for Scoring Debates.' },
    { title: 'References', content: 'Placeholder content for References.' },
    { title: 'Analytics', content: 'Placeholder content for Analytics.' },
  ];

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === '1234') {
      setIsPasswordCorrect(true);
      setPasswordPopupOpen(false);
      setEmailPopupOpen(true); // Open email popup after correct password
    } else {
      alert('Incorrect password, please try again.');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setIsEmailSubmitted(true);
      setEmailPopupOpen(false);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const handlePrevSection = () => {
    setCurrentSection((prev) => (prev === 0 ? sections.length - 1 : prev - 1));
  };

  const handleNextSection = () => {
    setCurrentSection((prev) => (prev === sections.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundImage: 'url(/images/pulp-background.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
      {/* Popup for Password Entry */}
      {isPasswordPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-3/4 sm:w-1/2 max-w-md relative">
            <div className="flex justify-center mb-6">
              <Image
                src="/profiles/logo.svg" 
                alt="Pulp"
                width={200}
                height={100}
              />
            </div>
            <h2 className="text-xl font-bold mb-4">Enter Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 mb-4 rounded-md border border-gray-600 bg-gray-700 text-white"
                placeholder="Enter password"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Popup for Email Entry */}
      {isEmailPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-3/4 sm:w-1/2 max-w-md relative">
            <div className="flex justify-center mb-6">
              <Image
                src="/profiles/logo.svg" 
                alt="Pulp Logo"
                width={200}
                height={100}
              />
            </div>
            <h2 className="text-xl font-bold mb-4">Enter Your Email</h2>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 mb-4 rounded-md border border-gray-600 bg-gray-700 text-white"
                placeholder="Enter your email"
                required
              />
              <p className="text-sm text-gray-400 mb-4">
                By entering your email, you agree to receive emails from us.
              </p>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                ENTER
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      {isPasswordCorrect && isEmailSubmitted && (
        <>
          <header className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" passHref>
                <Image
                  src="/profiles/logo.svg"
                  alt="PULP"
                  width={100}
                  height={50}
                  className="mb-4"
                />
              </Link>
              <nav className="space-x-4">
                <Link href="/transcript" className="text-gray-300 hover:text-white">
                  Interactive Transcript
                </Link>
                <Link href="/highlights" className="text-gray-300 hover:text-white">
                  Highlights
                </Link>
              </nav>
            </div>
          </header>

          <main className="container mx-auto p-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h1 className="text-4xl font-bold mb-4">Scoring Methodology</h1>
              <p className="text-lg mb-6">Placeholder Text.</p>
            </div>

            {/* Slider for Sections */}
            <div className="relative bg-gray-800 p-4 rounded-lg shadow-md mb-16">
              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
                  onClick={handlePrevSection}
                >
                  &lt;
                </button>

                <div className="flex-1 px-4">
                  <h2 className="text-xl font-semibold mb-2">{sections[currentSection].title}</h2>
                  <p className="text-gray-300 mb-4">{sections[currentSection].content}</p>
                </div>

                <button
                  className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
                  onClick={handleNextSection}
                >
                  &gt;
                </button>
              </div>
            </div>
          </main>

          <footer className="bg-gray-800 p-4 mt-32">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 Pulp Internet Corporation. All rights reserved.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Home;
