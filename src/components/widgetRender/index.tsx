import { defineComponent, inject, provide, reactive, ref } from "vue";
import Draggable from 'vuedraggable';
import './index.scss';

export default defineComponent({
  name: 'widgetRender',
  setup(props) {
    const designerCtx = inject('designerCtx');
    let children = (designerCtx as any).widgets;
    let activeIndex = ref(-1);
    const setActiveIndex = (index: number) => {
      activeIndex.value = index;
      let target = children[activeIndex.value];
      (designerCtx as any).setActiveTarget(target);
    };
    provide('widgetRenderCtx', {
      setActiveIndex,
    });
    const onAdd = (data: any) => {
      activeIndex.value = data.newIndex;
      let target = children[activeIndex.value];
      (designerCtx as any).setActiveTarget(target);
    }
    const onEnd = (data: any) => {
      activeIndex.value = data.newIndex;
      let target = children[activeIndex.value];
      (designerCtx as any).setActiveTarget(target);
    }
    const draggableProps = {
      class: "widget-render-drapper",
      list: children,
      group: { name: 'default' },
      animation: 100,
      itemKey: "key",
      handle: '.drag-tools-wrapper',
      onAdd,
      onEnd
    };
    return () => {
      return (
        <Draggable { ...draggableProps }>
        {
          {
            item: ({ element, index } : any) => {
              return (
                <dragTools actived={index === activeIndex.value} index={index}>
                  { element.getWidgetInstance() }
                </dragTools>
              );
            }
          }
        }
      </Draggable>
      )
    }
  }
});