import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './login.css'
import axiox from 'axios';



class login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                axiox.post('/api/login', { username: values.username, password: values.password }).then(res => {
                    console.log(res)
                    if (res.data.code === 1) {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('userInfo', JSON.stringify({username:values.username,rolename:res.data.roleName}));
                        this.props.history.push('/home')
                    }
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="login">
                <div className='login'>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                Forgot password
                        </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                        </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(login);

export default WrappedNormalLoginForm;