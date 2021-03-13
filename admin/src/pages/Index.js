import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
    FileAddOutlined,
    OrderedListOutlined,
    FundOutlined,
} from "@ant-design/icons";

import AddArticle from "../components/index/AddArticle";
import ArticleList from "../components/index/ArticleList";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Index = (props) => {
    const [breadcrumb, setBreadcrumb] = useState("");
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed) => {
        setCollapsed(collapsed);
    };

    const handleClickArticle = (e) => {
        // console.log(e.item.props);
        if (e.key == "addArticle") {
            props.history.push("/index/add");
            setBreadcrumb("添加文章");
        } else {
            props.history.push("/index/list");
            setBreadcrumb("文章列表");
        }
    };

    return (
        <>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={onCollapse}
                >
                    <div className="logo">
                        
                    </div>
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={["1"]}
                        mode="inline"
                        onClick={handleClickArticle}
                    >
                        {/* <Menu.Item key="1" icon={<FundOutlined />}>
                            工作台
                        </Menu.Item> */}
                        <Menu.Item
                            key="articleList"
                            icon={<OrderedListOutlined />}
                        >
                            文章列表
                        </Menu.Item>
                        <Menu.Item key="addArticle" icon={<FileAddOutlined />}>
                            添加文章
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout className="site-layout">
                    <Content style={{ margin: "0 16px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>博客管理系统</Breadcrumb.Item>
                            <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            className="site-layout-background"
                            style={{
                                padding: 10,
                                minHeight: 360,
                                background: "#fff",
                            }}
                        >
                            <div>
                                <Route
                                    path="/index"
                                    exact
                                    component={AddArticle}
                                />
                                <Route
                                    path="/index/add"
                                    exact
                                    component={AddArticle}
                                />
                                <Route
                                    path="/index/list"
                                    exact
                                    component={ArticleList}
                                />
                                <Route
                                    path="/index/add/:id"
                                    exact
                                    component={AddArticle}
                                />
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>

            <style jsx>{`
                .logo {
                    height: 32px;
                    background: rgba(255, 255, 255, 0.2);
                    margin: 16px;
                }
            `}</style>
        </>
    );
};

export default Index;
