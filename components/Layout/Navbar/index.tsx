import { GmButton } from "./GmButton";

export function Navbar() {
  return (
    <nav className="mx-auto flex max-w-5xl flex-col px-4 pt-8">
      <GmButton className="self-end" />
    </nav>
  );
}
