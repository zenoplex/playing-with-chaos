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

const maxDepth = 5;
const depth = 0;
const mod = 1;

const reset = () => {
  graphic.clear();
};

const render = () => {
  graphic.clear();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const radius = Math.min(width, height) / 5;
  const center = new Point(width / 2, height / 2);

  const shapes = sirpinski.plot(center, radius, 3)(maxDepth);

  const len = shapes.length;
  for (let i = 0; i < len; i++) {
    const { position, radius: rad } = shapes[i];
    graphic.beginFill(0xffffff, 0.5);
    graphic.drawCircle(position.x, position.y, rad);
    graphic.endFill();
  }
};

render();

// setInterval(render, 500);

window.addEventListener('resize', () => {
  canvas.resize(window.innerWidth, window.innerHeight)(app);
  reset();
  render();
});
