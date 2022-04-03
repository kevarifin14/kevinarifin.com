import { MoonIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";

export function Gn() {
  const { setTheme } = useTheme();

  return (
    <button onClick={() => setTheme("dark")} className="space-x-2">
      <MoonIcon className="h-5 w-5" />
      <span>gn</span>
    </button>
  );
}
