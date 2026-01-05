game.height = 800;
game.width = 800;
const BACKGROUND = "#101010";
const FOREGROUND = "green";
const ctx = game.getContext("2d");

function point({ x, y }) {
  const s = 20;
  ctx.fillStyle = FOREGROUND;
  ctx.fillRect(x - s / 2, y - s / 2, 20, 20);
}

function clear() {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, game.height, game.width);
}

function screen(p) {
  return {
    x: ((p.x + 1) / 2) * game.width,
    y: (1 - (p.y + 1) / 2) * game.height,
  };
}

function project({ x, y, z }) {
  return {
    x: x / z,
    y: y / z,
  };
}

const FPS = 60;
let dz = 0;
const verteces = [
  { x: -0.5, y: 0.5, z: -0.5 },
  { x: 0.5, y: 0.5, z: -0.5 },
  { x: -0.5, y: -0.5, z: -0.5 },
  { x: 0.5, y: -0.5, z: -0.5 },

  { x: -0.5, y: 0.5, z: 1 },
  { x: 0.5, y: 0.5, z: 1 },
  { x: -0.5, y: -0.5, z: 1 },
  { x: 0.5, y: -0.5, z: 1 },
];

function translate({ x, y, z }, dz) {
  return {
    x: x,
    y: y,
    z: z + dz,
  };
}

function frame() {
  let dt = 1 / FPS; //sync with timing
  dz += 1 * dt;
  clear();
  for (const v of verteces) {
    point(screen(project(translate(v, dz))));
  }
  setTimeout(frame, 1000 / FPS);
}

setTimeout(frame, 1000 / FPS);
