// @flow
import PIXI from 'pixi.js';
import * as canvas from '../common/canvas';
import * as koch from './koch';
import { Point } from '../common/Point';

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const app = canvas.setup({
  width: winWidth,
  height: winHeight,
  background: 0,
  roundPixels: true,
});
const graphic = new PIXI.Graphics();
app.stage.addChild(graphic);

const maxDepth = 5;
let depth = 0;
let mod = 1;

const reset = () => {
  graphic.clear();
};

const render = () => {
  graphic.clear();
  const p0 = new Point(0, winHeight / 2);
  const p1 = new Point(winWidth, winHeight / 2);

  if (depth <= 0) mod = 1;
  else if (depth >= maxDepth) mod = -1;
  depth += mod;
  const points = koch.plot(p0, p1)(depth);

  const len = points.length;
  for (let i = 0; i < len; i++) {
    const point = points[i];
    graphic.lineStyle(1, 0xffffff);
    if (i === 0) graphic.moveTo(point.x, point.y);
    graphic.lineTo(point.x, point.y);
  }
};

setInterval(render, 500);

window.addEventListener('resize', () => {
  canvas.resize(window.innerWidth, window.innerHeight)(app);
  reset();
  render();
});
