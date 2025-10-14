import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-6 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm">&copy; {new Date().getFullYear()} CUK Gossip. All rights reserved.</p>

      <div className="flex gap-4">
        <a href="https://whatsapp.com/channel/0029VbAokMVAe5Vph56xEk42" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition">
          WhatsApp
        </a>
        <Link href="/terms" className="hover:text-red-600 transition">Terms & Conditions</Link>
        <Link href="/advertise" className="hover:text-red-600 transition">Advertise</Link>
      </div>
    </footer>
  );
}
