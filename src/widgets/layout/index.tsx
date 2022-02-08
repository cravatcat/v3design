import { defineComponent, inject, reactive } from "vue";
import WidgetTools from "../../components/widgetTools";
import Draggable from "vuedraggable";
import "./index.scss";

export default defineComponent({
  name: "wLayout",
  setup(props, { slots }) {
    const context = inject("designerCtx");
    let draggableProps = {
      class: "layout-wrapper",
      list: [],
      group: { name: "default" },
      animation: 100,
      itemKey: "_id",
      handle: ".drag-handler",
    };
    if (context) {
      let activedWidget = (context as any).activedWidget;
      if (!activedWidget.value.children) {
        activedWidget.value.children = reactive([]);
      }
      draggableProps = {
        class: "layout-wrapper",
        list: activedWidget.value.children,
        group: { name: "default" },
        animation: 100,
        itemKey: "_id",
        handle: ".drag-handler",
      };
    }

    const customRender = () => {
      if (context) {
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
      } else {
        return (
          <div class="layout">{slots.default ? slots.default() : null}</div>
        );
      }
    };
    return () => {
      return customRender();
    };
  },
});
