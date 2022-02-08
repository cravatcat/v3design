const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const ejs = require("ejs");
const fs = require("fs");
const execa = require("execa");

const app = new Koa();

const buildApp = async (widgets) => {
  const template = fs.readFileSync("./builderApp.ejs", {
    encoding: "utf-8",
  });
  const getWidgetNames = (widgets, defaultNames = []) => {
    return widgets.reduce((names, widget) => {
      if (names.includes(widget.name) && widget.name !== "wLayout")
        return names;
      if (widget.name === "wLayout") {
        if (!names.includes(widget.name)) names.push(widget.name);
        const { children } = widget;
        names = getWidgetNames(children, names);
      } else {
        names.push(widget.name);
      }
      return names;
    }, defaultNames);
  };
  const widgetNames = getWidgetNames(widgets, []);
  const code = ejs.render(template, { widgetNames, widgets });
  fs.writeFileSync("./src/builderApp.tsx", code);
  const commands = ["run", "build"];
  const subprocess = execa("npm", commands);
  subprocess.stdout.pipe(process.stdout);
  const { stdout } = await subprocess;
  console.log(stdout);
};

app.use(bodyParser());

app.use(async (ctx) => {
  const { widgets } = ctx.request.body;
  try {
    await buildApp(widgets);
    ctx.body = "ok hahaha";
  } catch (error) {
    console.log(error);
    ctx.body = "error";
  }
});

app.listen(9001);
