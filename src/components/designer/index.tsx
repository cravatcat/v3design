import { defineComponent, provide, reactive, ref } from "vue";
import "./index.scss";
import Draggable from "vuedraggable";
import menus from "../../menus/index";
import { useRequest } from "../../uses";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "designer",
  setup(props, { slots }) {
    const activeTarget = ref(null);
    const loading = ref(false);
    const widgets = reactive([]);
    const setActiveTarget = (target: any) => (activeTarget.value = target);
    provide("designerCtx", {
      widgets,
      setActiveTarget,
    });
    const renderConfigArea = () => {
      if (!activeTarget.value) return null;
      return (activeTarget.value as any).getWidgetPropsRender();
    };
    const clone = (data: any) => data.createWidgetConfiger();
    const handleBulidClick = async () => {
      loading.value = true;
      const lastConfig = widgets.map((widget) => {
        const w = (widget as any).getWidgetInstance();
        const { type, props } = w;
        return {
          name: type.name,
          props,
          children: [],
        };
      });
      const { post } = useRequest();
      try {
        await post("/builder", {
          widgets: lastConfig,
        });
      } finally {
        loading.value = false;
        message.info("work done!");
      }
    };
    const draggableProps = {
      animation: 100,
      group: { name: "default", pull: "clone", put: false },
      sort: false,
      list: menus,
      itemKey: "key",
      clone,
    };
    return () => {
      return (
        <div class="designer">
          <div class="l">
            <Draggable {...draggableProps}>
              {{
                item: ({ element }: any) => {
                  return (
                    <div style={{ marginBottom: "5px" }}>
                      {element.getMenuRender()}
                    </div>
                  );
                },
              }}
            </Draggable>
          </div>
          <div class="m">
            <a-space direction="vertical">
              <div class="tools-bar">
                <a-button
                  type="primary"
                  onClick={handleBulidClick}
                  loading={loading.value}
                  disabled={!widgets.length}
                >
                  生成页面
                </a-button>
              </div>
              <widgetRender />
            </a-space>
          </div>
          <div class="r">{renderConfigArea()}</div>
        </div>
      );
    };
  },
});
