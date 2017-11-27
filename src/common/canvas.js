// @flow
import PIXI from 'pixi.js';

type Setup = (*) => PIXI.Application;
export const setup: Setup = (options) => {
  const app = new PIXI.Application(options);
  if (document.body) document.body.appendChild(app.view);
  return app;
};

type Clear = PIXI.Application => PIXI.Application;
export const clear: Clear = (app) => {
  app.stage.destroy();
  app.stage = new PIXI.Container();
  return app;
};
