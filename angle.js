const r = require("raylib");

function teardown() { r.CloseWindow(); }

function calculatePoint3(point1, point2) {
  const x = point2.x;
  const y = point1.y;

  return { x, y };
}

function init() {
  const point1 = { x: 100, y: 300 };
  const point2 = { x: 450, y: 150 };

  const point3 = calculatePoint3(point1, point2);

  const lineColor = r.WHITE;

  return {
    point1,
    point2,
    point3,
    lineColor,
  };
}

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(600, 600, "Polygon");
  r.SetTargetFPS(60);

  const world = init();

  world.angle = calculateAngle(world);

  return world;
}

function getOppLength(world) {
  return Math.abs(world.point3.y - world.point2.y);
}

function getLineLength(world) {
  return r.Vector2Distance(world.point1, world.point2);
}

function toDegrees(radians) { return radians * (180 / Math.PI); }

function calculateAngle(world) {
  const oppLength = getOppLength(world);
  const lineLength = getLineLength(world);

  const angle = Math.trunc(toDegrees(Math.asin(oppLength / lineLength)));
  return angle;
}

function drawLines(world) {
  r.DrawLineV(world.point1, world.point2, world.lineColor);
  r.DrawLineV(world.point1, world.point3, world.lineColor);
  r.DrawLineV(world.point2, world.point3, world.lineColor);
}

/* function drawAngleArc(world) {
  r.DrawCircleSectorLines(world.point1, 50, 90, 90 + world.angle, 40, world.lineColor);
} */

function writeAngle(world) {
  r.DrawText(`${world.angle}°`, world.point1.x, world.point1.y, 20, r.WHITE);
}

function draw(world) {
  r.BeginDrawing();

  r.ClearBackground(r.BLACK);

  drawLines(world);

  // drawAngleArc(world);

  writeAngle(world);

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
