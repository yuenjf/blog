import React, { useState, useEffect } from "react";
import axios from "axios";
import servicePath from "../../config/apiUrl";
import marked from "marked";
import { Row, Col, Button, DatePicker, Input, Select, message } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const AddArticle = (props) => {
    const [id, setId] = useState(0); //  文章的id，如果是0说明是新增加，如果不是0，说明是修改
    const [title, setTitle] = useState(""); //  文章标题
    const [mdcontent, setMdContent] = useState(""); //  markdown的编辑内容
    const [content, setContent] = useState("文章预览"); //  markdown的预览内容
    const [mdIntroduction, setMdIntroduction] = useState(); //  markdown的编辑简介
    const [introduction, setIntroduction] = useState("简介预览"); //  markdown的预览简介
    const [releaseDate, setReleaseDate] = useState(); //  发布日期
    const [updateDate, setUpdateDate] = useState(); //  修改日期
    const [typeInfo, setTypeInfo] = useState([]); //  所有的文章类别
    const [selectedType, setSelectType] = useState("类别"); //  选择的文章类别

    // 页面渲染时调用getTypeInfo
    useEffect(() => {
        getTypeInfo();
    }, []);

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
    });

    const getTypeInfo = () => {
        axios({
            method: "get",
            url: servicePath.getTypeInfo,
            withCredentials: true,
        }).then((res) => {
            if (!res.data.data) {
                localStorage.removeItem("openId");
                props.history.push("/");
            } else {
                setTypeInfo(res.data.data);
            }
        });
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSelectTypeChange = (value) => {
        setSelectType(value);
    };

    const handleContentChange = (e) => {
        setMdContent(e.target.value);
        setContent(marked(e.target.value));
    };

    const handleIntroductionChange = (e) => {
        setMdIntroduction(e.target.value);
        setIntroduction(marked(e.target.value));
    };

    // 保存文章 - 文章非空校验
    const saveArticle = () => {
        if (selectedType == "类别") {
            message.error("必须选择文章类别");
            return false;
        } else if (!title) {
            message.error("文章名称不能为空");
            return false;
        } else if (!mdcontent) {
            message.error("文章内容不能为空");
            return false;
        } else if (!mdIntroduction) {
            message.error("简介不能为空");
            return false;
        } else if (!releaseDate) {
            message.error("发布日期不能为空");
            return false;
        }
        // message.success("检验通过");

        // 把变量存入临时对象
        let articleObj = {};
        articleObj.title = title;
        articleObj.typeId = selectedType;
        articleObj.content = mdcontent;
        articleObj.introduction = mdIntroduction;
        articleObj.releaseDate = releaseDate;
        let date = releaseDate.replace("-", "/");
        articleObj.releaseDate = new Date(date).getTime() / 1000;

        // 新建文章
        if (id === 0) {
            articleObj.viewCount = 0;
            axios({
                method: "post",
                url: servicePath.addArticle,
                data: articleObj,
                withCredentials: true, // 解决跨域问题
            }).then((res) => {
                setId(res.data.insertId);
                if (res.data.isSuccess) {
                    message.success("文章添加成功");
                } else {
                    message.error("文章添加失败");
                }
            });
            // 修改文章
        } else {
            articleObj.id = id;
            axios({
                method: "post",
                url: servicePath.updateArticle,
                data: articleObj,
                withCredentials: true,
            }).then((res) => {
                if (res.data.isSuccess) {
                    message.success("文章修改成功");
                } else {
                    message.error("文章修改失败");
                }
            });
        }
    };

    return (
        <>
            <Row gutter={8}>
                <Col span={18}>
                    <Row gutter={8}>
                        <Col flex="auto">
                            <Input
                                placeholder="博客标题"
                                size="large"
                                onChange={handleTitleChange}
                            />
                        </Col>
                        <Col flex="1px">
                            <Select
                                defaultValue={selectedType}
                                size="large"
                                onChange={handleSelectTypeChange}
                            >
                                {typeInfo.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.typeName}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <div className="content">
                        <Row gutter={8}>
                            <Col span={12}>
                                <TextArea
                                    className="markdwon-content"
                                    rows={29}
                                    placeholder="文章内容"
                                    spellCheck="false"
                                    allowClear
                                    onChange={handleContentChange}
                                />
                            </Col>
                            <Col span={12}>
                                <div
                                    className="content-preview"
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={6}>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Button size="large" block>
                                暂存文章
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                type="primary"
                                size="large"
                                block
                                onClick={saveArticle}
                            >
                                发布文章
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={(data, dataString) =>
                                        setReleaseDate(dataString)
                                    }
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="修改日期"
                                    size="large"
                                    onChange={(data, dataString) =>
                                        setUpdateDate(dataString)
                                    }
                                />
                            </div>
                        </Col>
                    </Row>
                    <div className="introduction">
                        <Row>
                            <Col span={24}>
                                <TextArea
                                    className="markdown-introduction"
                                    rows={12}
                                    placeholder="文章简介"
                                    spellCheck="false"
                                    allowClear
                                    onChange={handleIntroductionChange}
                                />
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col span={24}>
                            <div
                                className="introduction-preview"
                                dangerouslySetInnerHTML={{
                                    __html: introduction,
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <style jsx global>
                {`
                    h1 {
                        font-size: 30px;
                    }

                    h2 {
                        font-size: 28px;
                        border-bottom: 1px solid #cbcbcb;
                    }

                    h3 {
                        font-size: 24px;
                    }

                    code {
                        display: inline-block;
                        color: #dd0055;
                        background-color: #f9f9f9;
                        padding: 5px;
                        font-weight: 300;
                        font-family: Consolas, monospace;
                        border-radius: 3px;
                        font-size: 14px;
                    }

                    pre {
                        display: block;
                        background-color: #283646 !important;
                        padding: 8px !important;
                        overflow-y: auto;
                        font-weight: 300;
                        font-family: Consolas, monospace;
                        border-radius: 3px;
                    }

                    pre > code {
                        background-color: #283646 !important;
                        color: #fff;
                    }
                `}
            </style>

            <style jsx>
                {`
                    .content {
                        margin-top: 8px;
                    }

                    .content-preview {
                        overflow: auto;
                        height: 636px;
                        border: 1px solid #d9d9d9;
                        background: rgba(0, 0, 0, 0.05);
                        padding: 4px 11px;
                        word-break: break-all;
                        word-wrap: break-word;
                    }

                    .introduction {
                        margin: 8px 0;
                    }

                    .introduction-preview {
                        overflow: auto;
                        word-break: break-all;
                        word-wrap: break-word;
                        padding: 4px 11px;
                        height: 311px;
                        border: 1px solid #d9d9d9;
                        background: rgba(0, 0, 0, 0.05);
                    }

                    .date-select {
                        margin-top: 8px;
                    }
                `}
            </style>
        </>
    );
};

export default AddArticle;
