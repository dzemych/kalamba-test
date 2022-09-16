import React, {FC, useContext, useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import useHttp from "../hooks/useHttp";
import {IArticle} from "../types/article";
import getDateString from "../utils/getDateString";
import user from "../assets/images/user.png";
import UserContext from "../context/UserContext";


const Article: FC = () => {
   const [article, setArticle] = useState<IArticle>({
      slug: '___',
      title: '___',
      description: '___',
      body: '___',
      tagList: [ '___' ],
      createdAt: new Date(),
      updatedAt: new Date,
      favorited: false,
      favoritesCount: 0,
      author: {
         username: '___',
         bio: '___',
         image: '___',
         following: false
      }
   })

   const { request } = useHttp()
   const { favorites, fetchFavorite, fetchFollow } = useContext(UserContext)

   const isFavorite = favorites.includes(article.slug)
   const favoriteCls = ["btn", "btn-sm", "btn-outline-primary"]

   if (isFavorite)
      favoriteCls.push('active')

   const followingCls = ["btn", "btn-sm", 'btn-outline-secondary']
   if (article.author.following)
      followingCls.push('active')

   const params = useParams<{slug: string}>()

   const followHandler = async () => {
      await fetchFollow(article.author.username, article.author.following)

      const response = await request('/articles/' + article.slug)
      setArticle(response.article)
   }

   const favoriteHandler = async () => {
      await fetchFavorite(article.slug)

      const response = await request('/articles/' + article.slug)
      setArticle(response.article)
   }

   const submitComment = (e: React.MouseEvent) => {
      e.preventDefault()
   }

   const fetchArticle = async (slug: string) => {
      const response = await request('/articles/' + slug)
      setArticle(response.article)
   }

   useEffect(() => {
      fetchArticle(params.slug)
   }, [])

   return (
      <>
         <div className="article-page">
            <div className="banner">
               <div className="container">
                  <h1>{article.title}</h1>

                  <div className="article-meta">
                     <Link to={'/profile/' + article.author.username}>
                        <img src={article.author.image || user} />
                     </Link>

                     <div className="info">
                        <Link to={'/profile/' + article.author.username}>
                           {article.author.username}
                        </Link>

                        <span className="date">
                           {getDateString(article.createdAt)}
                        </span>
                     </div>

                     <button
                        onClick={followHandler}
                        className={followingCls.join(' ')}
                     >
                        <i className={'ion-plus-round'} />
                        &nbsp; Follow {`${article.author.username} `}
                        <span className="counter">({article.author.following || 0})</span>
                     </button>

                     &nbsp;&nbsp;

                     <button
                        className={favoriteCls.join(' ')}
                        onClick={favoriteHandler}
                     >
                        <i className="ion-heart" />
                        &nbsp; Favorite Post{' '}
                        <span className="counter">({article.favoritesCount})</span>
                     </button>
                  </div>
               </div>
            </div>

            <div className="container page">
               <div className="row article-content">
                  <div className="col-md-12">
                     <p>{ article.description }</p>

                     <h2 id="introducing-ionic">{ article.title }</h2>

                     <p>{ article.body }</p>
                  </div>
               </div>

               <hr />

               <div className="article-actions">
                  <div className="article-meta">
                     <Link to={'/profile/' + article.author.username}>
                        <img src={article.author.image || user}/>
                     </Link>

                     <div className="info">
                        <Link to={'/profile/' + article.author.username}>
                           {article.author.username}
                        </Link>

                        <span className="date">{article.author.username}</span>
                     </div>

                     <button
                        onClick={followHandler}
                        className={followingCls.join(' ')}
                     >
                        <i className="ion-plus-round" />
                        &nbsp; Follow {article.author.username}
                     </button>

                     &nbsp;

                     <button
                        className={favoriteCls.join(' ')}
                        onClick={favoriteHandler}
                     >
                        <i className="ion-heart" />
                        &nbsp; Favorite Post{' '}
                        <span className="counter">({article.favoritesCount})</span>
                     </button>
                  </div>
               </div>

               <div className="row">
                  <div className="col-xs-12 col-md-8 offset-md-2">
                     <form className="card comment-form">
                        <div className="card-block">
                           <textarea
                              className="form-control"
                              placeholder="Write a comment..."
                              rows={3}
                           />
                        </div>

                        <div className="card-footer">
                           <img
                              src={user}
                              className="comment-author-img"
                           />

                           <button
                              className="btn btn-sm btn-primary"
                              onClick={submitComment}
                           >
                              Post Comment
                           </button>
                        </div>
                     </form>

                     <div className="card">
                        <div className="card-block">
                           <p className="card-text">
                              With supporting text below as a natural lead-in to
                              additional content.
                           </p>
                        </div>
                        <div className="card-footer">
                           <a
                              href="/home/boss/webstorm/job-assignment-frontend-engineer/public#/profile/jacobschmidt"
                              className="comment-author"
                           >
                              <img
                                 src="http://i.imgur.com/Qr71crq.jpg"
                                 className="comment-author-img"
                              />
                           </a>
                           &nbsp;
                           <a
                              href="/home/boss/webstorm/job-assignment-frontend-engineer/public#/profile/jacobschmidt"
                              className="comment-author"
                           >
                              Jacob Schmidt
                           </a>
                           <span className="date-posted">Dec 29th</span>
                        </div>
                     </div>

                     <div className="card">
                        <div className="card-block">
                           <p className="card-text">
                              With supporting text below as a natural lead-in to
                              additional content.
                           </p>
                        </div>
                        <div className="card-footer">
                           <a
                              href="/home/boss/webstorm/job-assignment-frontend-engineer/public#/profile/jacobschmidt"
                              className="comment-author"
                           >
                              <img
                                 src="http://i.imgur.com/Qr71crq.jpg"
                                 className="comment-author-img"
                              />
                           </a>
                           &nbsp;
                           <a
                              href="/home/boss/webstorm/job-assignment-frontend-engineer/public#/profile/jacobschmidt"
                              className="comment-author"
                           >
                              Jacob Schmidt
                           </a>
                           <span className="date-posted">Dec 29th</span>
                           <span className="mod-options">
                              <i className="ion-edit" />
                              <i className="ion-trash-a" />
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Article