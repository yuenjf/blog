//  全局样式，该组件为顶级组件
import '../styles/pages/global.styl'

export default function App({Component, pageProps}) {
    return <Component {...pageProps} />
}