// @flow
import { Point } from './Point';

type MidPoint = (Point, Point) => Point;
const midPoint: MidPoint = (a, b) =>
  new Point((a.x + b.x) / 2, (a.y + b.y) / 2);

type Level = number;
// type Points = Point[] | Points[]; This doesn't work
type Plot = (Point, Point, Point) => Level => any[];
export const plot: Plot = (a, b, c) => (level) => {
  if (level === 0) {
    return [a, b, c];
  }

  const next = level - 1;
  const a2b = midPoint(a, b);
  const b2c = midPoint(b, c);
  const c2a = midPoint(c, a);

  const ap = plot(a, a2b, c2a)(next); // bottom left
  const bp = plot(a2b, b, b2c)(next); // top
  const cp = plot(c2a, b2c, c)(next); // bottom right

  return [ap, bp, cp];
};
