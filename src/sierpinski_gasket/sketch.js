// @flow
import PIXI from 'pixi.js';
import * as canvas from '../common/canvas';
import * as s from './Sierspinski';

const width = window.innerWidth;
const height = window.innerHeight;
const app = canvas.setup({ width, height, background: 0 });
const graphic = new PIXI.Graphics();
app.stage.addChild(graphic);
graphic.lineStyle(2, 0xffffff);
const render = () => {
  graphic.moveTo(0, 0);
  graphic.lineTo(width / 2, height / 2);
};
// app.ticker.add(render);

render();
