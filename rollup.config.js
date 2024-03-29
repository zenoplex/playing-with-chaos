import glob from 'glob';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import html from '@gen/rollup-plugin-generate-html';

const plugins = [
  resolve(),
  babel({ runtimeHelpers: true, exclude: 'node_modules/**' }),
  commonjs(),
];

const configs = glob.sync('src/**/sketch.js').map(input => ({
  input,
  external: ['pixi.js'],
  globals: { 'pixi.js': 'PIXI' },
  output: [{ file: input.replace(/^src/, 'dist'), format: 'umd' }],
  plugins: [...plugins, html({ template: './template.html' })],
}));

export default configs;
