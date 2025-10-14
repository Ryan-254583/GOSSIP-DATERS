import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

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
      <div className="z-10 flex flex-col space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className="px-4 py-2 rounded-lg border"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="px-4 py-2 rounded-lg border"
        />
        <button 
          onClick={handleSignup} 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        <p className="text-sm">
          Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => router.push('/signin')}>Login</span>
        </p>
      </div>
      <Footer />
    </div>
  );
}
