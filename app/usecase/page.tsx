'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UseCasePage() {
  const [companyName, setCompanyName] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('User not authenticated. Please log in.');
      }

      const response = await fetch('http://localhost:5000/usecasegenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ company_name: companyName }),
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || 'An error occurred while generating the use case.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">AI Use Case Generator</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Enter Company Name:
          </label>
          <input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., TechCorp"
            required
          />
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Use Case'}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {results && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Results for {results.company_name}:</h3>
            <div className="mt-4">
              <h4 className="font-semibold">Market Analysis:</h4>
              <p className="text-gray-700">{results.market_analysis}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">AI Use Cases:</h4>
              <p className="text-gray-700">{results.ai_use_cases}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Resources:</h4>
              <p className="text-gray-700">{results.resources}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
