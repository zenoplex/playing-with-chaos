// @flow
import PIXI from 'pixi.js';
import * as canvas from '../common/canvas';
import * as koch from '../koch/koch';
import { Point } from '../common/Point';

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const app = canvas.setup({
  width: winWidth,
  height: winHeight,
  background: 0,
  roundPixels: true,
});
const texture = new PIXI.RenderTexture.create(winWidth, winHeight); // eslint-disable-line
const sprite = new PIXI.Sprite(texture);
const graphic = new PIXI.Graphics();
app.stage.addChild(sprite);

const maxDepth = 5;
let depth = 0;
let mod = 1;

const reset = () => {
  graphic.clear();
};

const render = () => {
  graphic.clear();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const radius = Math.min(width, height) / 2 * 0.6;
  const center = new Point(width / 2, height / 2);
  const p0 = new Point(center.x - radius, center.y + radius);
  const p1 = new Point(center.x, center.y - radius);
  const p2 = new Point(center.x + radius, center.y + radius);

  if (depth <= 0) mod = 1;
  else if (depth >= maxDepth) mod = -1;
  depth += mod;
  const points = [
    ...koch.plot(p0, p1)(depth),
    ...koch.plot(p1, p2)(depth),
    ...koch.plot(p2, p0)(depth),
  ];

  const len = points.length;
  for (let i = 0; i < len; i++) {
    const point = points[i];
    graphic.lineStyle(1, 0xffffff, 0.7);
    if (i === 0) graphic.moveTo(point.x, point.y);
    graphic.lineTo(point.x, point.y);
  }
  app.renderer.render(graphic, texture);
};

setInterval(render, 300);

window.addEventListener('resize', () => {
  canvas.resize(window.innerWidth, window.innerHeight)(app);
  reset();
  render();
});
