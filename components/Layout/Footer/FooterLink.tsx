type FooterLinkProps = {
  Icon: any,
  href: string,
}

export default function FooterLink({ Icon, href }: FooterLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-gray-400 hover:text-gray-500 border-0 hover:bg-transparent"
    >
      <Icon className="h-6 w-6" />
    </a>
  );
}
