// Define the type for the source object within an article
type Source = {
  id: string | null;
  name: string;
};

// Define the type for an individual article
type Article = {
  author: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  source: Source;
  url: string;
  urlToImage: string;
};

// Define the type for an array of articles
type NewsResponse = {
  articles: Article[];
};

export default NewsResponse;
