// @flow

type Size = {
  width: number,
  height: number,
};

export const setSize: Size => (_?: HTMLCanvasElement) => HTMLCanvasElement = ({
  width,
  height,
}) => (canvas) => {
  if (!canvas) canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  return canvas;
};
