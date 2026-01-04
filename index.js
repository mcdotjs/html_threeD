game.height = 800;
game.width = 800;
const FOREGROUND = "#101010";
const BACKGROUND = "green";
const ctx = game.getContext("2d");
clear();
point(screen({ x: 0, y: 0 }));

function point({ x, y }) {
  ctx.fillRect(x, y, 10, 10);
  ctx.fillStyle = FOREGROUND;
}

function clear() {
  ctx.fillRect(0, 0, game.height, game.width);
  ctx.fillStyle = BACKGROUND;
}

function screen(p) {
  return {
    x: ((p.x + 1) / 2) * game.width,
    y: ((p.y + 1) / 2) * game.height,
  };
}
