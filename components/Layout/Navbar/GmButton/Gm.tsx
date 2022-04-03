import { SunIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";

export function Gm() {
  const { setTheme } = useTheme();

  return (
    <button onClick={() => setTheme("light")} className="space-x-2">
      <SunIcon className="h-5 w-5" />
      <span>gm</span>
    </button>
  );
}
