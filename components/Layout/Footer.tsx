import { useMetadataContext } from "contexts/metadata";

export function Footer() {
  const { name } = useMetadataContext();

  return (
    <footer className="prose mx-auto max-w-none py-8 dark:prose-invert">
      <p className="text-center">&copy; 2022 {name}. All rights reserved.</p>
    </footer>
  );
}
