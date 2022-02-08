import { reactive } from "vue";
import { wImage as Image } from "../widgets";

const key = "w-image";
const widgetName = "图片";

const getMenuRender = () => {
  return <a-button block>{widgetName}</a-button>;
};

const createWidgetConfiger = () => {
  const widgetProps = reactive({
    src: "https://img.yzcdn.cn/vant/cat.jpeg",
  });
  const getWidgetInstance = () => <Image src={widgetProps.src} />;
  const getWidgetPropsRender = () => {
    return (
      <a-form model={widgetProps}>
        <a-form-item
          label="图片地址"
          name="src"
          rules={[{ required: true, message: "图片地址必填" }]}
        >
          <a-input
            v-model={[widgetProps.src, "value"]}
            placeholder="请输入图片地址"
          />
        </a-form-item>
      </a-form>
    );
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
