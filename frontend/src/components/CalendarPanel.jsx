// frontend/src/components/CalendarPanel.jsx
import React from 'react';
import { Calendar, ArrowDown } from 'lucide-react';

const CalendarPanel = ({ calendar, showCalendar, setShowCalendar }) => (
  <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold flex items-center">
        <Calendar className="mr-2 text-indigo-400" />
        Content Calendar
      </h2>
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="p-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowDown size={24} className={`${showCalendar ? '' : '-rotate-90'} transition-transform duration-300`} />
      </button>
    </div>
    {showCalendar && (
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {calendar.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No posts scheduled yet. Generate and schedule one!</p>
        ) : (
          calendar.map((post) => (
            <div key={post.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-300">
                  {new Date(post.scheduled_at).toLocaleString()}
                </p>
                {}
                {post.is_scheduled === 0 ? (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-500 text-white">Published</span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-500 text-white">Scheduled</span>
                )}
              </div>
              <p className="text-sm text-gray-200 leading-relaxed">{post.content.substring(0, 150)}...</p>
            </div>
          ))
        )}
      </div>
    )}
  </div>
);

export default CalendarPanel;