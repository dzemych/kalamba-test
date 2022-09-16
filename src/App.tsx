import React, { FC } from 'react'
import Routing from "./Routing";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserContext from "./context/UserContext";
import useUser from "./hooks/useUser";


const App: FC = () => {
   const { login, logout, token, email, favorites, fetchFavorite, fetchFollow} = useUser()
   const isAuth = !!token

   return (
      <>
         <UserContext.Provider value={{
            isAuth, login, logout, token, email, favorites, fetchFavorite, fetchFollow
         }}>
            <Header/>

            <Routing/>

            <Footer/>
         </UserContext.Provider>
      </>
   )
}

export default App
