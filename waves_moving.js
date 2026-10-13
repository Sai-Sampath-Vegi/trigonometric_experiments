const r = require("raylib");

function teardown() { r.CloseWindow(); }

function init() {
  const startX = 50;
  const endX = r.GetScreenWidth() - startX;
  const y = 200;
  const frequencyOfWave = 150;
  const sineWaveColor = r.GREEN;
  const cosineWaveColor = r.RED;
  const waveThickness = 3;
  const pointRadius = 5;
  const pointColor = r.WHITE;
  const cf = 0;

  return {
    startX,
    endX,
    y,
    frequencyOfWave,
    sineWaveColor,
    cosineWaveColor,
    waveThickness,
    pointRadius,
    pointColor,
    cf,
  };
}

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(600, 400, "Waves");
  r.SetTargetFPS(60);

  const world = init();

  return world;
}

function update(world) {
  world.cf++;
}

function toRadians(degrees) { return degrees * (Math.PI / 180); }

function getPoint(world, angle, waveFunction) {
  const radians = toRadians(angle);

  const x = angle + world.startX - (world.cf % r.GetScreenWidth());
  const y = -waveFunction(radians) * world.frequencyOfWave + world.y;
  return { x, y };
}

function drawHorizontalAxis(world) {
  const start = { x: world.startX, y: world.y };
  const end = { x: world.endX, y: world.y };
  r.DrawLineEx(start, end, 3, r.WHITE);
}

function connectPoints(world, point1, point2, waveColor) {
  r.DrawLineEx(point1, point2, world.waveThickness, waveColor);
}

function drawWave(world, waveFunction, waveColor) {
  for (let x = 0 + (world.cf % r.GetScreenWidth()); x <= (world.endX - world.startX) + (world.cf % r.GetScreenWidth()); x++) {
    const point1 = getPoint(world, x, waveFunction);
    const point2 = getPoint(world, x + 1, waveFunction);

    connectPoints(world, point1, point2, waveColor);
  }
}

function drawSineWave(world, waveColor) {
  drawWave(world, Math.sin, waveColor);
}

function drawCosineWave(world, waveColor) {
  drawWave(world, Math.cos, waveColor);
}

function draw(world) {
  r.BeginDrawing();

  r.ClearBackground(r.BLACK);

  drawHorizontalAxis(world);

  drawSineWave(world, world.sineWaveColor);
  drawCosineWave(world, world.cosineWaveColor);

  r.EndDrawing();
}

function loop(world) {
  while (!r.WindowShouldClose()) {
    update(world);
    draw(world);
  }
}

function main() {
  const world = setup();
  loop(world);
  teardown();
}

main();
