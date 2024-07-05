import { useState, useEffect } from "react";
import Article from "../../types/ArticleType";
import NewsResponse from "../../types/NewsResponse";
import "./NewsWidgit.scss";

const News = () => {
  const [searchTerm, setSearchTerm] = useState<string>("bitcoin");
  const [newsData, setNewsData] = useState<NewsResponse | undefined>();
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>();

  const accessNews = async (): Promise<Object> => {
    let url = "https://newsapi.org/v2/everything?";
    let key = `apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
    let q = `q=${searchTerm.toLowerCase()}&`;

    console.log(url + q + key);
    const response = await fetch(url + q + key);
    const responseData = await response.json();
    setNewsData(responseData);
    console.log("response data", responseData);

    let articleSelection: Article[] = [];
    if (responseData != undefined) {
      for (let i = 0; i < 6; i++) {
        if (responseData.articles[i].title == "[Removed]") {
          articleSelection[i] = responseData?.articles[6 + i];
        } else {
          articleSelection[i] = responseData.articles[i];
        }
      }
    }
    setDisplayedArticles(articleSelection);
    return responseData;
  };

  useEffect(() => {
    accessNews();
  }, []);

  return (
    <div className="newsSection">
      <div className="newsSection__search">
        <input type="text" defaultValue="search" onChange={(e) => setSearchTerm(e.target.value)}></input>
        <button onClick={() => accessNews()}>search</button>
      </div>
      <div className="newsList">
        {displayedArticles
          ? displayedArticles.slice(0, 4).map((article) => {
              return (
                <a href={article.url}>
                  <div className="newsItem">
                    <div className="newsItem__text">
                      <h1>{article.title}</h1>
                      <h2>{article.source.name}</h2>
                    </div>
                    <div className="newsItem__image">
                      <img src={article.urlToImage} />
                    </div>
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
