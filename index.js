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
let dz = 1;
const verteces = [
  { x: 0.25, y: 0.25, z: -0.25 },
  { x: -0.25, y: 0.25, z: -0.25 },
  { x: -0.25, y: -0.25, z: -0.25 },
  { x: 0.25, y: -0.25, z: -0.25 },

  { x: 0.25, y: 0.25, z: 0.25 },
  { x: -0.25, y: 0.25, z: 0.25 },
  { x: -0.25, y: -0.25, z: 0.25 },
  { x: 0.25, y: -0.25, z: 0.25 },
];

function translate({ x, y, z }, dz) {
  return {
    x: x,
    y: y,
    z: z + dz,
  };
}

let angle = 0;
function rotate_xz({ x, y, z }, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    x: x * c - z * s,
    y,
    z: x * s + z * c,
  };
}

const fs = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [0, 4],
  [1, 5], 
  [2, 6],
  [3, 7]
];

  // [0, 4],
  // [1, 5],
  // [2, 6],
  // [3, 7],
  // [0, 2],
  // [1, 3],
  // [4, 6], 
  // [5, 7]

function line(s, e) {
  ctx.lineWidth = 3
  ctx.strokeStyle = FOREGROUND;
  ctx.beginPath();
  ctx.moveTo(s.x, s.y);
  ctx.lineTo(e.x, e.y);
  ctx.stroke();
}

function frame() {
  let dt = 1 / FPS; //sync with timing

  //dz += 1 * dt;
  angle += (Math.PI * dt) / 2;
  clear();
  // for (const v of verteces) {
  //   point(screen(project(translate(rotate_xz(v, angle), dz))));
  // }
  for (const f of fs) {
    for (let i = 0; i < f.length; ++i) {
      const a = verteces[f[i]];
      const b = verteces[f[(i + 1) % f.length]];
      line(
        screen(project(translate(rotate_xz(a, angle), dz))),
        screen(project(translate(rotate_xz(b, angle), dz))),
      );
    }
  }
  setTimeout(frame, 1000 / FPS);
}

setTimeout(frame, 1000 / FPS);
