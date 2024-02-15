import './load';
import Game from './class/Game';
import settings from './settings';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;

canvas.width = settings.width;
canvas.height = settings.height;

const game = new Game(
  context,
  canvas.width, 
  canvas.height
);

game.start();