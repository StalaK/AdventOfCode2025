// https://adventofcode.com/2025/day/1

import fs from "node:fs";

const dataRaw = fs.readFileSync("Day1/day1.txt", "utf8");
const data = dataRaw.split("\n").filter((line) => line.trim());

let currentPos = 50;
let part1ZeroCount = 0;
let part2ZeroCount = 0;

data.forEach((line) => {
  const dir = line[0];
  const amount = parseInt(line.slice(1));

  part2ZeroCount += Math.floor(amount / 100);
  const amountAdjusted = dir === "L" ? (amount % 100) * -1 : amount % 100;
  const onZero = currentPos === 0;

  currentPos -= amountAdjusted;

  if (currentPos <= 0 || currentPos >= 100) {
    if (!onZero)
      part2ZeroCount++;

    if (currentPos % 100 === 0)
      part1ZeroCount++;

    currentPos = ((currentPos % 100) + 100) % 100;
  }
});

console.log("Part 1: " + part1ZeroCount);
console.log("Part 2: " + part2ZeroCount);
