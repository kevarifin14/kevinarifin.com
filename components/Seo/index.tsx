import { useMetadataContext } from "contexts/metadata";
import { DefaultSeo, DefaultSeoProps } from "next-seo";

export function Seo() {
  const { name, description, url } = useMetadataContext();

  const openGraph = {
    title: name,
    description,
    url,
    type: "website",
    images: [
      {
        url: `${url}/thumbnail.png`,
      },
    ],
  };

  const twitter = {
    site: name,
    handle: "@ThankYouTokens",
    cardType: "summary_large_image",
  };

  const seoProps: DefaultSeoProps = {
    title: name,
    description,
    openGraph,
    twitter,
  };

  return <DefaultSeo {...seoProps} />;
}
