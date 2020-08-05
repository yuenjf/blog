import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import marked from '../config/marked'
import Header from '../components/common/Header'
import Author from '../components/common/Author'
import Advert from '../components/common/Advert'
import Footer from '../components/common/Footer'
import {Row, Col, List} from 'antd'
import {
    CalendarOutlined,
    FolderOutlined,
    FireOutlined
} from '@ant-design/icons'
import '../styles/pages/index.styl'

const Home = (props) => {
    const [list, setList] = useState(props.data)

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <Row className="common-main" justify="center">
                <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <List
                        itemLayout="vertical"
                        dataSource={list}
                        renderItem={(item) => (
                            <List.Item>
                                <div className="list-title">
                                    <Link href={{pathname: '/detail', query: {id: item.id}}}>
                                        <a>{item.title}</a>
                                    </Link>
                                </div>
                                <div className="list-icon">
                                    <span><CalendarOutlined/>{item.releaseDate}</span>
                                    <span><FolderOutlined/>{item.typeName}</span>
                                    <span><FireOutlined/>{item.viewCount}</span>
                                </div>
                                <div className="list-introduce"
                                     dangerouslySetInnerHTML={{__html: marked(item.introduction)}}/>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                </Col>
            </Row>
            <Footer/>
        </>
    )
}

Home.getInitialProps = async () => {
    const promise = new Promise((resolve) => {
        axios.get(servicePath.getArticleList)
            .then((res) => {
                    resolve(res.data)
                }
            )
    })
    return await promise
}

export default Home