import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContentPanel from './components/ContentPanel';
import CalendarPanel from './components/CalendarPanel';
import {
  fetchProfile,
  fetchCalendar,
  generateContent,
  schedulePost,
  API_BASE_URL
} from './services/apiService';
import './index.css';

const App = () => {
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [calendar, setCalendar] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('user_id');
    if (id) {
      setUserId(id);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchProfile(userId, setProfile);
      fetchCalendar(userId, setCalendar);
    }
  }, [userId]);

  const handleGenerateContent = async (topic, postType) => {
    await generateContent(userId, topic, postType, setNewPost, setLoading);
  };

  const handleSchedulePost = async (newPost, topic, postType) => {
    await schedulePost(userId, newPost, topic, postType, setNewPost, setCalendar, calendar);
    fetchCalendar(userId, setCalendar);
  };

  const handleCopyToClipboard = () => {
    if (newPost) {
      navigator.clipboard.writeText(newPost)
        .then(() => alert('Post copied to clipboard!'))
        .catch(err => console.error('Failed to copy text: ', err));
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white p-4 sm:p-8 font-sans">
      <div className="mx-auto max-w-6xl">
        <Header profile={profile} userId={userId} API_BASE_URL={API_BASE_URL} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContentPanel
            newPost={newPost}
            setNewPost={setNewPost}
            loading={loading}
            userId={userId}
            generateContent={handleGenerateContent}
            schedulePost={handleSchedulePost}
            copyToClipboard={handleCopyToClipboard}
          />
          <CalendarPanel
            calendar={calendar}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
          />
        </div>
      </div>
    </div>
  );
};

export default App;