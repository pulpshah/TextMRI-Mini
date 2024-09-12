import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Home, AlignLeft, Tv2 } from 'lucide-react'
import Spline from '@splinetool/react-spline/next'

export default function CoverPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/XoPV7cqjaGQ0roYJ/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Black Overlay */}
        <div className="bg-black bg-opacity-80 py-4">
          <nav className="container mx-auto flex flex-col items-center px-4">
            <Image src="/profiles/logo.svg" alt="PULP" width={100} height={50} className="mb-4" />
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
              <Link href="/transcript" passHref>
                <button className="text-gray-400 hover:text-white text-sm sm:text-base px-4 py-2 rounded-md transition-colors duration-200">Interactive Transcript</button>
              </Link>
              <Link href="/highlights" passHref>
                <button className="text-gray-400 hover:text-white text-sm sm:text-base px-4 py-2 rounded-md transition-colors duration-200">Highlights</button>
              </Link>
              <Link href="/" passHref>
                <button className="text-gray-400 hover:text-white text-sm sm:text-base px-4 py-2 rounded-md transition-colors duration-200">Scoring Methods</button>
              </Link>                 
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
          <Image src="/profiles/logo.svg" alt="PULP Logo" width={200} height={100} className="mb-8 w-3/4 sm:w-auto" />
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 flex flex-col sm:flex-row items-center">
            <span className="bg-red-600 bg-opacity-50 px-4 py-2 rounded-lg mb-2 sm:mb-0">TRUMP</span>
            <span className="mx-4 hidden sm:inline">•</span>
            <span className="bg-blue-600 bg-opacity-50 px-4 py-2 rounded-lg">HARRIS</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8">Exploratory Data Analysis</p>

          {/* Score Card */}
          <div className="bg-gray-900 bg-opacity-80 p-4 sm:p-6 rounded-lg shadow-lg mb-8 w-full max-w-md">
            <h2 className="text-lg sm:text-xl mb-4">Score</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="bg-gray-800 p-4 rounded-lg relative w-full sm:w-auto">
                <p className="text-4xl sm:text-5xl font-bold">60</p>
                <p>Trump</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg relative w-full sm:w-auto">
                <div className="absolute -top-3 -left-3 w-10 h-10 sm:w-12 sm:h-12">
                  <Image
                    src="./profiles/golden_gavel.svg"
                    alt="Golden Gavel"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p className="text-4xl sm:text-5xl font-bold">66</p>
                <p className="relative inline-block">
                  <span className="relative z-10">Harris</span>
                  <span className="absolute inset-0 bg-yellow-400 opacity-20 blur-sm z-0"></span>
                  <span className="absolute inset-0 bg-yellow-400 opacity-20 blur-md z-0"></span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-400">Choose analysis view</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
              <Link href="/transcript" passHref>
                <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm sm:text-base">
                  <AlignLeft className="mr-2" size={18} />
                  View Transcript
                </button>
              </Link>
              <Link href="/highlights" passHref>
                <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm sm:text-base">
                  <Tv2
                    width={18}
                    height={18}
                    className="mr-2"
                  />
                  View Highlights
                </button>
              </Link>
            </div>
          </div>
        </main>

        {/* Bottom Black Overlay */}
        <div className="bg-black bg-opacity-80 py-4">
          <nav className="container mx-auto flex flex-col items-center px-4">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
              <button className="text-gray-400 hover:text-white text-sm sm:text-base px-4 py-2 rounded-md transition-colors duration-200">Who Shares Your Values?</button>
              <button className="text-gray-400 hover:text-white text-sm sm:text-base px-4 py-2 rounded-md transition-colors duration-200">Who Do You Think Won?</button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}