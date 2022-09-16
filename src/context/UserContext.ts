import {createContext} from "react";


const loginNoop = (email: string, token: string, username: string): void => undefined
const favoriteNoop = (slug: string): void => undefined
const followNoop = (profile: string, following: boolean): void => undefined
const logoutNoop = (): void => undefined

const UserContext = createContext({
   token: '',
   email: '',
   login: loginNoop,
   logout: logoutNoop,
   fetchFavorite: favoriteNoop,
   fetchFollow: followNoop,
   isAuth: false,
   favorites: ['']
})

export default UserContext