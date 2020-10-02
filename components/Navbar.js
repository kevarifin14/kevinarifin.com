import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

import styles from 'styles/Navbar.module.scss';

export default function Navbar({ showLogo }) {
  return (
    <div className={styles.nav}>
      <span style={{ opacity: showLogo ? 1 : 0 }}>
        <Link href="/">
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <img src="/blue.svg" className="h-12" style={{ marginBottom: '1em', marginTop: '1em' }} alt="logo" />
            <h2 className="whitespace-no-wrap my-4">Kevin Arifin</h2>
          </div>
        </Link>
      </span>

      <label htmlFor={styles.navToggle} className={styles.burgerMenu}>
        <FaBars />
      </label>
      <input type="checkbox" id={styles.navToggle} />
      <div className={styles.rightMenu}>
        <Link href="/blog"><a className={styles.navLink}>Blog</a></Link>
        <Link href="/tb"><a className={styles.navLink}>Newsletter</a></Link>
        <Link href="/bookshelf"><a className={styles.navLink}>Bookshelf</a></Link>
        <Link href="/about"><a className={styles.navLink}>About</a></Link>
      </div>

    </div>
  );
}
