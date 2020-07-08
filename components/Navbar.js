import Link from 'next/link';

function Navbar({ showLogo }) {
  return (
    <>
      <div className="nav">
        {showLogo
          ? <Link href="/">
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <img src="/blue.svg" height={50} />
                <h1>Kevin Arifin </h1>
              </div>
            </Link>
          : <span />}

        <span style={{ minHeight: '86px' }}/>

        <span />
        <span />
        <span />

        {/* <span className="nav-child">
          <Link href="/tb"><a>Newsletters</a></Link>
        </span>

        <span className="nav-child">
          <Link href="/tb"><a>Blog</a></Link>
        </span>

        <span className="nav-child">
          <Link href="/tb"><a>About</a></Link>
        </span> */}

      </div>
      <style jsx>{`
        .nav {
          display: grid;
          grid-template-columns: auto 1fr auto auto auto;
        }
        .nav-child {
          margin: 1em;
          display: flex;
          align-items: center;
        }
        a {
          text-decoration: none;
          color: black;
          font-size: 125%;
        }
      `}</style>
    </>
  );
}

export default Navbar;
