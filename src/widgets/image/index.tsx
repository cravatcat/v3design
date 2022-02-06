import { defineComponent } from "vue";
import { Image } from "vant";

export default defineComponent({
  name: "wImage",
  props: {
    src: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    return () => {
      return <Image src={props.src} width="100%" />;
    };
  },
});
