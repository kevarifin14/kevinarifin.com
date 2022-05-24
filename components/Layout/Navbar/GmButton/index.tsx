import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";

import { classNames } from "lib/tailwind";

type GmButtonProps = {
  className?: string;
};

export function GmButton({ className }: GmButtonProps) {
  const { theme, setTheme } = useTheme();

  const lightOptions = {
    icon: MoonIcon,
    text: "gn",
    onClick: () => setTheme("dark"),
  };

  const darkOptions = {
    icon: SunIcon,
    text: "gm",
    onClick: () => setTheme("light"),
  };

  let options = theme === "light" ? lightOptions : darkOptions;

  const gmButtonClassName = classNames(
    "flex items-center justify-center space-x-1 prose dark:prose-invert hover:text-primary",
    className
  );

  return (
    <button onClick={options.onClick} className={gmButtonClassName}>
      <options.icon className="h-6 w-6" />
      <p className="my-0">{options.text}</p>
    </button>
  );
}
