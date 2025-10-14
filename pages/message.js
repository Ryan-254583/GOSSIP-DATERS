import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';
import Image from 'next/image';

export default function Message() {
  return (
    <div className="relative w-full h-screen">
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
      <div className="z-10 p-6">
        <ChatBox />
      </div>
      <Footer />
    </div>
  );
}
