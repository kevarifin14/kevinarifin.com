import { Transition } from '@headlessui/react';
import React, { useEffect } from 'react';
import { HiX } from 'react-icons/hi';

import useNotifications from 'hooks/useNotifications';

export default function Notification({ notification }) {
  const { removeNotification } = useNotifications();
  const {
    id, icon, title, description,
  } = notification;

  useEffect(() => {
    const interval = setInterval(() => removeNotification(notification), 4000);
    return () => clearInterval(interval);
  }, [removeNotification, id]);

  const handleRemoveNotification = () => {
    removeNotification(notification);
  };

  return (
    <Transition
      key={id}
      show
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto overflow-hidden z-50"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">
              {title}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={handleRemoveNotification}
            >
              <span className="sr-only">Close</span>
              <HiX className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
}
