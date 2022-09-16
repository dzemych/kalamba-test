import React, {FC} from "react";
import ArticleListItem from "./ArticleListItem";
import {IArticle} from "../types/article";


interface IProps {
   articles: IArticle[]
}

const ArticleList: FC<IProps> = ({ articles }) => {
   return <>
      {articles.map(article => (
         <ArticleListItem
            key={article.slug}
            fetchedArticle={article}
         />
      ))}
   </>
}

export default ArticleList