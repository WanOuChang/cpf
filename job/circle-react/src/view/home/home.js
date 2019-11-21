import React, { Component } from 'react'
import RouterView from '../../router/router-view';

export default class Home extends Component {
    render() {
        console.log(this.props)
        let {routes} = this.props
        console.log(routes)
        return (
            <div>
                首页
                <RouterView routes={routes} />
            </div>
        )
    }
}
