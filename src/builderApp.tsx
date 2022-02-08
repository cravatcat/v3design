import { defineComponent, h, resolveComponent } from "vue";
import { wLayout, wButton, wImage } from "./widgets";

const widgets = [
  {
    name: "wLayout",
    props: null,
    children: [
      { name: "wButton", props: { text: "按钮" }, children: [] },
      {
        name: "wImage",
        props: { src: "https://img.yzcdn.cn/vant/cat.jpeg" },
        children: [],
      },
    ],
  },
];

export default defineComponent({
  components: {
    wLayout,
    wButton,
    wImage,
  },
  render() {
    return (
      <div class="w_widget-list-wrapper">
        {widgets.map((widget: any) =>
          h(resolveComponent(widget.name), { ...widget.props })
        )}
      </div>
    );
  },
});
