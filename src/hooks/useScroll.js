import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";

export default function useScroll(elRef) {
  let el = document;

  const isReachBottom = ref(false);

  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);

  const scrollListenerHandler = throttle(() => {
    if (el === document) {
      clientHeight.value = el.documentElement.clientHeight;
      scrollTop.value = el.documentElement.scrollTop;
      scrollHeight.value = el.documentElement.scrollHeight;
    } else {
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
    }
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      isReachBottom.value = true;
    }
  }, 100);

  onMounted(() => {
    if (elRef) el = elRef.value;
    el.addEventListener("scroll", scrollListenerHandler);
  });

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  });

  return { isReachBottom, scrollTop };
}
