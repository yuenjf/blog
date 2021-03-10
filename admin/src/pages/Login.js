import React, { useState } from 'react';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import { Spin, Card, Input, Button, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const Login = (props) => {
    const [ userName, setUserName ] = useState();
    const [ password, setPassword ] = useState();
    const [ isLoading, setIsLoading ] = useState(false);

    const handleCheckLogin = () => {
        setIsLoading(true);
        if (!userName || !password) {
            message.error('用户名或密码不能为空');
            return;
        }
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: {
                userName,
                password,
            },
            withCredentials: true,
        }).then(res => {
            setIsLoading(false);
            if (res.data.data) {
                localStorage.setItem('openId', res.data.openId);
                props.history.push('/index');
            } else {
                console.log(res.data.data);
                message.error('用户名或密码错误');
            }
        });
    };

    return (
        <>
            <div className="login">

                <Card
                    title="Yuen Blog System"
                    bordered={true}
                    style={{ width: 400 }}
                >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserOutlined/>}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                    <br/>
                    <br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined/>}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <br/>
                    <br/>
                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={handleCheckLogin}
                    >
                        {' '}
                        Login in{' '}
                    </Button>
                </Card>

            </div>

            <style jsx>{`
                body {
                  background-color: #f0f0f0;
                }
                .login {
                  position: absolute;
                  width: 400px;
                  height: 270px;
                  margin: auto;
                  top: 0;
                  right: 0;
                  bottom: 0;
                  left: 0;
                }
            `}</style>
        </>
    );
};

export default Login;
