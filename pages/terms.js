import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  const router = useRouter();

  const handleAccept = () => {
    localStorage.setItem('acceptedTerms', 'true');
    router.push('/signup');
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Image src="/logo.png" width={500} height={500} alt="Logo" />
      </div>

      <Header />

      <div className="z-10 relative max-w-md p-6 text-center bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-4 text-primaryBlack">Terms & Conditions</h1>
        <p className="mb-6 text-gray-700">
          CUK Gossip Dating Site is an independent entity. Users are independent from the management. 
          This site is not for anyone under 18. The admins are not accountable for any issues arising 
          from usage. By clicking “Accept,” you agree to these terms.
        </p>
        <button
          onClick={handleAccept}
          className="px-6 py-2 bg-primaryRed text-white rounded hover:bg-secondaryRed"
        >
          Accept
        </button>
      </div>

      <Footer />
    </div>
  );
}
