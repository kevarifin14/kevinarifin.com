import { FaBars } from 'react-icons/fa';

import Link from 'next/link';
import styles from './Navbar.module.scss';

function Navbar({ showLogo }) {
  return (
    <div className={styles.nav}>
      {/* {showLogo
        ? <Link href="/">
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <img src="/blue.svg" height={50} />
              <h1 style={{ whiteSpace: 'nowrap' }}>Kevin Arifin </h1>
            </div>
          </Link>
        : <span />}
 */}

      <Link href="/">
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <img src="/blue.svg" height={50} />
          <h1 style={{ whiteSpace: 'nowrap' }}>Kevin Arifin </h1>
        </div>
      </Link>

      <label for={styles.navToggle} className={styles.burgerMenu}>
        <FaBars />
      </label>
      <input type="checkbox" id={styles.navToggle} />
      <div className={styles.rightMenu}>
        <Link href="/blog"><a className={styles.navLink}>Blog</a></Link>
        <Link href="/tb"><a className={styles.navLink}>Newsletter</a></Link>
      </div>

    </div>
  );
}

export default Navbar;
