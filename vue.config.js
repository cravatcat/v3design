const env = process.env.NODE_ENV;

module.exports = {
  pages: {
    index: {
      entry: env === "development" ? "src/main.ts" : "src/builderMain.ts",
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: ["./src/assets/styles/variable.scss"],
    },
  },
  configureWebpack: {
    resolveLoader: {
      modules: ["node_modules", "./loaders/"],
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("vuepx2vw-loader")
      .loader("vuepx2vw-loader");
  },
  devServer: {
    proxy: {
      "/builder": {
        target: "http://localhost:9001",
        changeOrigin: true,
        pathRewrite: {
          "^/builder": "/",
        },
      },
    },
  },
};
