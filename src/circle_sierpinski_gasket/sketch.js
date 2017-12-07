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
const angleOffset = Math.random();
const maxShapes = 5;
const minShapes = 3;
let numShapes = minShapes;
const numShapesMod = 1;
let depth = minDepth;
let depthMod = 1;

const reset = () => {
  graphic.clear();

  if (numShapes > maxShapes) numShapes = minShapes;
  numShapes += numShapesMod;
  maxDepth = Math.floor(8 - numShapes / 2);
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

  if (depth <= minDepth) depthMod = 1;
  else if (depth >= maxDepth) depthMod = -1;

  depth += depthMod;
};

setInterval(render, 400);

window.addEventListener('click', () => {
  reset();
});

window.addEventListener('resize', () => {
  canvas.resize(window.innerWidth, window.innerHeight)(app);
  reset();
});
