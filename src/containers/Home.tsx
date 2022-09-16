import React, {FC, useCallback, useEffect, useState} from 'react'
import useHttp from "../hooks/useHttp";
import {IArticle} from "../types/article";
import {Link} from "react-router-dom";
import ArticleList from "../components/ArticleList";


const Home: FC = () => {

   const tags = [
      'programming',
      'javascript',
      'emberjs',
      'angularjs',
      'react',
      'mean',
      'node',
      'rails'
   ]

   const [articles, setArticles] = useState<IArticle[]>([])

   const { request } = useHttp()

   const fetchArticles = useCallback(async () => {
      const response = await request('/articles')

      setArticles(response.articles)
   }, [request])

   useEffect(() => {
      fetchArticles()
   }, [fetchArticles])

   return (
      <>
         <div className="home-page">
            <div className="banner">
               <div className="container">
                  <h1 className="logo-font">conduit</h1>
                  <p>A place to share your knowledge.</p>
               </div>
            </div>

            <div className="container page">
               <div className="row">
                  <div className="col-md-9">
                     <div className="feed-toggle">
                        <ul className="nav nav-pills outline-active">
                           <li className="nav-item">
                              <Link to={'/'} className="nav-link disabled">
                                 Your Feed
                              </Link>
                           </li>
                           <li className="nav-item">
                              <Link to={'/'} className="nav-link active">
                                 Global Feed
                              </Link>
                           </li>
                        </ul>
                     </div>

                     <ArticleList articles={articles}/>
                  </div>

                  <div className="col-md-3">
                     <div className="sidebar">
                        <p>Popular Tags</p>

                        <div className="tag-list">
                           {tags.map(tag => (
                              <Link
                                 to="/"
                                 key={`${tag}-${Date.now()}`}
                                 className="tag-pill tag-default"
                              >
                                 {tag}
                              </Link>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Home