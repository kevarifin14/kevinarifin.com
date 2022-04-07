import { useTheme } from "next-themes";
import Highlight, { defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import { ReactNode } from "react";
import { ReactElement } from "react";

type SyntaxHighlighterProps = {
  children?: ReactNode;
};

export function SyntaxHighlighter({ children }: SyntaxHighlighterProps) {
  const { theme } = useTheme();
  const highlightTheme = theme === "light" ? lightTheme : darkTheme;

  if (!children) return <></>;

  const code = (children as ReactElement).props.children;
  const language = (children as ReactElement).props.className
    ?.replace("language-", "")
    .trim();

  return (
    <div className="flex flex-col rounded overflow-hidden border border-light-dark dark:border-dark-light my-4">
      {language && (
        <div className="bg-light-dark dark:bg-dark-light">
          <p className="my-0 text-right px-2 py-1 text-sm">
            {language.toUpperCase()}
          </p>
        </div>
      )}
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={highlightTheme}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="my-0 rounded-none" style={style}>
            {tokens.slice(0, -1).map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={i} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
