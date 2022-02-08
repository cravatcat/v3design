import { defineComponent, h, resolveComponent } from "vue";
import { wSwipe } from './widgets';

const widgets = [{"name":"wSwipe","props":{"images":["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg"]},"children":[]}];

export default defineComponent({
  components: {
    wSwipe 
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