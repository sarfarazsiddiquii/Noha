'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PlainHeader from '../components/PlainHeader';

export default function DashboardPage() {
  interface Meeting {
    id: string;
    title: string;
    time: string;
  }

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('User');
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/dashboard', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          router.push('/login');
          return;
        }

        const data = await response.json();
        if (response.ok) {
          setMeetings(data.meetings || []);
          setUserName(data.username || 'User');
        } else {
          console.error('Error fetching dashboard data:', data);
          setError(data.error || 'Failed to load dashboard data');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <PlainHeader />
      <div className="container mx-auto py-20 px-14">
        <div className="bg-black text-white rounded-lg p-10 shadow-lg mb-12">
          <h1 className="text-4xl font-bold">Welcome, {userName} 👋</h1>
          <p className="mt-2 text-lg">Here’s a quick look at your upcoming meetings:</p>
        </div>
        {error && <p className="text-red-500 mb-6">{error}</p>}
        {meetings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{meeting.title}</h2>
                <p>{meeting.time}</p>
                <button
                className="mt-4 ml-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                onClick={() => window.open('https://meet.google.com/new', '_blank')}
                >
                Join Meet
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No upcoming meetings.</p>
        )}
      </div>
    </>
  );
}