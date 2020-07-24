import React from 'react';
import { colors } from 'utils';

function BlogFilter({
  active, value, label, onClick,
}) {
  return (
    <>
      <span className="blog-filter" onClick={onClick}>
        {label}
      </span>
      <style jsx>
        {`
        .blog-filter {
          padding: 0.25em 1em;
          margin: 0 0.5em;
          cursor: pointer;
          background-color: ${active == value && colors.blue};
          color: ${active == value ? 'white' : colors.blue};
          border: 1px solid ${colors.blue};
          border-radius: 5px;
        }
      `}
      </style>
    </>
  );
}

export default BlogFilter;
