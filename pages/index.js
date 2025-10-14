import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    router.push('/signup');
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage: 'url("/logo.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(80%)',
      }}
    >
      <Header />

      <div className="flex flex-col items-center justify-center space-y-6 z-10 relative">
        <h1 className="text-white text-3xl font-bold">Welcome</h1>
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className={`px-6 py-3 text-white font-semibold rounded-lg transition ${
            isLoading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Please wait...' : 'Accept & Continue'}
        </button>
      </div>

      <Footer />
    </div>
  );
}
