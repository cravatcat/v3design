import { defineComponent, inject, provide, ref } from "vue";
import WidgetTools from "../widgetTools";
import Draggable from "vuedraggable";
import "./index.scss";

export default defineComponent({
  name: "widgetRender",
  setup(props) {
    const context = inject("designerCtx");
    let widgets = (context as any).widgets;
    const draggableProps = {
      class: "widget-render-drapper",
      list: widgets,
      group: { name: "default" },
      animation: 100,
      itemKey: "_id",
      handle: ".widget-tools-wrapper",
    };
    return () => {
      return (
        <Draggable {...draggableProps}>
          {{
            item: ({ element }: any) => {
              return (
                <WidgetTools widget={element}>
                  {element.getWidgetInstance()}
                </WidgetTools>
              );
            },
          }}
        </Draggable>
      );
    };
  },
});
