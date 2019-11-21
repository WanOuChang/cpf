import React from "react";
import { withRouter } from "react-router-dom"

function Header(props){
    let { isBack, title, history } = props;
    return <header>
        <span className="back" style={{display:isBack ?'block':'none'}} onClick={() => {
            history.go(-1)
        }}>返回</span>
        {title}
        <span className="more"></span>
    </header>
}

Header.defaultProps = {
    title:'编辑地址',
    isBack:true
}


export default Header;