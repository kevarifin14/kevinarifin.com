import React, { createContext, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import ErrorNotificationIcon from './ErrorNotificationIcon';
import SuccessNotificationIcon from './SuccessNotificationIcon';

export const NotificationContext = createContext(null);

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { ...notification, id: uuid() },
    ]);
  });

  const addSuccessNotification = useCallback((notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        ...notification,
        icon: <SuccessNotificationIcon />,
        id: uuid(),
      },
    ]);
  });

  const addErrorNotification = useCallback((notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        ...notification,
        icon: <ErrorNotificationIcon />,
        id: uuid(),
      },
    ]);
  });

  const removeNotification = useCallback((notification) => {
    setNotifications(
      (prevNotifications) => prevNotifications.filter(({ id }) => id != notification.id),
    );
  });

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        addSuccessNotification,
        addErrorNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
