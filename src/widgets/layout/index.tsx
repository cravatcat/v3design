import { defineComponent, inject, reactive } from "vue";
import WidgetTools from "../../components/widgetTools";
import Draggable from "vuedraggable";
import "./index.scss";

export default defineComponent({
  name: "wLayout",
  setup(props) {
    const context = inject("designerCtx");
    let activedWidget = (context as any).activedWidget;
    if (!activedWidget.value.chidren) {
      activedWidget.value.chidren = reactive([]);
    }
    const draggableProps = {
      class: "layout-wrapper",
      list: activedWidget.value.chidren,
      group: { name: "default" },
      animation: 100,
      itemKey: "_id",
      handle: ".drag-handler",
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
