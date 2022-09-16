import {useEffect, useState} from "react";
import useHttp from "./useHttp";
import {useHistory} from "react-router-dom";
import {IArticle} from "../types/article";


const useUser = () => {
   const { request } = useHttp()
   const history = useHistory()

   const [email, setEmail] = useState('')
   const [token, setToken] = useState('')
   const [username, setUsername] = useState('')
   const [favorites, setFavorites] = useState([''])

   const login = (email: string, token: string, username: string) => {
      setEmail(email)
      setToken(token)
      setUsername(username)

      localStorage.setItem('kalambaUser', JSON.stringify({ email, token, username }))
   }

   const logout = () => {
      setEmail('')
      setToken('')

      localStorage.removeItem('kalambaUser')
   }

   const fetchFavorite = async (slug: string) => {
      if (!token) {
         history.push('/login')
         return
      }

      if (favorites.includes(slug)) {
         const response = await request(
            `/articles/${slug}/favorite`,
            'DELETE',
            null,
            {'Authorization': 'Token: ' + token}
         )

         if (response)
            setFavorites(prev => prev.filter(val => val !== slug))
      } else {
         const response = await request(
            `/articles/${slug}/favorite`,
            'POST',
            null,
            {'Authorization': 'Token: ' + token}
         )

         if (response)
            setFavorites(prev => [...prev, slug])
      }
   }

   const fetchCurrentUser = async (savedToken: string) => {
      const response = await request(
         '/user',
         'GET',
         null,
         {'Authorization': 'Token: ' + savedToken}
      )

      if (response) {
         const {token, email, username} = response.user
         setToken(token)
         setEmail(email)
         setUsername(username)
      }
   }

   const fetchUserFavorites = async (username: string) => {
      const response = await request('/articles?favorited=' + username)

      const favoriteSlugs = response.articles.map((el: IArticle) => el.slug)
      setFavorites(favoriteSlugs)
   }

   const fetchFollow = async (profile: string, following: boolean) => {
      if (!token) {
         history.push('/login')
         return
      }

      if (following) {
         await request(
            `/profiles/${profile}/follow`,
            'DELETE',
            null,
            {'Authorization': 'Token: ' + token}
         )
      } else {
         await request(
            `/profiles/${profile}/follow`,
            'POST',
            null,
            {'Authorization': 'Token: ' + token}
         )
      }
   }

   // Load user if there are user data in local storage
   useEffect(() => {
      const savedUser = localStorage.getItem('kalambaUser')

      if (savedUser)
         fetchCurrentUser(JSON.parse(savedUser).token)

   }, [])

   // Fetch user's favorite articles
   useEffect(() => {
      if (username)
         fetchUserFavorites(username)
   }, [username])

   return { email, token, login, logout, favorites, fetchFavorite, fetchFollow }
}


export default useUser