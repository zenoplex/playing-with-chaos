// @flow
import PIXI from 'pixi.js';
import * as canvas from '../common/canvas';
import * as sirpinski from './sirpinski';
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

let maxDepth = 8;
const minDepth = 2;
let numShapes = 3;
let depth = minDepth;
let mod = 1;
const angleOffset = Math.random();

const reset = () => {
  graphic.clear();
  const minShapes = 3;
  numShapes = Math.floor(Math.random() * 5) + minShapes;
  maxDepth = 11 - numShapes;
};

const render = () => {
  graphic.clear();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const radius = Math.min(width, height) / 5;
  const center = new Point(width / 2, height / 2);
  const shapes = sirpinski.plot(center, radius, numShapes, 0.5, angleOffset)(depth);

  const len = shapes.length;
  for (let i = 0; i < len; i++) {
    const { position, radius: rad } = shapes[i];
    graphic.beginFill(0xffffff, 0.5);
    graphic.drawCircle(position.x, position.y, rad);
    graphic.endFill();
  }

  if (depth <= minDepth) mod = 1;
  else if (depth >= maxDepth) mod = -1;

  depth += mod;
};

setInterval(render, 400);

window.addEventListener('click', () => {
  reset();
});

window.addEventListener('resize', () => {
  canvas.resize(window.innerWidth, window.innerHeight)(app);
  reset();
});
