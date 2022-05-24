import toast, { Toast } from "react-hot-toast";
import { HiX } from "react-icons/hi";

import { Header, HeaderProps } from "components/Header";

import { classNames } from "lib/tailwind";

export type NotificationProps = HeaderProps & {
  t: Toast;
};

export const renderNotification = (
  notificationProps: Omit<NotificationProps, "t">
) => {
  toast.custom((t) => <Notification t={t} {...notificationProps} />);
};

export function Notification({
  title,
  description,
  t,
  cta,
  ctaOnClick,
}: NotificationProps) {
  const notificationClassName = classNames(
    "max-w-md w-full dark:bg-dark-light bg-light-dark rounded-lg pointer-events-auto flex items-center z-20 border border-light-accent dark:border-dark-accent p-4 space-x-2",
    "prose dark:prose-invert"
  );

  return (
    <div className={notificationClassName}>
      <div className="flex-1">
        <Header
          size="xs"
          vertical
          title={title}
          description={description}
          cta={cta}
          ctaOnClick={ctaOnClick}
        />
      </div>

      <button onClick={() => toast.dismiss(t.id)}>
        <HiX className="h-5 w-5" />
      </button>
    </div>
  );
}
