import gsap from "gsap";
import { BasicForAnimation } from "../interface";

interface ExpandableBtnTrayOptions extends Partial<BasicForAnimation> {
  gap?: number;
  topElement?: HTMLElement;
}

export function ExpandableBtnTray(
  container: HTMLElement,
  options?: ExpandableBtnTrayOptions
) {
  let gap = options?.gap ?? 10;
  let duration = options?.duration ?? 0.5;
  let ease = options?.ease ?? "Power1.easeOut";
  let topElement =
    options?.topElement || (container.firstElementChild as HTMLElement);

  const timeline = gsap.timeline({
    defaults: { duration: duration / 2 + 0.2, ease: ease },
  });

  const itemCount = container.children.length;
  const genericItem = container.children[0];

  const itemWidth = genericItem?.getBoundingClientRect().width;
  const itemHeight = genericItem?.getBoundingClientRect().height;

  const containerWidth = itemWidth + 2 * gap;
  const containerHeightInitial = itemHeight + 2 * gap;
  const containerHeightFinal = (itemHeight + gap) * itemCount + gap;

  container.style.position = "relative";
  container.style.height = containerHeightInitial + "px";
  container.style.width = containerWidth + "px";

  for (const item of container.children as HTMLCollectionOf<HTMLElement>) {
    item.style.position = "absolute";
    item.style.top = gap + "px";
    item.style.left = gap + "px";
    item.style.zIndex = "0";
  }

  topElement.style.zIndex = "2";

  timeline
    .to(container, { height: containerHeightFinal })
    .to(
      container.children,
      {
        top: (i) => {
          return gsap.utils.mapRange(
            0,
            itemCount - 1,
            gap,
            containerHeightFinal - (gap + itemHeight),
            i
          );
        },
      },
      "-=.2"
    )
    .reversed(true);

  return {
    gsap,
    timeline,
    toggle: function () {
      timeline.reversed(!timeline.reversed());
    },
    open: function () {
      if (timeline.reversed()) timeline.reversed(false);
    },
    close: function () {
      if (!timeline.reversed()) timeline.reversed(true);
    },
  };
}
