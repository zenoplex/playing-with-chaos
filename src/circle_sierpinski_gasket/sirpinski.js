// @flow
import * as math from '@gen/math';
import { Point } from '../common/Point';

type Plot = (Point, number, number) => number => any;
export const plot: Plot = (point, radius, shapeCount) => (depth) => {
  if (depth === 0) {
    return [
      {
        position: point,
        radius,
      },
    ];
  }

  const next = depth - 1;
  const nextRadius = radius * 0.4;

  const p0 = new Point(
    point.x + math.cos(0) * radius,
    point.y + math.sin(0) * radius,
  );

  const rad120 = Math.PI * 2 / 3;
  const p1 = new Point(
    point.x + math.cos(rad120) * radius,
    point.y + math.sin(rad120) * radius,
  );

  const rad240 = Math.PI * 4 / 3;
  const p2 = new Point(
    point.x + math.cos(rad240) * radius,
    point.y + math.sin(rad240) * radius,
  );

  return [
    ...plot(p0, nextRadius, shapeCount)(next),
    ...plot(p1, nextRadius, shapeCount)(next),
    ...plot(p2, nextRadius, shapeCount)(next),
  ];
};
