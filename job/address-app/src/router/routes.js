import React from "react";
import loadable from "react-loadable";

function Loading(){
    return <div>loading...</div>
}

let routes = [
    {
        path:'/home',
        component:loadable({
            loading:Loading,
            loader:() => import('../view/home.js'),
        })
    },{
        path:'/address',
        component:loadable({
            loading:Loading,
            loader:() => import('../view/address.js')
        })
    },{
        path:'/',
        redirect:'/home'
    }
]

export default routes;