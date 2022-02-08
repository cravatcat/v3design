import { ref } from "vue";
import { wLayout as Layout } from "../widgets";

const key = "w-layout";
const widgetName = "套娃组件";

const getMenuRender = () => {
  return <a-button block>{widgetName}</a-button>;
};

const createWidgetConfiger = () => {
  const isLayout = ref(true);
  const getWidgetInstance = () => <Layout />;
  const getWidgetPropsRender = () => {
    return (
      <a-alert
        message="套娃组件可以套组件，会有一个特殊的红色框，最上面的一条红色区域负责点击工作以及拖拽句柄"
        type="info"
      />
    );
  };
  return {
    isLayout,
    widgetName,
    getWidgetInstance,
    getWidgetPropsRender,
  };
};

export default {
  key,
  getMenuRender,
  createWidgetConfiger,
};
