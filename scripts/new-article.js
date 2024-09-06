const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

// Helper function to convert kebab-case to Title Case
const kebabToTitleCase = (str) => {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Get the kebab-case title from the command line arguments
const kebabTitle = process.argv[2];

if (!kebabTitle) {
  console.error('Please provide a title in kebab case as an argument.');
  process.exit(1);
}

// Convert the kebab case title to Title Case
const title = kebabToTitleCase(kebabTitle);

// Article details
const article = {
  author: 'Kevin Arifin',
  date: format(new Date(), 'yyyy-MM-dd'), // Today's date
  title: title,
  description: '', // Empty description to fill out later
};

// Metadata
const metadata = {
  title: article.title,
  description: article.description,
};

// Define the project root directory and folder path relative to it
const projectRoot = path.resolve(__dirname, '..'); // Assuming the script is in a subdirectory, move up one level
const folderPath = path.join(projectRoot, 'src', 'app', 'articles', kebabTitle);
const filePath = path.join(folderPath, 'page.mdx');

// MDX file content template
const mdxContent = `
import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  author: '${article.author}',
  date: '${article.date}',
  title: '${article.title}',
  description: '${article.description}',
}

export const metadata = {
  title: article.title,
  description: article.description,
}

export default (props) => <ArticleLayout article={article} {...props} />
`;

// Create the folder and file
fs.mkdir(folderPath, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating folder:', err);
    return;
  }

  // Write the MDX file
  fs.writeFile(filePath, mdxContent, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log(`Article created at: ${filePath}`);
    }
  });
});
