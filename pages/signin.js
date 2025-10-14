import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push('/dashboard');
    });
    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50">
      {/* Watermark logo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/logo.png"
          alt="Logo"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(20%)', opacity: 0.4 }}
          placeholder="empty"
          priority
        />
      </div>

      <Header />

      <main className="z-10 relative flex flex-col items-center justify-center flex-1">
        <div className="w-full max-w-md p-6 bg-white rounded shadow flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-center text-black">Sign In</h1>
          {error && <p className="text-red-600 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="p-2 border rounded"/>
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="p-2 border rounded"/>

            <button type="submit" disabled={loading} className="px-6 py-2 bg-red-800 text-white rounded hover:bg-red-700 mt-2">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Don’t have an account?{' '}
            <Link href="/signup" className="text-red-800 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
