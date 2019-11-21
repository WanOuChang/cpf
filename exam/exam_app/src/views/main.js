import React, { Component } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import Home from "../views/main/home"
import Constmanage from "../views/main/constmanage";
import Meetingmanage from "../views/main/meetingmanage"
import Meetingresad from "../views/main/meetingresad"
import Myres from "../views/main/myres"
import Resad from "../views/main/resad"
import Respm from "../views/main/respm"
import Resmeeting from "../views/main/resmeeting";
import Systemsetup from "../views/main/systemsetup"
import { Layout, Menu } from 'antd';
import Headers from "../components/Header"
import 'antd/dist/antd.css';
import "../app.css"
import axios from "axios";


const { Content, Sider } = Layout;


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      rolename: '',
      userInfo:[],
    }
  };

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    } else {
      let token = localStorage.getItem('token')
      let {username,rolename} = JSON.parse(localStorage.getItem('userInfo'));
      this.setState({
        username,
        rolename,
      })
      axios.get('/api/menu',{headers:{token}}).then(res => {
        if(res.data.code===1){
          this.setState({
            userInfo:res.data.data
          })
        }
      })
    }

  }

  render() {
    let { username,rolename, userInfo } = this.state;
    console.log(userInfo)
    return (
      <div id="box">
        <Headers username={username} rolename={rolename}/>
        <Layout className="ant-list">
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['9']}>
              {
                userInfo && userInfo.map(item => {
                  return <Menu.Item key={item.menuapi}>
                  <NavLink to={"/main"+item.menuapi}>{item.menuname}</NavLink>
                </Menu.Item>
                })
              }
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <Switch>
                <Route path="/main/home" component={Home}></Route>
                <Route path="/main/resmeeting" component={Resmeeting}></Route>
                <Route path="/main/myres" component={Myres}></Route>
                <Route path="/main/resad" component={Resad}></Route>
                <Route path="/main/respm" component={Respm}></Route>
                <Route path="/main/meetingresad" component={Meetingresad}></Route>
                <Route path="/main/meetingmanage" component={Meetingmanage}></Route>
                <Route path="/main/constmanage" component={Constmanage}></Route>
                <Route path="/main/systemsetup" component={Systemsetup}></Route>
                <Redirect form="/main" to="/main/home"></Redirect>
              </Switch>
            </Content>

          </Layout>
        </Layout>
      </div>
    )
  }
}
