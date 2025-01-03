'use client';
import { useState, useEffect } from 'react';
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

    if (error) {
        return (
            <div className="container mx-auto py-16 px-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Your Meetings</h2>
                {meetings.length > 0 ? (
                    <div className="space-y-4">
                        {meetings.map((meeting) => (
                            <div key={meeting.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <h3 className="text-xl font-semibold">{meeting.title}</h3>
                                <p className="text-gray-600">{meeting.time}</p>
                                {meeting.description && (
                                    <p className="text-gray-500 mt-2">{meeting.description}</p>
                                )}
                                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Join
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">
                        No upcoming meetings. 
                        <a href="/create-meeting" className="text-blue-500 hover:text-blue-600 ml-2">
                            Create one here
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}