import useNotifications from 'hooks/useNotifications';

import Notification from './Notification';

export default function NotificationOverlay() {
  const { notifications } = useNotifications();

  return (
    <div className="fixed max-w-sm w-full right-0 top-0 flex flex-col justify-end items-start space-y-4 pointer-events-none z-30 p-4">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />))}
    </div>
  );
}
