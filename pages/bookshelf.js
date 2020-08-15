import Layout from 'components/Layout';
import BookSpotlight from 'components/BookSpotlight';

export default function Bookshelf() {
  const inProgress = [
    {
      title: 'Winners Take All',
      author: 'Anand Giridharadas',
    },
    {
      title: 'The Accidental Superpower',
      author: 'Peter Zeihan',
    },
  ];

  const books = [
    {
      title: 'Limitless',
      author: 'Jim Kwik',
      readingNotes: true,
    },
    {
      title: 'Technological Revolutions and Financial Capital',
      author: 'Carlota Perez',
    },
    {
      title: 'Heir to the Empire',
      author: 'Timothy Zahn',
    },
    {
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      slug: 'the-subtle-art-of-not-giving-a-f',
      readingNotes: true,
    },
    {
      title: 'Nudge',
      author: 'Richard H. Thaler',
      readingNotes: true,
    },
    {
      title: 'Kochland',
      author: 'Christopher Leonard',
      readingNotes: true,
    },
    {
      title: 'Digital Minimalism',
      author: 'Cal Newport',
      readingNotes: true,
    },
    {
      title: 'Ride of a Lifetime',
      author: 'Bob Iger',
      readingNotes: true,
    },
    {
      title: 'Good to Great',
      author: 'Jim Collins',
      readingNotes: true,
    },
    {
      title: 'Shoe Dog',
      author: 'Phil Knight',
      readingNotes: true,
    },
    {
      title: "The Innovator's Dilemma",
      author: 'Clayton M. Christensen',
      readingNotes: true,
    },
    {
      title: 'The Everything Store',
      author: 'Brad Stone',
      readingNotes: true,
    },
  ];

  return (
    <Layout title="Bookshelf" showLogo>
      <div className="max-w-screen-xl mx-8 md:mx-auto mb-8 py-4">
        <h1 className="mb-4">In Progress</h1>

        <div
          className="max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          style={{ gridAutoRows: '1fr' }}
        >
          {inProgress.map((props) => <BookSpotlight className="col-span-1" {...props} />)}
        </div>

        <h1 className="mb-4">History</h1>
        <div
          className="max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ gridAutoRows: '1fr' }}
        >
          {books.map((props) => <BookSpotlight className="col-span-1" {...props} />)}
        </div>
      </div>

    </Layout>
  );
}
