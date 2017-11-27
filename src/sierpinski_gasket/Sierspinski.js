// @flow
import * as math from '@gen/math';

const drawTriangle = (depth) => {
  const points = [];
  const angle = -Math.PI / 2;
  if (depth === 0) {
    points.push({ x: math.cos(angle), y: math.sin(angle) });
  }

  return points;
};

console.log(drawTriangle(0));
