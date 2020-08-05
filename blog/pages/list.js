import React, { useState, useEffect, createContext } from 'react';
import Head from 'next/head';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import marked from '../config/marked';
import Link from 'next/link';
import { Row, Col, List, Breadcrumb } from 'antd';
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons';
import Header from '../components/common/Header';
import Author from '../components/common/Author';
import Advert from '../components/common/Advert';
import Footer from '../components/common/Footer';

const BlogList = (props) => {
  const [ list, setList ] = useState(props.data);
  const [ currentTypeNum, setCurrentTypeNum ] = useState();

  //  性能待优化
  useEffect(() => {
    setList(props.data);
  }, [ props.data ]);

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
              <Breadcrumb.Item><a href="/">{currentTypeNum}</a></Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            itemLayout="vertical"
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined/>{item.releaseDate}</span>
                  <span><FolderOutlined/>{item.typeName}</span>
                  <span><FireOutlined/>{item.viewCount}</span>
                </div>
                <div className="list-introduce"
                     int dangerouslySetInnerHTML={{ __html: marked(item.introduction) }}/>
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
  );
};

BlogList.getInitialProps = async (context) => {
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios.get(servicePath.getListById + id)
      .then((res) => {
          resolve(res.data);
        },
      );
  });
  return await promise;
};

export default BlogList;
