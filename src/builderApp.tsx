import { defineComponent, h, resolveComponent } from "vue";
import { wImage } from './widgets';

const widgets = [{"name":"wImage","props":{"src":"https://img.yzcdn.cn/vant/cat.jpeg"},"children":[]}];

export default defineComponent({
  components: {
    wImage 
  },
  render() {
    const widgetsRender = (widgets: any) => {
      return widgets.map((widget: any) =>
        h(
          resolveComponent(widget.name),
          { ...widget.props },
          widgetsRender(widget.children || null)
        )
      );
    };
    return (<div class="w_widget-list-wrapper">{widgetsRender(widgets)}</div>);
  },
});