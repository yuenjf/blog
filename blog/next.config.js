// next.config.js

// const withCss = require('@zeit/next-css')
//
// if(typeof require !== 'undefined'){
//     require.extensions['.css']=file=>{}
// }
//
// module.exports = withCss({})

const withCss = require('@zeit/next-css')
const withStylus = require('@zeit/next-stylus')
const withPlugins = require("next-compose-plugins")

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
}

if (typeof require !== 'undefined') {
    require.extensions['.styl'] = file => {}
}

module.exports = withPlugins([withCss, withStylus], {
    webpack: (config) => {
        return config
    }
})




