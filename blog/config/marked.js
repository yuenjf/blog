//  marked 配置文件
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const Marked = () => {
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,  //  允许GitHub标准的markdown
        tables: true,  //  支持Github形式的表格，该选项要求gfm为true
        breaks: false,  //  支持Github换行符，该选项要求gfm为true
        pedantic: false,
        sanitize: false,
        smartLists: true,  //  优化列表输出
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    })
}

export default marked