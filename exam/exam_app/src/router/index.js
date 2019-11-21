import React from 'react';
import Login from "../views/login.js"
import Main from "../views/main.js"
import { BrowserRouter,Switch,Route,Redirect } from 'react-router-dom';


function Router(){
    return <BrowserRouter>
        <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/main' component={Main}></Route>
            <Redirect from="/" to="/main"></Redirect>
        </Switch>
    </BrowserRouter>
}

export default Router;