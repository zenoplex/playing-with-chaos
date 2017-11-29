// @flow
import PIXI from 'pixi.js';
import * as canvas from '../common/canvas';
import * as sierpinski from './Sierspinski';

const width = window.innerWidth;
const height = window.innerHeight;
const app = canvas.setup({ width, height, background: 0 });
const container = new PIXI.Container();
const graphic = new PIXI.Graphics();
graphic.lineStyle(2, 0xffffff);
container.addChild(graphic);
container.x = width / 2;
container.y = height / 2;
app.stage.addChild(container);

const points = sierpinski.drawTriangle();

const render = () => {
  graphic.clear();
  graphic.beginFill(0xfffffff);

  const len = points.length;
  for (let i = 0; i < len; i++) {
    const point = points[i];
    if (i === 0) graphic.moveTo(point.x, point.y);
    else graphic.lineTo(point.x, point.y);
  }
  graphic.closePath();
  // graphic.endFill();
  container.scale.set(10, 10);
};
// app.ticker.add(render);

render();
