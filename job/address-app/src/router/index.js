import React, { Component } from 'react'
import { BrowserRouter } from "react-router-dom";
import RouterView from '../router/router-view';
import routes from "./routes";

export default class Index extends Component {
    render() {
        return <BrowserRouter >
            <
            RouterView routes = { routes } > < /RouterView> <
            /BrowserRouter>
    }
}