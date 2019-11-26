import React from 'react'
import "./header.css"
import { Icon, Modal } from 'antd'
import { withRouter } from 'react-router-dom';
const { confirm } = Modal;


function Header(props) {
    let { username, rolename } = props;
    return (
        <div id="header">
            <input className="ipt" type="text" placeholder="请输入搜索内容"></input>
            <div className="btn">
                <div className="user">
                    <span><Icon type="user"></Icon>{username}</span>
                    <span>{rolename}</span>
                </div>
                <button 
                    onClick={() => {
                        confirm({
                            title: '确定要退出吗？',
                            content: 'Some descriptions',
                            okText: '确定',
                            okType: 'danger',
                            cancelText: '取消',
                            onOk() {
                              localStorage.clear();
                              props.history.push('/login')
                            },
                          });
                    }}
                ><Icon type="logout" />退出</button>
            </div>
        </div>

    )
    
}



Header.defaultProps={
    username:'用户',
    rolename:'职称',
    isBack:false,
}

export default withRouter(Header);
