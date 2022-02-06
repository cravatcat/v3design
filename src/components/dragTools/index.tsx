import { computed, defineComponent, inject, watch, watchEffect } from "vue";
import './index.scss';

export default defineComponent({
  name: 'dragTools',
  props: {
    actived: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: -1,
    }
  },
  setup(props, { slots, emit }) {
    const wrapperCls = computed(() => {
      return {
        'drag-tools-wrapper': true,
        'actived': props.actived
      }
    });

    const widgetRenderCtx = inject('widgetRenderCtx');
    
    return () => {
      return (
        <div 
          class={wrapperCls.value} 
          onClick={() => (widgetRenderCtx as any).setActiveIndex(props.index)}
        >
          { slots.default!() }
        </div>
      )
    }
  }
})