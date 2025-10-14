import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      <Header />
      <div className="absolute inset-0">
        <Image 
          src="/logo.png" 
          alt="Background Logo" 
          layout="fill" 
          objectFit="cover"
          style={{ filter: 'brightness(50%)', opacity: 0.4 }}
        />
      </div>
      <div className="z-10 flex flex-col items-center justify-center">
        <button
          onClick={() => router.push('/signup')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Accept & Continue
        </button>
      </div>
      <Footer />
    </div>
  );
}
