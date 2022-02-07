import { App } from "vue";
import Designer from "./designer";

const componets = [Designer];

export { Designer };

export default function (app: App) {
  componets.forEach((comp) => app.component(comp.name, comp));
}
