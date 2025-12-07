// https://adventofcode.com/2025/day/7

import fs from "node:fs";

export default function Day7() {
  const dataRaw = fs.readFileSync("Day7/day7.sample.txt", "utf8");
  const data = dataRaw.split("\n").filter((line) => line.trim());

  //Part1(data);
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
            beamPaths++;
          }

          if (!explored.find((pos) => pos.x === x - 1 && pos.y === down)) {
            toExplore.push({ x: x - 1, y: down });
            beamPaths++;
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
  let toExplore = [{ x: data[0].indexOf("S"), y: 0 }];
  let explored = [];
  let splitCount = 0;

  while (toExplore.length > 0) {
    let { x, y } = toExplore.shift();
    console.log(`Exploring x:${x} y:${y} -- toExplore length: ${toExplore.length}`);
    explored.push({ x, y });
    const down = y + 1;

    if (down < data.length) {
      if (data[down][x] === "^") {
        if (!explored.find((pos) => pos.x === x + 1 && pos.y === down && !toExplore.find((pos) => pos.x === x + 1 && pos.y === down))) {
          toExplore.push({ x: x + 1, y: down });
        }

        if (!explored.find((pos) => pos.x === x - 1 && pos.y === down) && !toExplore.find((pos) => pos.x === x - 1 && pos.y === down)) {
          toExplore.push({ x: x - 1, y: down });
        }
      } else {
        if (!explored.find((pos) => pos.x === x && pos.y === down) && !toExplore.find((pos) => pos.x === x && pos.y === down)) {
          toExplore.push({ x, y: down });
        }
      }
    } else {
      console.log("Plus one");
      splitCount++;
    }

    
  }

  console.log("Part 2:", splitCount);
}

Day7();
