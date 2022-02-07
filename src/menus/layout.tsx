import { wLayout as Layout } from "../widgets";

const key = "w-layout";
const widgetName = "套娃组件";

const getMenuRender = () => {
  return <a-button block>{widgetName}</a-button>;
};

const createWidgetConfiger = () => {
  const getWidgetInstance = () => <Layout />;
  const getWidgetPropsRender = () => {
    return <div>未实现</div>;
  };
  return {
    getWidgetInstance,
    getWidgetPropsRender,
  };
};

export default {
  key,
  getMenuRender,
  createWidgetConfiger,
};
