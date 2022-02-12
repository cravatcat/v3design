import { defineComponent, provide, reactive, ref } from "vue";
import menusData from "../../menus/index";
import MenuList from "../menuList";
import WidgetList from "../widgetList";
import { useRequest } from "../../uses";
import { message } from "ant-design-vue";
import "./index.scss";

export default defineComponent({
  name: "designer",
  setup(props, { slots }) {
    const loading = ref(false);
    const widgets = reactive([]);
    const activedWidget = ref(null);
    const widgetsMap = reactive({});
    const preRender = ref(false);
    provide("designerCtx", {
      widgets,
      widgetsMap,
      activedWidget,
    });
    const renderConfigArea = () => {
      if (!activedWidget.value) return null;
      return (activedWidget.value as any).getWidgetPropsRender();
    };
    const genConfig = (widgets: any) => {
      return widgets.map((widget: any) => {
        const w = widget?.getWidgetInstance();
        let children = widget?.children || [];
        children = genConfig(children);
        const { type, props } = w;
        return {
          name: type.name,
          props,
          children,
        };
      });
    };
    const handleBulidClick = async () => {
      loading.value = true;
      const lastConfig = genConfig(widgets);
      const { post } = useRequest();
      try {
        await post("/builder", {
          widgets: lastConfig,
          usePreRender: preRender.value,
        });
      } finally {
        loading.value = false;
        message.info("work done!");
      }
    };
    return () => {
      return (
        <div class="designer">
          <div class="l">
            <MenuList menus={menusData} />
          </div>
          <div class="m">
            <a-space direction="vertical">
              <div class="tools-bar">
                <a-checkbox v-model={[preRender.value, "checked"]}>
                  启用预渲染
                </a-checkbox>
                <a-button
                  type="primary"
                  onClick={handleBulidClick}
                  loading={loading.value}
                  disabled={!widgets.length}
                >
                  生成页面
                </a-button>
              </div>
              <WidgetList />
            </a-space>
          </div>
          <div class="r">
            <div class="tools-bar">配置区</div>
            {renderConfigArea()}
          </div>
        </div>
      );
    };
  },
});
