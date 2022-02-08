import { reactive } from "vue";
import { wSwipe as Swipe } from "../widgets";

const key = "w-swipe";
const widgetName = "轮播";

const getMenuRender = () => {
  return <a-button block>{widgetName}</a-button>;
};

const createWidgetConfiger = () => {
  const widgetProps = reactive({
    images: [
      "https://img.yzcdn.cn/vant/apple-1.jpg",
      "https://img.yzcdn.cn/vant/apple-2.jpg",
      "https://img.yzcdn.cn/vant/apple-3.jpg",
    ],
  });
  const getWidgetInstance = () => <Swipe images={widgetProps.images} />;
  const getWidgetPropsRender = () => {
    return <a-alert message="轮播图props稍后处理" type="info" />;
  };
  return {
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
