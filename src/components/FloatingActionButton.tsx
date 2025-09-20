import React from 'react';
import { useLocation } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const FloatingActionButton = () => {
  const location = useLocation();
  const { state, dispatch } = useAppContext();
  const { user } = state;
  
  // Only show on dashboard and attendance pages
  if (!['/'].includes(location.pathname)) {
    return null;
  }

  const handleQuickCheckIn = () => {
    if (user.isCheckedIn) {
      dispatch({ type: 'CHECK_OUT' });
    } else {
      dispatch({ type: 'CHECK_IN', method: 'location' });
    }
  };

  return (
    <button
      onClick={handleQuickCheckIn}
      className={`fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 ${
        user.isCheckedIn 
          ? 'bg-red-600 hover:bg-red-700' 
          : 'bg-yellow-600 hover:bg-yellow-700'
      } text-white`}
    >
      <Clock size={24} className="mx-auto" />
    </button>
  );
};

export default FloatingActionButton;