// frontend/src/services/apiService.js
const API_BASE_URL = 'http://127.0.0.1:5000';

const fetchProfile = async (id, setProfile) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user profile.');
    }
    const data = await response.json();
    setProfile({
      name: data.name,
      title: data.title || 'Profile title not set.',
      // --- CHANGE: Removed hardcoded connections and posts ---
      connections: null,
      recentPosts: null,
      imageUrl: 'https://placehold.co/100x100/A0AEC0/ffffff?text=JD'
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    setProfile(null);
  }
};

const fetchCalendar = async (id, setCalendar) => {
  try {
    const response = await fetch(`${API_BASE_URL}/calendar/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch calendar.');
    }
    const data = await response.json();
    setCalendar(data);
  } catch (error) {
    console.error('Error fetching calendar:', error);
    setCalendar([]);
  }
};

const generateContent = async (userId, topic, postType, setNewPost, setLoading) => {
  if (!userId || !topic) {
    alert('Please connect to LinkedIn and enter a topic.');
    return;
  }
  setLoading(true);
  setNewPost('Generating content...');

  try {
    const payload = {
      user_id: parseInt(userId),
      topic: topic,
      post_type: postType
    };
    const response = await fetch(`${API_BASE_URL}/generate-post/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate content from backend.');
    }
    const result = await response.json();
    setNewPost(result.content);
  } catch (error) {
    console.error('Error generating content:', error);
    setNewPost('Failed to generate content. Please ensure the backend server is running and try again.');
  } finally {
    setLoading(false);
  }
};

// frontend/src/services/apiService.js
// ... all your existing code ...

// frontend/src/services/apiService.js
const schedulePost = async (userId, newPost, topic, postType, setNewPost, setCalendar, calendar) => {
  if (!userId) {
    alert('Please connect to LinkedIn first.');
    return;
  }
  if (newPost && newPost.trim() !== '' && newPost !== 'Generating content...') {
    try {
      const payload = {
        user_id: parseInt(userId),
        content: newPost,
        scheduled_at: new Date().toISOString(),
        topic: topic,
        post_type: postType
      };
      const response = await fetch(`${API_BASE_URL}/schedule-post/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to schedule post.');
      }

      const newScheduledPost = await response.json();
      setCalendar([...calendar, newScheduledPost]);
      setNewPost('');
    } catch (error) {
      console.error('Error scheduling post:', error);
      alert('Failed to schedule post. Please try again.');
    }
  }
};


export {
  API_BASE_URL,
  fetchProfile,
  fetchCalendar,
  generateContent,
  schedulePost
};