'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PlainHeader from '../components/PlainHeader';

interface Meeting {
  id: string;
  title: string;
  time: string;
  description?: string;
}

export default function DashboardPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('User');
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:5000/dashboard', {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.status === 401) {
          router.push('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        setMeetings(data.meetings || []);
        setUserName(data.username || 'User'); 
      } catch (err) {
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
          <div
          key={meeting.id}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 mb-8"
          >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{meeting.title}</h2>
          <p className="text-gray-600 mb-4">{meeting.time}</p>
          {meeting.description && (
            <p className="text-gray-500 mb-4">{meeting.description}</p>
          )}
          <a
            href="https://meet.google.com/new?hs=180&amp;authuser=0"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block px-4 py-2 bg-black text-white font-medium text-sm rounded-md hover:bg-gray-800 shadow-md transition"
          >
            Start Meeting
          </a>
          </div>
        ))}
        </div>
      ) : (
        <div className="flex flex-col items-center bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
        <p className="text-gray-600 text-lg mb-4">
          No upcoming meetings.{' '}
        </p>
        </div>
      )}
      </div>
    </>
  );
}
