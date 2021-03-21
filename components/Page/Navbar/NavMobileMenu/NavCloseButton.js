import { HiOutlineX } from 'react-icons/hi';

import NavButton from '../NavButton';

export default function NavCloseButton({ onClick }) {
  return (
    <NavButton onClick={onClick}>
      <HiOutlineX className="h-6 w-6" />
    </NavButton>
  );
}
