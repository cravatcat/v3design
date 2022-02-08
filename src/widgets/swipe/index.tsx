import { defineComponent } from "vue";
import { Swipe, SwipeItem } from "vant";

export default defineComponent({
  name: "wSwipe",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    return () => {
      const renderSwipeItems = () => {
        return (props.images as any).map((image: any) => {
          return (
            <SwipeItem key={image}>
              <img src={image} style={{ width: "100%" }}></img>
            </SwipeItem>
          );
        });
      };
      return (
        <Swipe autoplay="3000" lazy-render>
          {renderSwipeItems()}
        </Swipe>
      );
    };
  },
});
