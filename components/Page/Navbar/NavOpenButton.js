import { HiOutlineMenu } from 'react-icons/hi';

import NavButton from './NavButton';

export default function NavOpenButton({ onClick }) {
  return (
    <NavButton onClick={onClick}>
      <HiOutlineMenu className="h-6 w-6" />
    </NavButton>
  );
}
