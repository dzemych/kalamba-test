import React, {FC, useContext, useEffect, useState} from 'react'
import useHttp from "../hooks/useHttp";
import {useParams} from "react-router-dom";
import {IProfile} from "../types/profile";
import {IArticle} from "../types/article";
import ArticleList from "../components/ArticleList";
import user from '../assets/images/user.png'
import UserContext from "../context/UserContext";


const Profile: FC = () => {

   const [profile, setProfile] = useState<IProfile>({
      username: '___',
      bio: '___',
      image: '___',
      following: false
   })
   const [articles, setArticles] = useState<IArticle[]>([])

   const { request } = useHttp()
   const params = useParams<{username: string}>()
   const { fetchFollow } = useContext(UserContext)

   const followCls = ["btn", "btn-sm", "btn-outline-primary", "action-btn"]

   if (profile.following)
      followCls.push('active')

   const followHandler = async () => {
      await fetchFollow(profile.username, profile.following)

      const response = await request('/profiles/' + profile.username)
      setProfile(response.profile)
   }

   const fetchProfile = async (username: string) => {
      const response = await request('/profiles/' + username)
      setProfile(response.profile)
   }

   const fetchArticles = async (username: string) => {
      const response = await request(`/articles?author=${username}`)
      setArticles(response.articles)
   }

   // Fetch user data on load
   useEffect(() => {
      fetchProfile(params.username)
   }, [])

   // Fetch user articles on load
   useEffect(() => {
      fetchArticles(params.username)
   }, [])

   return (
      <>
         <div className="profile-page">
            <div className="user-info">
               <div className="container">
                  <div className="row">
                     <div className="col-xs-12 col-md-10 offset-md-1">
                        <img
                           src={profile.image || user}
                           className="user-img"
                        />

                        <h4>{profile.username}</h4>

                        <p>
                           {profile.bio}
                        </p>

                        <button
                           className={followCls.join(' ')}
                           onClick={followHandler}
                        >
                           <i className="ion-plus-round" />
                           &nbsp; Follow {profile.username}
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="container">
               <div className="row">
                  <div className="col-xs-12 col-md-10 offset-md-1">
                     <div className="articles-toggle">
                        <ul className="nav nav-pills outline-active">
                           <li className="nav-item">
                              <span className="nav-link active">
                                 My Articles
                              </span>
                           </li>
                        </ul>
                     </div>

                     <ArticleList articles={articles}/>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Profile