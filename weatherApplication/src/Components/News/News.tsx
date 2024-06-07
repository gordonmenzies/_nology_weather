import { useState, useEffect } from "react";
import NewsResponse from "../../types/NewsResponse";
import "./News.scss";

const News = () => {
  const [searchTerm, setSearchTerm] = useState<string>("bitcoin");
  const [newsData, setNewsData] = useState<NewsResponse | undefined>();

  const accessNews = async (): Promise<Object> => {
    let url = "https://newsapi.org/v2/everything?";
    let key = `apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
    let q = `q=${searchTerm.toLowerCase()}&`;

    console.log(url + q + key);
    const response = await fetch(url + q + key);
    const responseData = await response.json();
    setNewsData(responseData);
    console.log("response data", responseData);
    return responseData;
  };

  useEffect(() => {
    accessNews();
  }, []);

  return (
    <div className="newsSection">
      <div>
        <input type="text" defaultValue="search" onChange={(e) => setSearchTerm(e.target.value)}></input>
        <button onClick={() => accessNews()}>search</button>
      </div>
      <div className="newsList">
        {newsData
          ? newsData.articles.slice(0, 4).map((article) => {
              return (
                <a href={article.url}>
                  <div className="newsItem">
                    <h1>{article.title}</h1>
                    <h2>{article.source.name}</h2>
                    <img src={article.urlToImage} />
                  </div>
                </a>
              );
            })
          : " no news data"}
      </div>
    </div>
  );
};

export default News;
