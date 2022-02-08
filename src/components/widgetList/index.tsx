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
      handle: ".drag-handler",
    };
    return () => {
      return (
        <Draggable {...draggableProps}>
          {{
            item: ({ element, index }: any) => {
              return (
                <WidgetTools widget={element} index={index}>
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
