import React from 'react';
import {Switch, Route,BrowserRouter as Router,Redirect} from 'react-router-dom';
import Home from './Home.js';
import Profile from './Profile';



 export default function App() {
  return<Router>
    <Switch>
    <Route path={'/home'} component={Home}/>
    <Route path={'/profile/:name'} render={()=><Profile/>}/>
     <Redirect to="/home" />
    </Switch>
     
   </Router>

}
