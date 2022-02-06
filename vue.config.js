const env = process.env.NODE_ENV;

module.exports = {
  pages: {
    index: {
      entry: env === 'development' ? 'src/main.ts' : 'src/builderMain.ts'
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: ['./src/assets/styles/variable.scss']
    }
  },
  devServer: {
    proxy: {
      '/builder': {
        target: 'http://localhost:9001',
        changeOrigin: true,
        pathRewrite: {
          '^/builder': '/'
        }
      }
    }
  }
}
