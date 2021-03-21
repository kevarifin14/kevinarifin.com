import BookSpotlight from 'components/BookSpotlight';
import Page from 'components/Page';

export default function Bookshelf() {
  const inProgress = [
    {
      title: 'Crossing the Chasm',
      author: 'Geoffrey Moore',
    },
    {
      title: 'TCP/IP Illustrated',
      author: 'Kevin R. Fall & W. Richard Stevens',
    },
    {
      title: 'Return to the Little Kingdom',
      author: 'Michael Moritz',
    },
    {
      title: 'Caste',
      author: 'Isabel Wilkerson',
    },
    {
      title: 'The Half Has Never Been Told',
      author: 'Edward E. Baptist',
    },
  ];

  const books = [
    {
      title: 'Brave New World',
      author: 'Aldous Huxley',
    },
    {
      title: 'Troublemakers',
      author: 'Leslie Berlin',
    },
    {
      title: '12 Years a Slave',
      author: 'Solomon Northup',
      notes: 'https://www.notion.so/edithlabs/12-Years-a-Slave-04604b4674974dff8829d92e51b48fbb',
      recap: true,
    },
    {
      title: 'Joy on Demand',
      author: 'Chade-Meng Tan',
      notes: 'https://www.notion.so/kevinarifin/Joy-on-Demand-78a957078a694d1783731812da2ed692',
      recap: true,
    },
    {
      title: 'Winners Take All',
      author: 'Anand Giridharadas',
      notes: 'https://www.notion.so/kevinarifin/Winners-Take-All-23de06b089d94cb5ad368c3b7c4176f7',
      recap: true,
    },
    {
      title: 'The Accidental Superpower',
      author: 'Peter Zeihan',
    },
    {
      title: 'Limitless',
      author: 'Jim Kwik',
      recap: true,
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
      recap: true,
    },
    {
      title: 'Nudge',
      author: 'Richard H. Thaler',
      recap: true,
    },
    {
      title: 'Kochland',
      author: 'Christopher Leonard',
      recap: true,
    },
    {
      title: 'Digital Minimalism',
      author: 'Cal Newport',
      recap: true,
    },
    {
      title: 'Ride of a Lifetime',
      author: 'Bob Iger',
      recap: true,
    },
    {
      title: 'Good to Great',
      author: 'Jim Collins',
      recap: true,
    },
    {
      title: 'Shoe Dog',
      author: 'Phil Knight',
      recap: true,
    },
    {
      title: "The Innovator's Dilemma",
      author: 'Clayton M. Christensen',
      recap: true,
    },
    {
      title: 'The Everything Store',
      author: 'Brad Stone',
      recap: true,
    },
  ];

  return (
    <Page title="Bookshelf">
      <div className="max-w-screen-xl mx-8 xl:mx-auto mb-8 py-4">

        <h1 className="mb-4">In Progress</h1>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16"
          style={{ gridAutoRows: '1fr' }}
        >
          {inProgress.map((props) => <BookSpotlight className="col-span-1" {...props} />)}
        </div>

        <h1 className="mb-4">History</h1>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          style={{ gridAutoRows: '1fr' }}
        >
          {books.map((props) => <BookSpotlight className="col-span-1" {...props} />)}
        </div>
      </div>

    </Page>
  );
}
