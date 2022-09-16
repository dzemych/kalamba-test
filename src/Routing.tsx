import React, {FC} from "react";
import {Route, Switch} from "react-router-dom";
import Editor from "./containers/Editor";
import Logout from "./containers/Logout";
import Profile from "./containers/Profile";
import Settings from "./containers/Settings";
import Article from "./containers/Article";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn";


const Routing: FC = () => {
   return (
      <Switch>
         <Route path="/editor" exact component={Editor} />
         <Route path="/editor/:slug" exact component={Editor} />
         <Route path="/login" exact component={SignIn} />
         <Route path="/logout" exact component={Logout} />
         <Route path="/profile/:username" exact component={Profile} />
         <Route
            path="/profile/:username/favorites"
            exact
            component={Profile}
         />
         <Route path="/register" exact component={SignUp} />
         <Route path="/settings" exact component={Settings} />
         <Route path="/:slug" exact component={Article} />
         <Route path="/" component={Home} exact />
         <Route path="*" component={NotFound} />
      </Switch>
   )
}

export default Routing