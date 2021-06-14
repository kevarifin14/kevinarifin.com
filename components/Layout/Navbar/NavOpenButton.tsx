import { HiOutlineMenu } from 'react-icons/hi';

import NavButton from './NavButton';

type NavOpenButtonProps = {
  onClick: () => void,
}

export default function NavOpenButton({ onClick }: NavOpenButtonProps) {
  return (
    <NavButton onClick={onClick}>
      <HiOutlineMenu className="h-6 w-6" />
    </NavButton>
  );
}
