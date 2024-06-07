import { useState } from "react";
import NewsResponse from "../../types/NewsResponse";
import "./News.scss";

type NewsProps = {
  newsData: NewsResponse | undefined;
  submitInput: (input: HTMLInputElement) => string;
};

const News = ({ newsData, submitInput }: NewsProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div className="newsSection">
      <div>
        <input type="text" defaultValue="search" onChange={(e) => setSearchTerm(e.target.value)}></input>
        <button onClick={() => submitInput}>search</button>
      </div>
      <div className="newsList">
        {newsData
          ? newsData.articles.slice(0, 4).map((article) => {
              return (
                <div className="newsItem">
                  <h1>{article.title}</h1>
                  <h2>{article.source.name}</h2>
                  <img src={article.urlToImage} />
                </div>
              );
            })
          : " no news data"}
      </div>
    </div>
  );
};

export default News;
