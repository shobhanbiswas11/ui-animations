import * as uiAnimations from "./animations";
export * from "./animations";

(function () {
  let w = window as any;
  w.uiAnimations = uiAnimations;
})();

const { toggle, open } = uiAnimations.ExpandableBtnTray(
  document.querySelector(".btn-tray") as HTMLElement
);

document.querySelector("button")?.addEventListener("click", async () => {
  // await uiAnimations.togglePosition(
  //   document.body.children[0] as HTMLElement,
  //   document.body.children[1] as HTMLElement
  // );

  toggle();
});
