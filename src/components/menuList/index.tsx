import { defineComponent, inject } from "vue";
import Draggable from "vuedraggable";

const getUid = (map: any): number => {
  let id = ~~(99999 * Math.random());
  if (map[id]) return getUid(map);
  return id;
};

export default defineComponent({
  name: "menuList",
  props: {
    name: {
      type: String,
      default: "组件区",
    },
    menus: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const context: any = inject("designerCtx");
    const clone = (data: any) => {
      let target = data.createWidgetConfiger();
      const _id = getUid(context.widgetsMap);
      if (context.activedWidget.value) {
        context.activedWidget.value._isActived = false;
      }
      target._id = _id;
      target._isActived = true;
      context.activedWidget.value = target;
      context.widgetsMap[_id] = target;
      return target;
    };
    const draggableProps = {
      animation: 100,
      group: { name: "default", pull: "clone", put: false },
      sort: false,
      list: props.menus,
      itemKey: "key",
      clone,
    };
    return () => {
      return (
        <div class="l-menus">
          <div class="tools-bar">{props.name}</div>
          <Draggable {...draggableProps}>
            {{
              item: ({ element }: any) => {
                return (
                  <div style={{ marginTop: "5px" }}>
                    {element.getMenuRender()}
                  </div>
                );
              },
            }}
          </Draggable>
        </div>
      );
    };
  },
});
