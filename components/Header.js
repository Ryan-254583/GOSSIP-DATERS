import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full bg-red-800 text-white shadow-md flex items-center justify-between px-6 py-3 sticky top-0 z-20">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="CUK Gossip" width={40} height={40} />
        <span className="font-bold text-xl">CUK Gossip</span>
      </div>

      {/* Navigation / Links */}
      <nav className="flex items-center gap-6 font-semibold">
        <Link href="/" className="hover:text-gray-300 transition">Home</Link>
        <a href="https://whatsapp.com/channel/0029VbAokMVAe5Vph56xEk42" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
          Follow us on WhatsApp
        </a>
        <Link href="/advertise" className="hover:text-gray-300 transition">Advertise</Link>
        <Link href="/terms" className="hover:text-gray-300 transition">Terms & Conditions</Link>
      </nav>
    </header>
  );
}
