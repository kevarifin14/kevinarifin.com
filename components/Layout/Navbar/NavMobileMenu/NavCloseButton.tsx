import { HiOutlineX } from 'react-icons/hi';

import NavButton from '../NavButton';

type NavCloseButtonProps = {
  onClick: () => void
}

export default function NavCloseButton({ onClick }: NavCloseButtonProps) {
  return (
    <NavButton onClick={onClick}>
      <HiOutlineX className="h-6 w-6" />
    </NavButton>
  );
}
