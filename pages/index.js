import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background logo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/logo.png"
          alt="CUK Gossip Logo"
          className="w-full h-full object-cover opacity-40 filter brightness-50"
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col flex-1 items-center justify-center text-center p-6">
        <Header />

        <h1 className="text-4xl font-bold text-red-800 mb-6">Welcome to CUK Gossip</h1>
        <p className="text-gray-700 mb-8">
          CUK Gossip Dating Site is for users 18+ only.
        </p>

        <button
          onClick={() => router.push('/signup')}
          className="bg-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-700 active:scale-95 transition transform text-lg"
        >
          Accept & Continue
        </button>

        <Footer />
      </div>
    </div>
  );
}
