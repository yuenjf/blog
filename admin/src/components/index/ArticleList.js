import React, { useState, useEffect } from "react";
import axios from "axios";
import servicePath from "../../config/apiUrl";
import { List, Row, Col, Button, Modal } from "antd";

const { confirm } = Modal;

const Welcome = (props) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        handleGetArticleList();
    }, []);

    const handleGetArticleList = () => {
        axios({
            method: "get",
            url: servicePath.getArticleList,
            withCredentials: true,
        }).then((res) => {
            setList(res.data.data);
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
                                <Button type="primary">修改</Button>
                                <Button type="primary" danger>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
            <style jsx global>
                {`
                    .list-content {
                        width: 100%
                    }


                `}
            </style>
        </>
    );
};

export default Welcome;
