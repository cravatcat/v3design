import { reactive } from "vue";
import { wButton as Button } from "../widgets";

const key = "w-button";
const widgetName = "按钮";

const getMenuRender = () => {
  return <a-button block>{widgetName}</a-button>;
};

const createWidgetConfiger = () => {
  const widgetProps = reactive({
    text: "按钮",
  });
  const getWidgetInstance = () => <Button text={widgetProps.text} />;
  const getWidgetPropsRender = () => {
    return (
      <a-form model={widgetProps}>
        <a-form-item
          label="按钮文案"
          name="text"
          rules={[{ required: true, message: "按钮文案" }]}
        >
          <a-input
            v-model={[widgetProps.text, "value"]}
            placeholder="请输入按钮文案"
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
