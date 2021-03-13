import React, { useState, useEffect } from "react";
import axios from "axios";
import servicePath from "../../config/apiUrl";
import { List, Row, Col, Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const ArticleList = (props) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        handleGetArticleList();
    }, []);

    // 获取文章列表
    const handleGetArticleList = () => {
        axios({
            method: "get",
            url: servicePath.getArticleList,
            withCredentials: true,
        }).then((res) => {
            setList(res.data.data);
        });
    };

    // 删除文章
    const handleDelArticle = (id) => {
        confirm({
            title: "删除确认?",
            icon: <ExclamationCircleOutlined />,
            content: "删除后将无法恢复，请慎重！",
            okText: "确认",
            cancelText: "取消",
            onOk() {
                axios({
                    method: "get",
                    url: servicePath.delArticle + id,
                    withCredentials: true,
                }).then((res) => {
                    message.success("文章删除成功");
                    // 使用filter根据id删除list中对应的选项
                    const tempList = list.filter((item) => item.id !== id);
                    setList(tempList);
                });
            },
            onCancel() {},
        });
    };

    return (
        <>
            <List
                header={
                    <Row className="list-header">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>观看量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={(item) => (
                    <List.Item>
                        <Row className="list-content">
                            <Col span={8}>{item.title}</Col>
                            <Col span={4}>{item.typeName}</Col>
                            <Col span={4}>{item.releaseDate}</Col>
                            <Col span={4}>{item.viewCount}</Col>
                            <Col span={4}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        props.history.push(
                                            `/index/add/${item.id}`
                                        );
                                    }}
                                >
                                    修改
                                </Button>
                                &nbsp;
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => handleDelArticle(item.id)}
                                >
                                    删除
                                </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
            <style jsx global>
                {`
                    .list-content {
                        width: 100%;
                    }
                `}
            </style>
        </>
    );
};

export default ArticleList;
