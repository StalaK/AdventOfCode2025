// https://adventofcode.com/2025/day/7

import fs from "node:fs";

export default function Day7() {
  const dataRaw = fs.readFileSync("Day7/day7.txt", "utf8");
  const data = dataRaw.split("\n").filter((line) => line.trim());

  Part1(data);
  Part2(data);
}

function Part1(data) {
  let toExplore = [{ x: data[0].indexOf("S"), y: 0 }];
  let explored = [];
  let splitCount = 0;

  while (toExplore.length > 0) {
    let { x, y } = toExplore.pop();
    const down = y + 1;

    if (down < data.length) {
      if (data[down][x] === "^") {
        if (
          !(
            explored.find((pos) => pos.x === x - 1 && pos.y === down) &&
            explored.find((pos) => pos.x === x + 1 && pos.y === down)
          )
        ) {
          if (!explored.find((pos) => pos.x === x + 1 && pos.y === down)) {
            toExplore.push({ x: x + 1, y: down });
          }

          if (!explored.find((pos) => pos.x === x - 1 && pos.y === down)) {
            toExplore.push({ x: x - 1, y: down });
          }

          splitCount++;
        }
      } else {
        toExplore.push({ x, y: down });
      }
    }

    explored.push({ x, y });
  }

  console.log("Part 1:", splitCount);
}

function Part2(data) {
  let explored = [];
  let pathCount = explore(data, data[0].indexOf("S"), 0, explored);
  console.log("Part 2:", pathCount);
}

function explore(data, x, y, explored) {
  if (y >= data.length-1)
    return 1;
  
  let prev = explored.find(val => val.x === x && val.y === y);
  if (prev) {
    return prev.count;
  }

  let count = 0;

  if (data[y][x] === "^") {
    count += explore(data, x+1, y+1, explored);
    count += explore(data, x-1, y+1, explored);

  } else {
    count += explore(data, x, y+1, explored);
  }

  explored.push({ x:x, y:y, count: count});
  return count;
}