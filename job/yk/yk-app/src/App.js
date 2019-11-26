import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Divider, Tag } from 'antd';
import axios from "axios";
const { Column } = Table;



class App extends Component{
  state={
    list:[],
    limit:3,
    pagenum:1,
    total:null,
  };

  componentDidMount(){
    this.getlist();
  }

  getlist(){
    let {pagenum,limit} = this.state
    axios.get('/api/list',{params:{limit,pagenum}}).then(res => {
      console.log(res);
      this.setState({
        list:res.data.data,
        total:res.data.total
      })
    })
  }

  change = (page, pageSize)=>{
    console.log(page.current)
    this.setState({
      pagenum:page.current
    },()=>{this.getlist()})
  }
  
  render(){
    let {list, limit, pagenum, total } = this.state
    return (
      <div className="App">
        <Table
          dataSource={list}
          bordered={true}
          pagination={{
            pageSize:limit,
            total, 
          }}
          onChange={this.change}
        >
          <Column title="序号" dataIndex="firstName" key="firstName" />
          <Column title="时间" dataIndex="create_time" key="create_time" />
          <Column title="标题" dataIndex="title" key="title" />
          <Column title="作者" dataIndex="author" key="author" />
          <Column title="重要性" dataIndex="significance" key="significance" />
          <Column title="阅读数" dataIndex="pageview" key="pageview" />
          <Column title="状态" dataIndex="status" key="status" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                <a>修改</a>
                <Divider type="vertical" />
                <a>删除</a>
              </span>
            )}
          />
        </Table>,
      </div>
    )
  }
}

export default App;
