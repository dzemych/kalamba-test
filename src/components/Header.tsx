import React, {FC, useContext} from "react";
import {Link, useLocation} from "react-router-dom";
import UserContext from "../context/UserContext";


const Header: FC = () => {

   const { isAuth } = useContext(UserContext)

   const links = [
      { path: '/', text: 'Home' },
      { path: '/editor', text: ' New Article', icon: 'ion-compose'},
      { path: '/settings', text: ' Settings', icon: 'ion-gear-a'},
   ]

   if (!isAuth)
      links.push(
         { path: '/login', text: 'Sign in'},
         { path: '/register', text: 'Sign up'}
      )

   if (isAuth)
      links.push(
         { path: '/logout', text: 'Logout'}
      )

   const location = useLocation()

   const getLinkCls = (path: string) => {
      const cls = ['nav-link']

      if (location.pathname === path)
         cls.push('active')

      return cls.join(' ')
   }

   return (
      <nav className="navbar navbar-light">
         <div className="container">
            <Link to="/" className="navbar-brand">
               conduit
            </Link>

            <ul className="nav navbar-nav pull-xs-right">
               {links.map(link => (
                  <li className="nav-item" key={`${link.path}`}>
                     <Link
                        to={link.path}
                        className={getLinkCls(link.path)}
                     >
                        { link.icon && <i className={link.icon}/> }
                        { link.text }
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      </nav>
   )
}


export default Header