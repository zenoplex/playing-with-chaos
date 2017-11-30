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

const radius = Math.min(width, height) / 2;
const center = new Point(width / 2, height / 2);
const a = new Point(center.x - radius, center.y + radius); // bottom left
const b = new Point(center.x, center.y - radius); // top
const c = new Point(center.x + radius, center.y + radius); // bottom right

type Draw = (any[]) => void;
const draw: Draw = (list) => {
  const len = list.length;
  for (let i = 0; i < len; i++) {
    const element = list[i];

    if (Array.isArray(element)) draw(element);

    graphic.lineStyle(1, 0xffffff);
    graphic.beginFill(0xffffff);
    if (i === 0) graphic.moveTo(element.x, element.y);
    else graphic.lineTo(element.x, element.y);
    if (i === len - 1) graphic.lineTo(list[0].x, list[0].y);
  }
  graphic.endFill();
};

const render = () => {
  const points = sierpinski.plot(a, b, c)(7);
  draw(points);
};
render();
