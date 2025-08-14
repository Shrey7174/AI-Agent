import React, { useState } from 'react';
import { Plus, Share2, Clipboard } from 'lucide-react';

const ContentPanel = ({
  newPost,
  setNewPost,
  loading,
  userId,
  generateContent,
  schedulePost,
  copyToClipboard,
}) => {
  const [topic, setTopic] = useState('');
  const [postType, setPostType] = useState('text_update');

  const handleGenerateClick = () => {
    generateContent(topic, postType);
  };

  const handleScheduleClick = () => {
    schedulePost(newPost, topic, postType);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-xl h-fit">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Plus className="mr-2 text-indigo-400" />
        Generate New Post
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          placeholder="Enter a topic for your post..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={loading}
        />
        <select
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          disabled={loading}
        >
          <option value="text_update">Professional Update</option>
          <option value="quick_update">Quick Update</option>
          <option value="opinion_piece">Opinion Piece</option>
        </select>
        <textarea
          className="w-full h-40 p-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          placeholder="Your generated post will appear here..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          disabled={loading}
        />
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleGenerateClick}
            className="flex-1 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !userId || !topic}
          >
            {loading ? 'Generating...' : 'Generate Content'}
          </button>
          <button
            onClick={handleScheduleClick}
            className="flex-1 py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !newPost || !userId}
          >
            Schedule Post
          </button>
        </div>
        {newPost && (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
            <button
              onClick={copyToClipboard}
              className="flex-1 py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Clipboard className="inline mr-2" size={16} /> Copy
            </button>
            <a
              href={`https://www.linkedin.com/feed/update?text=${encodeURIComponent(newPost)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
            >
              <Share2 className="inline mr-2" size={16} /> Post Directly
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPanel;