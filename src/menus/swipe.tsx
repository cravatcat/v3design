import { reactive, ref } from "vue";
import { wSwipe as Swipe } from "../widgets";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";

const key = "w-swipe";
const widgetName = "轮播";

const getMenuRender = () => {
  return <a-button block>{widgetName}</a-button>;
};

const createWidgetConfiger = () => {
  const getFormItemLayout = (showLayout: boolean = false) => {
    return showLayout 
      ? {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      }
      : {}
  }
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  const removeImage = (image: string, index: number) => {
    widgetProps.images.splice(index, 1);
  };
  const addImage = () => {
    widgetProps.images.push('');
  }
  const widgetProps = reactive({
    images: [
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg',
      'https://img.yzcdn.cn/vant/apple-3.jpg'
    ],
  });
  const getWidgetInstance = () => <Swipe images={widgetProps.images} />;
  const getWidgetPropsRender = () => {
    return (
      <a-form {...formItemLayoutWithOutLabel}>
        {
          widgetProps.images.map((image, index) => {
            return (
              <a-form-item 
                key={index} 
                label={index === 0 ? '图片地址' : ''}
                {...getFormItemLayout(index === 0)}
              >
                <a-input
                  v-model={[widgetProps.images[index], 'value']}
                  placeholder="请输入图片地址"
                  style="width: 60%; margin-right: 8px"
                />
                {
                  widgetProps.images.length > 1 
                    ? <MinusCircleOutlined 
                        class="dynamic-delete-button"
                        onClick={() => removeImage(image, index)}
                       />
                    : null
                }
              </a-form-item>
            );
          })
        }
        <a-form-item {...formItemLayoutWithOutLabel}>
          <a-button 
            type="dashed"
            style="width: 60%"
            onClick={addImage}
          >
            <PlusOutlined />
            添加地址框
          </a-button>
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
