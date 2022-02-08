import { defineComponent, h, resolveComponent } from "vue";
import { wLayout } from './widgets';

const widgets = [{"name":"wLayout","props":null,"children":[]}];

export default defineComponent({
  components: {
    wLayout 
  },
  render() {
    return (
      <div class="w_widget-list-wrapper">
        {
          widgets.map((widget: any) => h(resolveComponent(widget.name), { ...widget.props }))
        }
      </div>
    )
  }
});