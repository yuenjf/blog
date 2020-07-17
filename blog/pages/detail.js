import React, {createContext} from 'react'
import Head from 'next/head'
import axios from 'axios'
import marked from '../config/marked'
import servicePath from '../config/apiUrl'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import MdNav from '../components/MdNav'
import Footer from '../components/Footer'
import {Row, Col, Breadcrumb} from 'antd'
import {
    CalendarOutlined,
    FolderOutlined,
    FireOutlined
} from '@ant-design/icons'
import '../styles/pages/detail.styl'

export const MdContext = createContext(null)

const Detail = (props) => {

    const markdown = props.content

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <Row className="common-main" justify="center">
                <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div className="bread-nav">
                        <Breadcrumb>
                            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item><a href="/list">文章</a></Breadcrumb.Item>
                            <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div>
                        <div className="detail-title">
                            React基础知识
                        </div>
                        <div className="list-icon center">
                            <span><CalendarOutlined/>{props.addTime}</span>
                            <span><FolderOutlined/>{props.typeName}</span>
                            <span><FireOutlined/>{props.viewCount}</span>
                        </div>
                        <div className="detail-content" dangerouslySetInnerHTML={{__html: marked(markdown)}}/>
                    </div>
                </Col>
                <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                    <MdContext.Provider value={markdown}>
                        <MdNav/>
                    </MdContext.Provider>
                </Col>
            </Row>
            <Footer/>
        </>
    )
}

Detail.getInitialProps = async (context) => {
    let id = context.query.id
    const promise = new Promise((resolve) => {
        axios.get(servicePath.getArticleById + id).then((res) => {
            resolve(res.data.data[0])
        })
    })
    return await promise
}

export default Detail