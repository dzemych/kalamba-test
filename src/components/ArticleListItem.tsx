import React, {useContext, useState} from 'react'
import getDateString from "../utils/getDateString";
import {IArticle} from "../types/article";
import {Link} from "react-router-dom";
import user from "../assets/images/user.png";
import UserContext from "../context/UserContext";
import useHttp from "../hooks/useHttp";


interface IProps {
   fetchedArticle: IArticle
}

const ArticleListItem = ( { fetchedArticle }: IProps): JSX.Element => {
   const { request } = useHttp()

   const [article, setArticle] = useState(fetchedArticle)
   const { favorites, fetchFavorite } = useContext(UserContext)

   const isFavorite = favorites.includes(article.slug)

   const favoriteCls = ["btn", "btn-outline-primary", "btn-sm", "pull-xs-right"]

   const favoriteHandler = async () => {
      await fetchFavorite(article.slug)

      const response = await request('/articles/' + article.slug)
      setArticle(response.article)
   }

   if (isFavorite)
      favoriteCls.push('active')

   return (
      <div key={article.slug} className="article-preview">
         <div className="article-meta">
            <Link to={'/profile/' + article.author.username}  className="article-meta">
               <img src={article.author.image || user}  alt={'photo'}/>
            </Link>

            <div className="info">
               <Link to={'/profile/' + article.author.username} className="author">
                  {article.author.username}
               </Link>

               <span className="date">
                  {getDateString(article.createdAt)}
               </span>
            </div>

            <button
               className={favoriteCls.join(' ')}
               onClick={favoriteHandler}
            >
               <i className={'ion-heart'} /> &nbsp;
               {article.favoritesCount}
            </button>
         </div>

         <Link to={'/' + article.slug} className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
         </Link>
      </div>
   )
}

export default ArticleListItem