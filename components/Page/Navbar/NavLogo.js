import Image from 'next/image';
import Link from 'next/link';

export default function NavLogo() {
  return (
    <div className="relative h-16 w-16 cursor-pointer">
      <Link href="/">
        <Image
          src="/blue.svg"
          layout="fill"
          objectFit="contain"
        />
      </Link>
    </div>
  );
}
