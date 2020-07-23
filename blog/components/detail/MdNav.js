import React, {useContext} from 'react'
import {MdContext} from '../../pages/detail'
import {Affix} from 'antd'
import MarkdownNavbar from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import '../../styles/components/marknav.styl'

const MdNav = () => {
    const markdown = useContext(MdContext)

    return (
        <Affix offsetTop={8}>
            <div className="common-box">
                <div className="nav-title">文章目录</div>
                <MarkdownNavbar
                    className="article-menu"
                    source={markdown}
                    headingTopOffset={0}
                    ordered={false}
                />
            </div>
        </Affix>
    )
}

export default MdNav