import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
        <Image src="/profiles/logo.svg" alt="PULP" width={100} height={50} className="mb-4" />
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

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">Scoring Methodology</h1>
        <p className="text-lg mb-6">Placeholder Text.</p>
        
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Pulp Internet Corporation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
