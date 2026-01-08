import React from 'react';

function App() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // Generating a dummy month structure (Start on Tuesday)
  const dates = Array.from({ length: 35 }, (_, i) => {
    const day = i - 1; // Shift to start on Tuesday
    return day > 0 && day <= 31 ? day : null;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">October 2026</h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded hover:bg-gray-100 border border-gray-300 text-gray-600">&lt;</button>
            <button className="p-2 rounded hover:bg-gray-100 border border-gray-300 text-gray-600">Today</button>
            <button className="p-2 rounded hover:bg-gray-100 border border-gray-300 text-gray-600">&gt;</button>
          </div>
        </div>

        {/* CALENDAR GRID */}
        {/* FUTURE BUG: Change 'grid-cols-7' to 'grid-cols-6' to destroy the calendar logic */}
        <div className="grid grid-cols-7 bg-gray-200 gap-px border-b border-gray-200">
          
          {/* Days of Week Header */}
          {days.map(day => (
            <div key={day} className="bg-gray-50 py-3 text-center text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {day}
            </div>
          ))}

          {/* Date Cells */}
          {dates.map((date, idx) => (
            <div key={idx} className="bg-white h-32 p-2 relative hover:bg-blue-50 transition group">
              
              {/* Date Number */}
              {date && (
                <span className={`block text-sm font-medium ${date === 24 ? 'text-white bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center' : 'text-gray-700'}`}>
                  {date}
                </span>
              )}

              {/* Event (Conditional) */}
              {date === 8 && (
                <div className="mt-2 text-xs bg-purple-100 text-purple-700 p-1 rounded border border-purple-200 truncate font-medium">
                  Project Kickoff
                </div>
              )}
              {date === 24 && (
                <div className="mt-2 text-xs bg-blue-100 text-blue-700 p-1 rounded border border-blue-200 truncate font-medium">
                  Thesis Defense
                </div>
              )}
               {date === 15 && (
                <div className="mt-2 text-xs bg-green-100 text-green-700 p-1 rounded border border-green-200 truncate font-medium">
                  Payday 💰
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;