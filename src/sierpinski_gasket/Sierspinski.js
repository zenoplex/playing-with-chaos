// @flow
import * as math from '@gen/math';

type Point = {
  x: number,
  y: number,
};

type DrawTriangle = number => Point[];
export const drawTriangle: DrawTriangle = (depth = 0) => {
  const points = [];
  let angle = -Math.PI / 2;
  if (depth === 0) {
    points.push({ x: math.cos(angle), y: math.sin(angle) });
    angle += Math.PI * 2 / 3;
    points.push({ x: math.cos(angle), y: math.sin(angle) });
    angle += Math.PI * 2 / 3;
    points.push({ x: math.cos(angle), y: math.sin(angle) });
  }

  return points;
};
