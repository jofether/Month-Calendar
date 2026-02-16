import React, { useState } from 'react';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 16)); // February 16, 2026
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({
    '2026-02-03': [{ title: 'Project Planning Meeting', time: '10:00 AM', color: 'blue' }],
    '2026-02-08': [{ title: 'Client Presentation', time: '2:00 PM', color: 'purple' }],
    '2026-02-12': [
      { title: 'Team Lunch', time: '12:00 PM', color: 'green' },
      { title: 'Design Review', time: '3:00 PM', color: 'orange' }
    ],
    '2026-02-16': [{ title: 'Today - Development Sprint', time: 'All Day', color: 'red' }],
    '2026-02-22': [{ title: 'Product Launch', time: '11:00 AM', color: 'indigo' }],
    '2026-02-25': [{ title: 'Team Retrospective', time: '4:00 PM', color: 'pink' }],
  });

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(2026, 1, 16)); // Current date Feb 16, 2026
  };

  const getDateStr = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.toISOString().split('T')[0];
  };

  const isToday = (day) => {
    const today = new Date(2026, 1, 16);
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700 border-blue-300',
    purple: 'bg-purple-100 text-purple-700 border-purple-300',
    green: 'bg-green-100 text-green-700 border-green-300',
    orange: 'bg-orange-100 text-orange-700 border-orange-300',
    red: 'bg-red-100 text-red-700 border-red-300',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    pink: 'bg-pink-100 text-pink-700 border-pink-300',
  };

  const upcomingEvents = [];
  Object.entries(events).forEach(([dateStr, dayEvents]) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const eventDate = new Date(year, month - 1, day);
    const today = new Date(2026, 1, 16);
    if (eventDate >= today) {
      dayEvents.forEach(event => {
        upcomingEvents.push({ ...event, date: eventDate });
      });
    }
  });
  upcomingEvents.sort((a, b) => a.date - b.date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 font-sans">
      {/* [BUG - LAYOUT] Changed grid-cols-1 lg:grid-cols-4 to grid-cols-1 lg:grid-cols-3, breaking sidebar alignment */}
      {/* [FIX] Change className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6" to lg:grid-cols-4 */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MAIN CALENDAR */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            
            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-white">
                    {monthNames[currentDate.getMonth()]}
                  </h1>
                  <p className="text-blue-100 mt-2">{currentDate.getFullYear()}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={previousMonth}
                    className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 hover:shadow-lg z-0"
                  >
                    ←
                  </button>
                  <button
                    onClick={goToToday}
                    className="px-6 py-3 rounded-lg bg-blue-5 hover:bg-blue-600 text-white font-medium transition-all duration-200 hover:shadow-lg"
                  >
                    Today
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 hover:shadow-lg"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* DAY HEADERS */}
            <div className="grid grid-cols-7 bg-slate-100 gap-px border-b border-slate-200">
              {dayNames.map(day => (
                <div key={day} className="py-4 text-center text-sm font-bold text-slate-700 uppercase tracking-wide">
                  {day}
                </div>
              ))}
            </div>

            {/* CALENDAR GRID */}
            {/* [BUG - LAYOUT] Changed grid-cols-7 to grid-cols-6, breaking the 7-day week layout */}
            {/* [FIX] Change className="grid grid-cols-6 gap-px bg-slate-200 p-px" to grid-cols-7 */}
            <div className="grid grid-cols-6 gap-px bg-slate-200 p-px">
              {calendarDays.map((day, idx) => {
                const dateStr = day ? getDateStr(day) : null;
                const dayEvents = dateStr ? (events[dateStr] || []) : [];
                const today = isToday(day);

                return (
                  <div
                    key={idx}
                    onClick={() => day && setSelectedDate(day)}
                    className={`min-h-32 p-3 -m-2 transition-all duration-200 cursor-pointer ${
                      day
                        ? 'bg-white hover:bg-blue-50 hover:shadow-md'
                        : 'bg-slate-50'
                    } ${today ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
                  >
                    {/* [BUG - SPACING] Added negative margin (-m-2) causing severe overlap with adjacent cells */}
                    {/* [FIX] Remove -m-2 from className above */}
                    {day && (
                      <>
                        <div className={`text-sm font-bold mb-2 ${
                          today ? 'text-red-600 text-lg' : 'text-slate-700'
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event, i) => (
                            <div
                              key={i}
                              className={`text-xs px-2 py-1 rounded font-medium border truncate ${colorClasses[event.color]}`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-slate-500 px-2 font-medium">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* UPCOMING EVENTS */}
          {/* [BUG - COLOR & CONTRAST] Changed h2 text color to light gray (text-slate-300) making it barely visible on white background */}
          {/* [FIX] Change text-slate-300 back to text-slate-800 */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-slate-300 mb-4 flex items-center gap-2">
              🕐
              Upcoming Events
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {upcomingEvents.slice(0, 6).map((event, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border-l-4 ${colorClasses[event.color]} bg-opacity-50`}
                >
                  <p className="font-semibold text-sm">{event.title}</p>
                  <p className="text-xs mt-1 opacity-75">
                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-xs mt-1 opacity-75">{event.time}</p>
                </div>
              ))}
              {upcomingEvents.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-8">No upcoming events</p>
              )}
            </div>
          </div>

          {/* QUICK STATS */}
          {/* [BUG - TYPO] Changed rounded-2xl to rounded-1xl (invalid Tailwind class) making corners not round */}
          {/* [FIX] Change rounded-1xl back to rounded-2xl */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-1xl shadow-xl p-6 text-white">
            <h3 className="font-bold text-lg mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="opacity-90">Total Events</span>
                <span className="text-2xl font-bold">{Object.values(events).flat().length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-90">Days Left</span>
                <span className="text-2xl font-bold">{daysInMonth - 16}</span>
              </div>
              <div className="h-px bg-blue-400 my-2"></div>
              <p className="text-sm opacity-75 mt-4">Keep track of your important dates and events</p>
            </div>
          </div>

          {/* TIPS */}
          {/* [BUG - COLOR & CONTRAST] Changed background color and text color to low-contrast combination (amber-100 text on bg-amber-50) */}
          {/* [FIX] Change text-amber-900 to text-amber-950 or bg-amber-50 to bg-amber-100 */}
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4">
            <p className="text-sm font-semibold text-amber-100">Tip</p>
            <p className="text-xs text-amber-100 mt-2">Click on any date to see more details or add new events</p>
          </div>
        </div>
      </div>

      {/* SELECTED DATE MODAL */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* [BUG - LAYERS] Modal positioned with relative instead of fixed, causing it to not center properly */}
          {/* [FIX] Change relative to absolute positioning or ensure fixed is applied */}
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in relative -top-32">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-slate-800">
                {monthNames[currentDate.getMonth()]} {selectedDate}
              </h3>
              <button
                onClick={() => setSelectedDate(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 h-px bg-slate-200"></div>

            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {(events[getDateStr(selectedDate)] || []).map((event, idx) => (
                <div key={idx} className={`p-4 rounded-lg border-l-4 ${colorClasses[event.color]}`}>
                  <p className="font-semibold">{event.title}</p>
                  {/* [BUG - SPACING] Removed padding (p-4) with only p-0, causing text to touch borders */}
                  {/* [FIX] Change p-0 back to p-4 */}
                  <div className="flex items-center gap-2 mt-2 text-sm opacity-75 p-0">
                    ⏰
                    {event.time}
                  </div>
                </div>
              ))}
              {(!events[getDateStr(selectedDate)] || events[getDateStr(selectedDate)].length === 0) && (
                <p className="text-slate-500 text-center py-8">No events scheduled</p>
              )}
            </div>

            <button
              onClick={() => setSelectedDate(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;