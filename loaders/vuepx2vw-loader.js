const loaderUtils = require("loader-utils");
const defaultsProp = {
  unitToConvert: "px",
  viewportWidth: 375,
  unitPrecision: 5,
  viewportUnit: "vw",
  fontViewportUnit: "vw",
  minPixelValue: 1,
};
const templateRE = /<template>([\s|S]+)<\/template>/gi;
const stylePxRE = /(\d+)px/gi;

function createPxReplace(
  viewportSize,
  minPixelValue,
  unitPrecision,
  viewportUnit
) {
  return function (subStr, p1) {
    if (!p1) return;
    const pixels = parseFloat(p1);
    if (pixels <= minPixelValue) return;
    return toFixed((pixels / viewportSize) * 100, unitPrecision) + viewportUnit;
  };
}
function toFixed(number, precision) {
  const multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier);
  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

module.exports = function (content) {
  const opts = loaderUtils.getOptions(this);
  const defaults = { ...defaultsProp, ...opts };
  let templateBlock = "";
  if (templateRE.test(content)) {
    templateBlock = content.match(templateRE)[0];
  }
  if (stylePxRE.test(templateBlock)) {
    let _templateBlock = templateBlock.replace(
      stylePxRE,
      createPxReplace(
        defaults.viewportWidth,
        defaults.minPixelValue,
        defaults.unitPrecision,
        defaults.viewportUnit
      )
    );
    return content.replace(templateBlock, _templateBlock);
  }
  return content;
};
