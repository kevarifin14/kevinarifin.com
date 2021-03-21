import { useContext } from 'react';

import { NotificationContext } from '../components/NotificationProvider';

export default function useNotifications() {
  const notificationContext = useContext(NotificationContext);

  return notificationContext || { notifications: [] };
}
