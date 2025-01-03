'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const meetRef = useRef(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log('Fetching dashboard data...'); // For debugging
        const response = await fetch('http://localhost:5000/dashboard', {
          method: 'GET',
          credentials: 'include', // This is crucial for sending cookies
          headers: {
            'Accept': 'application/json',
          },
        });

        console.log('Response status:', response.status); // For debugging

        if (response.status === 401) {
          console.log('Unauthorized, redirecting to login...'); // For debugging
          router.push('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        console.log('Dashboard data:', data); // For debugging
        setMeetings(data.meetings || []);
      } catch (err) {
        console.error('Dashboard error:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {meetings.length > 0 ? (
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="p-4 bg-white rounded shadow-md">
              <h2 className="text-xl font-semibold">{meeting.title}</h2>
              <p className="text-gray-600">{meeting.time}</p>
              <div className="TN bzz aHS-YH" style={{ marginLeft: '0px' }}>
                <div className="qj qr"></div>
                <div className="aio UKr6le">
                  <span className="nU false">
                    <a href="https://meet.google.com/new?hs=180&amp;authuser=0" target="_top" className="J-Ke n0" title="Start a meeting" aria-label="Start a meeting" draggable="false">Start a meeting</a>
                  </span>
                </div>
                <div className="nL aif"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming meetings. <a href="/create-meeting" className="text-blue-500">Create one here.</a></p>
      )}
    </div>
  );
}