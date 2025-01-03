'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LandingPageHeader from '../components/landing-page-header';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                router.push('/login'); // Redirect to login
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error('Error during signup:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <LandingPageHeader />
            <div className="container mx-auto py-16 flex justify-center">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}