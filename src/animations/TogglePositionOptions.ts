import gsap from "gsap";
import { BasicForAnimation } from "../interface";

interface TogglePositionOptions extends Partial<BasicForAnimation> {
  callback?: () => void;
}

export function togglePosition(
  top: HTMLElement,
  bottom: HTMLElement,
  options?: TogglePositionOptions
) {
  let duration = options?.duration ?? 0.5;
  let ease = options?.ease ?? "Power1.easeOut";

  return new Promise((resolve, reject) => {
    try {
      if (top.getBoundingClientRect().y > bottom.getBoundingClientRect().y) {
        let tmp = top;
        top = bottom;
        bottom = tmp;
      }

      const topY = top.getBoundingClientRect().y;
      const bottomY = bottom.getBoundingClientRect().y;

      const shift = bottomY - topY;

      gsap.defaults({ duration, ease });

      gsap.to(top, { y: shift });
      gsap.to(bottom, { y: -shift }).eventCallback("onComplete", () => {
        const parent = top.parentElement;

        parent?.removeChild(bottom);
        parent?.insertBefore(bottom, top);

        gsap.set(top, { y: 0 });
        gsap.set(bottom, { y: 0 });

        if (options?.callback) {
          options.callback();
        }
        resolve();
      });
    } catch (error) {
      reject();
    }
  });
}
