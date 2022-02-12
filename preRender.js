const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const distDir = path.resolve(__dirname, "./dist");
const htmlName = "index.html";

let pageLoadedResolve = null;
const pageLoaded = new Promise((resolve) => (pageLoadedResolve = resolve));

async function readFiles(rootDir = distDir) {
  try {
    let dirOrfiles = await fs.promises.opendir(rootDir);
    const files = [];
    for await (let dof of dirOrfiles) {
      if (dof.isDirectory()) {
        let subFiles = await readFiles(path.resolve(rootDir, dof.name));
        files.push(...subFiles);
      } else if (dof.isFile()) {
        if (dof.name !== htmlName) {
          files.push({
            name: dof.name,
            path: path.resolve(rootDir, dof.name),
          });
        }
      }
    }
    return files;
  } catch (err) {
    console.log(err);
    return [];
  }
}
async function preRender() {
  try {
    const browser = await puppeteer.launch({
      executablePath: puppeteer.executablePath(),
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    const files = await readFiles();
    const onRequest = async (interceptedRequest) => {
      const url = interceptedRequest.url();
      let isLocalFile = false;
      if (url.includes(distDir) && url.includes(htmlName)) {
        await interceptedRequest.continue();
        return;
      }
      await Promise.all(
        files.map(async (f) => {
          if (url.includes(f.name)) {
            const res = await interceptedRequest.respond({
              status: 200,
              body: fs.readFileSync(f.path),
            });
            isLocalFile = true;
            return res;
          }
          return 1;
        })
      );
      if (!isLocalFile) {
        await interceptedRequest.continue();
      }
    };
    const onLoad = async () => {
      try {
        const appDiv = await page.$("#app");
        const str = await page.evaluate((app) => app.outerHTML, appDiv);
        const filePath = path.resolve(distDir, htmlName);
        let content = fs.readFileSync(filePath, { encoding: "utf8" });
        content = content.replace('<div id="app"></div>', str);
        fs.writeFileSync(path.resolve(distDir, htmlName), content);
        pageLoadedResolve(1);
      } catch (err) {
        console.log(err);
      }
    };
    page.on("request", onRequest);
    page.on("load", onLoad);
    await page.setRequestInterception(true);
    await page.goto(`file:${distDir}/${htmlName}`);
    await pageLoaded;
    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  preRender,
};
