// @flow
import PIXI from 'pixi.js';
import * as canvas from '../common/canvas';
import * as sierpinski from './Sierspinski';
import { Point } from './Point';

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const app = canvas.setup({ width: winWidth, height: winHeight, background: 0 });
const graphic = new PIXI.Graphics();
app.stage.addChild(graphic);

const depth = 8;

type Draw = (any[]) => void;
const draw: Draw = (list) => {
  if (Array.isArray(list[0])) {
    draw(list[0]);
    draw(list[1]);
    draw(list[2]);
  } else if (list[0] instanceof Point) {
    graphic.lineStyle(1, 0xffffff, 0.5);
    graphic.moveTo(list[0].x, list[0].y);
    graphic.lineTo(list[1].x, list[1].y);
    graphic.lineTo(list[2].x, list[2].y);
    graphic.closePath();
  }
};

let count = 0;

const reset = () => {
  graphic.clear();
  count = 0;
};

const drawPoints = (width, height) => (next) => {
  const radius = Math.min(width, height) / 2;
  const center = new Point(width / 2, height / 2);
  const a = new Point(center.x - radius, center.y + radius); // bottom left
  const b = new Point(center.x, center.y - radius); // top
  const c = new Point(center.x + radius, center.y + radius); // bottom right

  const points = sierpinski.plot(a, b, c)(next);
  draw(points);
};

const render = () => {
  count += 1;
  drawPoints(window.innerWidth, window.innerHeight)(Math.min(count, depth));
  if (count > depth) app.ticker.stop();
  else if (!app.ticker.started) app.ticker.start();
};

app.ticker.add(render);

window.addEventListener('resize', () => {
  canvas.resize(window.innerWidth, window.innerHeight)(app);
  reset();
  render();
});
