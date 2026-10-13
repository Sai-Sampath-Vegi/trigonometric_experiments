const r = require("raylib");

function teardown() { r.CloseWindow(); }

function init() {
  const center = { x: 200, y: 200 };
  const startX = 50;
  const endX = r.GetScreenWidth() - startX;
  const y = 200;
  const pathRadius = 100;
  const frequencyOfWave = 150;
  const sineWaveColor = r.GREEN;
  const cosineWaveColor = r.RED;
  const waveThickness = 3;
  const pointRadius = 5;
  const pointColor = r.WHITE;

  return {
    center,
    startX,
    endX,
    y,
    pathRadius,
    frequencyOfWave,
    sineWaveColor,
    cosineWaveColor,
    waveThickness,
    pointRadius,
    pointColor,
  };
}

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(400, 400, "Waves");
  r.SetTargetFPS(60);

  const world = init();

  return world;
}

function toRadians(degrees) { return degrees * (Math.PI / 180); }

function getPointOnCircle(world, angle) {
  const x = world.center.x * Math.sin(toRadians(angle)) * world.pathRadius;
  const y = world.center.y * Math.cos(toRadians(angle)) * world.pathRadius;
  return { x, y };
}

function getPoint(world, angle, waveFunction) {
  const radians = toRadians(angle);

  const point = getPointOnCircle(world, angle);

  const x = angle + world.center.x + point.x;
  const y = -waveFunction(radians) * world.frequencyOfWave + world.center.y + point.y;
  return { x, y };
}

function drawHorizontalAxis(world) {
  const start = { x: world.startX, y: world.y };
  const end = { x: world.endX, y: world.y };
  r.DrawLineEx(start, end, 3, r.WHITE);
}

function drawMaxFrequencyLine(world) {
  const start = { x: world.startX, y: world.y - world.frequencyOfWave };
  const end = { x: world.endX, y: world.y - world.frequencyOfWave };
  r.DrawLineEx(start, end, 1, r.WHITE);
}

function connectPoints(world, point1, point2, waveColor) {
  r.DrawLineEx(point1, point2, world.waveThickness, waveColor);
}

function drawWave(world, waveFunction, waveColor) {
  for (let x = 0; x <= 360; x++) {
    const point1 = getPoint(world, x, waveFunction);
    const point2 = getPoint(world, x + 1, waveFunction);

    connectPoints(world, point1, point2, waveColor);
  }
}

function markPoints(world) {
  const points = [];

  const sinDegreesToMark = [0, 90, 270];
  const cosineDegreesToMark = [0, 180];

  for (const degrees of sinDegreesToMark)
    points.push(getPoint(world, degrees, Math.sin));

  for (const degrees of cosineDegreesToMark)
    points.push(getPoint(world, degrees, Math.cos));

  for (const point of points) {
    r.DrawCircleV(point, world.pointRadius, world.pointColor);
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

  // drawHorizontalAxis(world);
  // drawMaxFrequencyLine(world);

  drawSineWave(world, world.sineWaveColor);
  drawCosineWave(world, world.cosineWaveColor);

  markPoints(world);

  r.EndDrawing();
}

function loop(world) {
  while (!r.WindowShouldClose()) {
    draw(world);
  }
}

function main() {
  const world = setup();
  loop(world);
  teardown();
}

main();
