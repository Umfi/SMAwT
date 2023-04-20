module.exports = {
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/SMAwT' : '/',
  chainWebpack: config => {
    config.module
      .rule('html')
      .test(/\.html$/)
      .exclude
      .add(/index\.html$/)
      .end()
      .use('html-loader')
      .loader('html-loader')
      .end()
  },
}
