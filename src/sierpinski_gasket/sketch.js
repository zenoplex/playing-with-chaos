// @flow
import PIXI from 'pixi.js';
import * as canvas from '../common/canvas';
import * as sierpinski from './Sierspinski';
import { Point } from './Point';

const width = window.innerWidth;
const height = window.innerHeight;
const app = canvas.setup({ width, height, background: 0 });
const container = new PIXI.Container();
const graphic = new PIXI.Graphics();
container.addChild(graphic);
app.stage.addChild(container);

const depth = 8;
const radius = Math.min(width, height) / 2;
const center = new Point(width / 2, height / 2);
const a = new Point(center.x - radius, center.y + radius); // bottom left
const b = new Point(center.x, center.y - radius); // top
const c = new Point(center.x + radius, center.y + radius); // bottom right

type Draw = (any[]) => void;
const draw: Draw = (list) => {
  if (Array.isArray(list[0])) {
    draw(list[0]);
    draw(list[1]);
    draw(list[2]);
  } else if (list[0] instanceof Point) {
    graphic.lineStyle(1, 0xffffff);
    graphic.beginFill(0xffffff, 0.4);
    graphic.moveTo(list[0].x, list[0].y);
    graphic.lineTo(list[1].x, list[1].y);
    graphic.lineTo(list[2].x, list[2].y);
    graphic.closePath();
    graphic.endFill();
  }
};

const render = (count = 0) => {
  graphic.clear();

  const next = count + 1;
  const points = sierpinski.plot(a, b, c)(next);
  draw(points);

  if (next < depth) setTimeout(() => render(next), 200);
};
render();
