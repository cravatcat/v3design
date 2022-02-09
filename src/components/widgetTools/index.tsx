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
    id: {
      type: Number,
      default: -1,
    },
  },
  setup(props, { slots, emit }) {
    const wrapperCls = computed(() => {
      return {
        "widget-tools-wrapper": true,
        actived: !!props.widget._isActived,
        "is-layout": props.widget.isLayout,
      };
    });
    const context: any = inject("designerCtx");
    let prevActivedWidget = context.activedWidget;
    let widgets = context.widgets;
    const widgetsMap = context.widgetsMap;
    const handleClick = () => {
      if (prevActivedWidget.value === props.widget) return;
      if (props.widget.isLayout) {
      } else {
        if (prevActivedWidget.value) {
          prevActivedWidget.value._isActived = false;
        }
        props.widget._isActived = true;
        context.activedWidget.value = props.widget;
      }
    };
    const handleDeleteClick = () => {
      if (props.id !== -1 && widgetsMap[props.id]) {
        widgetsMap[props.id].children.splice(props.index, 1);
      } else {
        widgets.splice(props.index, 1);
      }
    };
    const handleLayoutBarClick = () => {
      if (prevActivedWidget.value === props.widget) return;
      if (prevActivedWidget.value) {
        prevActivedWidget.value._isActived = false;
      }
      props.widget._isActived = true;
      context.activedWidget.value = props.widget;
    };
    const renderDragHandler = () => {
      return props.widget._isActived && !props.widget.isLayout ? (
        <div class="drag-handler">
          <DragOutlined style="font-size: 18px; color: #fff" />
        </div>
      ) : null;
    };
    const renderTools = () => {
      return props.widget._isActived ? (
        <div class="tools-area">
          <div class="widget-name">{props.widget.widgetName}</div>
          <div class="delete-container" onClick={handleDeleteClick}>
            <DeleteOutlined style="font-size: 18px; color: #fff" />
          </div>
        </div>
      ) : null;
    };
    const renderLayoutHandler = () => {
      return props.widget.isLayout ? (
        <div class="layout-tools-area">
          <div class="drag-handler" onClick={handleLayoutBarClick}></div>
        </div>
      ) : null;
    };
    return () => {
      return (
        <div class={wrapperCls.value} onClick={handleClick}>
          {renderDragHandler()}
          {renderTools()}
          {renderLayoutHandler()}
          {slots.default!()}
        </div>
      );
    };
  },
});
