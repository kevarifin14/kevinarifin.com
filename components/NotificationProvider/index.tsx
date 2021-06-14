import { createContext, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { INotification } from 'components/Notification';

import ErrorNotificationIcon from './ErrorNotificationIcon';
import SuccessNotificationIcon from './SuccessNotificationIcon';

export type NotificationContextProps = {
  notifications: INotification[],
  addNotification: (notification: Omit<INotification, 'id'>) => void,
  addSuccessNotification: (notification: Omit<INotification, 'id'>) => void,
  addErrorNotification: (notification: Omit<INotification, 'id'>) => void,
  removeNotification: (notification: INotification) => void,
}

export const NotificationContext = createContext<NotificationContextProps>(null);

export default function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = useCallback((notification: INotification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { ...notification, id: uuid() },
    ]);
  }, [setNotifications]);

  const addSuccessNotification = useCallback((notification: INotification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        ...notification,
        icon: <SuccessNotificationIcon />,
        id: uuid(),
      },
    ]);
  }, [setNotifications]);

  const addErrorNotification = useCallback((notification: INotification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        ...notification,
        icon: <ErrorNotificationIcon />,
        id: uuid(),
      },
    ]);
  }, [setNotifications]);

  const removeNotification = useCallback((notification) => {
    setNotifications(
      (prevNotifications) => prevNotifications.filter(({ id }) => id !== notification.id),
    );
  }, [setNotifications]);

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
