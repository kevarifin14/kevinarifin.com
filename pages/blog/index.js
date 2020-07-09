import Layout from 'components/Layout';

export default function Blog() {
  return (
    <Layout title="Blog" showLogo>
      <div className="column">
        <p>
          Moving blog posts over soon...
        </p>
      </div>

      <style jsx>{`
        .column {
          max-width: 750px;
          margin: 0 auto;
          padding: 1em;
        }
      `}</style>
    </Layout>
  );
}