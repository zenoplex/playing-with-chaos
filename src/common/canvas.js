// @flow
import PIXI from 'pixi.js';

type Setup = (*) => PIXI.Application;
export const setup: Setup = (options) => {
  const app = new PIXI.Application(options);
  app.renderer.autoResize = true;
  app.view.style.width = '100%';
  app.view.style.height = '100%';
  if (document.body) document.body.appendChild(app.view);
  return app;
};

type Clear = PIXI.Application => PIXI.Application;
export const clear: Clear = (app) => {
  app.stage.destroy();
  app.stage = new PIXI.Container();
  return app;
};

type Resize = (number, number) => PIXI.Application => PIXI.Application;
export const resize: Resize = (width, height) => (app) => {
  app.renderer.resize(width, height);
  return app;
};
