import React from 'react';

function BlogFilter({
  active, value, label, onClick, className,
}) {
  return (
    <span
      className={[
        'py-1 px-4 cursor-pointer border border-solid border-blue rounded-md blog-filter',
        active == value ? 'bg-blue text-white' : 'text-blue',
        className,
      ].join(' ')}
      onClick={onClick}
    >
      {label}
    </span>
  );
}

export default BlogFilter;
