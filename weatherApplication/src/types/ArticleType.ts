type Article = {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string;
  source: Source;
};

type Source = {
  id: string | null;
  name: string;
};

export default Article;
