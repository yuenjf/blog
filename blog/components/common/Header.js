import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import servicePath from "../../config/apiUrl";
import { Row, Col, Menu } from "antd";
import * as Icon from "@ant-design/icons";
import "../../styles/components/header.styl";

const Header = (props) => {
    const [navType, setNavType] = useState([]);

    useEffect(() => {
        getNavType();
    }, []);

    const getNavType = () => {
        axios({
            method: "get",
            url: servicePath.getNavTypeInfo,
            withCredentials: true,
        }).then((res) => {
            // console.log(res.data.data);
            setNavType([]);
        });
    };

    const handleNavClick = (e) => {
        if (e.key == 1) {
            Router.push(`/`);
        } else {
            Router.push(`/list?id=${e.key}`);
        }
    };

    return (
        <div className="header">
            <Row justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">yuenjf</span>
                    <span className="header-info">的个人博客</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleNavClick}>
                        {navType.map((item) => (
                            <Menu.Item key={item.id}>
                                {React.createElement(Icon[item.icon])}
                                {item.typeName}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Col>
            </Row>
        </div>
    );
};

export default Header