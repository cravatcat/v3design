import { computed, defineComponent, inject } from "vue";
import { DragOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import "./index.scss";

export default defineComponent({
  name: "widgetTools",
  props: {
    widget: {
      type: Object,
      default: {},
    },
    index: {
      type: Number,
      default: -1,
    },
  },
  setup(props, { slots, emit }) {
    const wrapperCls = computed(() => {
      return {
        "widget-tools-wrapper": true,
        actived: !!props.widget._isActived,
      };
    });
    const context: any = inject("designerCtx");
    let prevActivedWidget = context.activedWidget;
    let widgets = context.widgets;
    const handleClick = () => {
      if (prevActivedWidget.value === props.widget) return;
      if (prevActivedWidget.value) {
        prevActivedWidget.value._isActived = false;
      }
      props.widget._isActived = true;
      context.activedWidget.value = props.widget;
    };

    const handleDeleteClick = () => {
      widgets.splice(props.index, 1);
    };

    const renderDragHandler = () => {
      return props.widget._isActived ? (
        <div class="drag-handler">
          <DragOutlined style="font-size: 18px; color: #fff" />
        </div>
      ) : null;
    };
    const renderTools = () => {
      return props.widget._isActived ? (
        <div class="tools-area">
          <div class="delete-container" onClick={handleDeleteClick}>
            <DeleteOutlined style="font-size: 18px; color: #fff" />
          </div>
        </div>
      ) : null;
    };
    return () => {
      return (
        <div class={wrapperCls.value} onClick={handleClick}>
          {renderDragHandler()}
          {renderTools()}
          {slots.default!()}
        </div>
      );
    };
  },
});
