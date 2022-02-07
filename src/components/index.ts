import { App } from "vue";
import Designer from "./designer";
import WidgetRender from "./widgetList";

const componets = [Designer, WidgetRender];

export { Designer, WidgetRender };

export default function (app: App) {
  componets.forEach((comp) => app.component(comp.name, comp));
}
