// @flow
import * as math from '@gen/math';
import { Point } from '../common/Point';

type Shape = {
  position: Point,
  radius: number,
};

type Plot = (Point, number, number, number) => number => Shape[];
export const plot: Plot = (point, radius, shapeCount, scale = 0.5) => (depth) => {
  if (depth === 0) {
    return [
      {
        position: point,
        radius,
      },
    ];
  }

  const next = depth - 1;
  const nextRadius = radius * scale;

  // want to use reduce but too slow
  let list = [];
  for (let i = 0; i < shapeCount; i++) {
    const angle = math.TWO_PI / shapeCount * i;
    const p = new Point(
      point.x + math.cos(angle) * radius,
      point.y + math.sin(angle) * radius,
    );
    list = list.concat(plot(p, nextRadius, shapeCount, scale)(next));
  }

  return list;
};
