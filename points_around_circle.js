const r = require("raylib");

function teardown() { r.CloseWindow(); }

function init() {
  const center = { x: 200, y: 200 };
  const radius = 150;
  const pointsCount = 12;
  const angleBetweenPoints = 360 / pointsCount;
  const pointRadius = 5;

  return {
    center,
    radius,
    pointsCount,
    angleBetweenPoints,
    pointRadius,
  };
}

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(400, 400, "Points Around a Circle");
  r.SetTargetFPS(60);

  const world = init();

  return world;
}

function toRadians(degrees) { return degrees * (Math.PI / 180); }

function getPoint(world, i) {
  const radians = toRadians(i * world.angleBetweenPoints);

  const x = world.radius * Math.sin(radians) + world.center.x;
  const y = world.radius * Math.cos(radians) + world.center.y;
  return { x, y };
}

function draw(world) {
  r.BeginDrawing();

  r.ClearBackground(r.BLACK);

  r.DrawRing(
    world.center,
    world.radius - 1,
    world.radius,
    0, 360, 80,
    r.ColorAlpha(r.WHITE, 0.5)
  );

  for (let i = 0; i < world.pointsCount; i++) {
    const point = getPoint(world, i);

    r.DrawCircleV(point, world.pointRadius, r.ColorAlpha(r.WHITE, 0.5));
  }

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
