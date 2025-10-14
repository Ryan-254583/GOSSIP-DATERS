import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (parseInt(age) < 18) {
      alert('You must be 18 or older to sign up.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

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

      <div className="relative z-10 flex flex-col flex-1 items-center justify-center p-6">
        <Header />

        <h2 className="text-3xl font-bold text-red-800 mb-6">Sign Up</h2>

        <div className="flex flex-col space-y-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800"
          />
          <button
            onClick={handleSignUp}
            className="bg-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-700 active:scale-95 transition transform text-lg"
          >
            Register
          </button>
        </div>

        <p className="mt-4 text-gray-700">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/signin')}
            className="text-red-800 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

        <Footer />
      </div>
    </div>
  );
}
