import { defineComponent, h, resolveComponent } from "vue";
import { wImage, wButton } from './widgets';

const widgets = [{"name":"wImage","props":{"src":"https://img.yzcdn.cn/vant/cat.jpeg"},"children":[]},{"name":"wButton","props":{"text":"按钮"},"children":[]}];

export default defineComponent({
  components: {
    wImage,wButton 
  },
  render() {
    return (
      <div class="w_widget-list-wrapper">
        {
          widgets.map((widget: any) => h(resolveComponent(widget.name), { ...widget.props }))
        }
      </div>
    )
  }
});