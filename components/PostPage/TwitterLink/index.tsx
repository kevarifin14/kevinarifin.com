type TwitterLinkProps = {
  handle: string;
};

export function TwitterLink({ handle }: TwitterLinkProps) {
  return (
    <a
      href={`https://twitter.com/${handle}`}
      target="_blank"
      rel="noreferrer"
    >{`@${handle}`}</a>
  );
}
