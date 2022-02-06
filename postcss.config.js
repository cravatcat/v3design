let plugins = [];
if (process.env.NODE_ENV !== "development") {
  plugins = {
    "postcss-px-to-viewport": {
      unitToConvert: "px",
      viewportWidth: 375,
      unitPrecision: 5,
      propList: ["*"],
      viewportUnit: "vw",
      fontViewportUnit: "vw",
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: true,
      replace: true,
      exclude: [/\/components\//, /\/ant-design-vue\//],
      landscape: false,
      landscapeUnit: "vw",
      landscapeWidth: 568,
    },
  };
}
module.exports = {
  plugins,
};
