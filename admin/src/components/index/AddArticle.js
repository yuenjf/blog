import React, {useState} from 'react'
import marked from 'marked'
import {Row, Col, Button, DatePicker, Input, Select} from 'antd'

const {Option} = Select
const {TextArea} = Input

const AddArticle = () => {
    const [id, setId] = useState(0)  //  文章的id，如果是0说明是新增加，如果不是0，说明是修改
    const [title, setTitle] = useState('')  //  文章标题
    const [Mdcontent, setMdContent] = useState('')  //  markdown的编辑内容
    const [content, setContent] = useState('预览内容')  //  markdown的预览内容
    const [mdIntroduction, setMdIntroduction] = useState()  //  markdown的编辑简介
    const [introduction, setIntroduction] = useState('等待编辑')  //  markdown的预览简介
    const [date, setDate] = useState()  //  发布日期
    const [updateDate, setUpdateDate] = useState()  //  修改日期
    const [typeInfo, setTypeInfo] = useState([])  //  所有的文章类别
    const [selectedType, setSelectType] = useState(1)  //  选择的文章类别

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    })
    return (
        <>
            <div>
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
                        <div className="markdown">
                            <Row gutter={8}>
                                <Col span={12}>
                                    <TextArea className="markdwon-content" rows={28} placeholder="文章内容"/>
                                </Col>
                                <Col span={12}>
                                    <div className="markdwon-preview"></div>
                                </Col>
                            </Row>
                        </div>

                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <TextArea placeholder="文章简介"/>
                            </Col>
                            <Col span={24}>
                                <TextArea placeholder="文章简介"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Button size="large">暂存文章</Button>
                                <Button type="primary" size="large">发布文章</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Button size="large">暂存文章</Button>
                                <Button type="primary" size="large">发布文章</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <style jsx>{`
              .markdown {
                margin-top: 10px;
              }
        
              .markdwon-preview {
                height: 100%;
                border: 1px solid #d9d9d9;
                background: #eee;
              }
            `}</style>
        </>
    )


}

export default AddArticle


