import {FC, useContext} from 'react'
import UserContext from "../context/UserContext";


const Logout: FC = () => {
   const { logout } = useContext(UserContext)

   return (
      <>
         <div className="container">
            <h1 className="text-xs-center">Are you sure you want to log out ?</h1>

            <button
               className="btn btn-lg btn-primary offset-md-5"
               onClick={logout}
            >
               Logout
            </button>
         </div>
      </>
   )
}

export default Logout