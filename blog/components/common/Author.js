import {Avatar, Divider} from 'antd'
import {
    UserOutlined,
    GithubOutlined,
    createFromIconfontCN
} from '@ant-design/icons';
import '../../styles/components/author.styl'

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1817705_qekkrrdx6.js'
})

const Author = () => {
    return (
        <div className="common-box author">
            <div>
                <span className="author-icon"><Avatar size={48} icon={<UserOutlined/>}/></span>
                <span className="author-name">Cheney</span>
            </div>
            <div className="author-introdution">
                努力学习WEB前端
                <Divider>社交</Divider>
                <Avatar className="account" size={28} icon={<GithubOutlined/>}/>
                <Avatar className="account" size={28} icon={<IconFont type="icongitee"/>}/>
            </div>
        </div>
    )
}

export default Author

