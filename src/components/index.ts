import { App } from "vue";
import Designer from './designer';
import WidgetRender from './widgetRender';
import ActivedWrapper from './dragTools';

const componets = [
  Designer,
  WidgetRender,
  ActivedWrapper
];

export {
  Designer,
  WidgetRender,
  ActivedWrapper
}

export default function (app: App) {
  componets.forEach(comp => app.component(comp.name, comp));
}