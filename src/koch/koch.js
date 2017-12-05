// @flow
import * as math from '@gen/math';
import { Point } from '../common/Point';

type Depth = number;
type Plot = (Point, Point) => Depth => Point[];

export const plot: Plot = (p0, p1) => (depth) => {
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const unit = distance / 3;
  const angle = Math.atan2(dy, dx);

  const pa = new Point(
    p0.x + math.cos(angle) * unit,
    p0.y + math.sin(angle) * unit,
  );
  const rad60 = Math.PI / 3;
  const pb = new Point(
    pa.x + math.cos(angle - rad60) * unit,
    pa.y + math.sin(angle - rad60) * unit,
  );
  const pc = new Point(
    p0.x + math.cos(angle) * unit * 2,
    p0.y + math.sin(angle) * unit * 2,
  );

  if (depth === 0) {
    return [p0, pa, pb, pc, p1];
  }

  const next = depth - 1;
  return [
    ...plot(p0, pa)(next),
    ...plot(pa, pb)(next),
    ...plot(pb, pc)(next),
    ...plot(pc, p1)(next),
  ];
};
