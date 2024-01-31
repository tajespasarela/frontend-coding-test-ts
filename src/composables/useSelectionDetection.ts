import { ref } from "vue";

export function useSelectionDetection() {
  let pointerMovement: number;
  let startPoint: { x: number; y: number };
  const pointerMovementPxThreshold = 4;
  const isSelecting = ref(false);

  return {
    listeners: {
      pointerdown: (event: PointerEvent) => {
        isSelecting.value = false;
        startPoint = {
          x: event.clientX,
          y: event.clientY,
        };
      },
      pointermove: (event: PointerEvent) => {
        if (!startPoint) {
          return;
        }
        pointerMovement =
          Math.abs(startPoint.x - event.clientX) +
          Math.abs(startPoint.y - event.clientY);
        isSelecting.value = pointerMovement >= pointerMovementPxThreshold;
      },
    },
    isSelecting,
  };
}
