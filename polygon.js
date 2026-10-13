const r = require("raylib");

function teardown() { r.CloseWindow(); }

function init() {
  const center = { x: 200, y: 200 };
  const radius = 150;
  const numberOfSides = 8;
  const angleBetweenPoints = 360 / numberOfSides;

  return {
    center,
    radius,
    numberOfSides,
    angleBetweenPoints,
  };
}

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(400, 400, "Polygon");
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

function drawPolygon(world) {
  for (let i = 0; i < world.numberOfSides; i++) {
    const point1 = getPoint(world, i);
    const point2 = getPoint(world, i + 1);

    r.DrawLineV(point1, point2, r.WHITE);
  }
}

function draw(world) {
  r.BeginDrawing();

  r.ClearBackground(r.BLACK);

  drawPolygon(world);

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
