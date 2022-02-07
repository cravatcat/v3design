import { computed, defineComponent, inject, ref } from "vue";
import "./index.scss";

export default defineComponent({
  name: "widgetTools",
  props: {
    widget: {
      type: Object,
      default: {},
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
    const handleClick = () => {
      console.log();
      if (prevActivedWidget.value === props.widget) return;
      if (prevActivedWidget.value) {
        prevActivedWidget.value._isActived = false;
      }
      props.widget._isActived = true;
      context.activedWidget.value = props.widget;
    };
    return () => {
      return (
        <div class={wrapperCls.value} onClick={handleClick}>
          {slots.default!()}
        </div>
      );
    };
  },
});
