import { defineComponent } from 'vue';
import { Button } from 'vant';

export default defineComponent({
  name: 'wButton',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    return () => {
      return (
        <Button block>{ props.text }</Button>
      );
    }
  }
});