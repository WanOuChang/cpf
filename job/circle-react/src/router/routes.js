import React from 'react';
import Loadable from 'react-loadable';

function Loading(){
    return <div>loading...</div>
}

let routes = [
    {
        path:'/home',
        component:Loadable({
            loader:()=>import('../view/home/home'),
            loading:Loading
        }),
        children:[
            {
                path:'/home/circle',
                component:Loadable({
                    loader:()=>import('../view/home/circle/index'),
                    loading:Loading,
                })
            },{
                path:'/home/my',
                component:Loadable({
                    loading:Loading,
                    loader:() => import('../view/home/my/index')
                })
            },{
                path:'/home',
                redirect:"/home/circle"
            }
        ]
    },{
        path:'/registry',
        component:Loadable({
            loader:() => import('../view/registry'),
            loading:Loading,
        })
    },{
        path:'/login',
        component:Loadable({
            loader:()=> import('../view/login'),
            loading:Loading
        })
    },{
        path:'/',
        redirect:'/home'
    }
]

export default routes;