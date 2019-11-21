import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

function RouterView({routes}){
    let routeArr = routes.filter( item => item.component);
    let redirectArr = routes.filter( item => item.redirect);
    return <Switch>
        {
            routeArr.map(item => <Route key={item.path} path={item.path} render={ (props) => {
                return <item.component {...props} routes={item.children}></item.component>
            }}></Route>)
        }
        {
            redirectArr.map( item => <Redirect key={item.path} from={item.path} to={item.redirect}></Redirect>)
        }
    </Switch>
}

export default RouterView;