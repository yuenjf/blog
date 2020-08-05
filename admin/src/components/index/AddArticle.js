import React, { useState } from 'react';
import marked from 'marked';
import { Row, Col, Button, DatePicker, Input, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const AddArticle = () => {
    const [ id, setId ] = useState(0); //  文章的id，如果是0说明是新增加，如果不是0，说明是修改
    const [ title, setTitle ] = useState(''); //  文章标题
    const [ Mdcontent, setMdContent ] = useState(''); //  markdown的编辑内容
    const [ content, setContent ] = useState('文章预览'); //  markdown的预览内容
    const [ mdIntroduction, setMdIntroduction ] = useState(); //  markdown的编辑简介
    const [ introduction, setIntroduction ] = useState('简介预览'); //  markdown的预览简介
    const [ date, setDate ] = useState(); //  发布日期
    const [ updateDate, setUpdateDate ] = useState(); //  修改日期
    const [ typeInfo, setTypeInfo ] = useState([]); //  所有的文章类别
    const [ selectedType, setSelectType ] = useState(1); //  选择的文章类别

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
    });

    const handleContentChange = (e) => {
        setMdContent(e.target.value);
        setContent(marked(e.target.value));
    };

    const handleIntroductionChange = (e) => {
        setMdIntroduction(e.target.value);
        setIntroduction(marked(e.target.value));
    };

    return (
        <>
            <Row gutter={8}>
                <Col span={18}>
                    <Row gutter={8}>
                        <Col flex="auto">
                            <Input placeholder="博客标题" size="large"/>
                        </Col>
                        <Col flex="1px">
                            <Select defaultValue="1" size="large">
                                <Option value="1">文章</Option>
                                <Option value="2">杂谈</Option>
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
                            <Button type="primary" size="large" block>
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
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="修改日期"
                                    size="large"
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
