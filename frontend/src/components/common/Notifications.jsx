import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

export default function Notifications() {
  const { notifications } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const totalNotifications = notifications.overdue.length + notifications.dueToday.length;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleNotifications}
        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="sr-only">View notifications</span>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </motion.button>
      {totalNotifications > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"
        ></motion.span>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {notifications.overdue.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-2 text-sm text-red-700 bg-red-100"
                >
                  <strong>Overdue:</strong>
                  <ul className="mt-1 list-disc list-inside">
                    {notifications.overdue.map((company) => (
                      <motion.li
                        key={company._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {company.name}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
              {notifications.dueToday.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-2 text-sm text-yellow-700 bg-yellow-100"
                >
                  <strong>Due Today:</strong>
                  <ul className="mt-1 list-disc list-inside">
                    {notifications.dueToday.map((company) => (
                      <motion.li
                        key={company._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {company.name}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
              {totalNotifications === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-2 text-sm text-gray-700"
                >
                  No notifications
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

