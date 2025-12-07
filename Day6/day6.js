// https://adventofcode.com/2025/day/6

import fs from "node:fs";

export default function Day6() {
  const dataRaw = fs.readFileSync("Day6/day6.sample.txt", "utf8");
  const data = dataRaw.split("\n").filter((line) => line.trim());

  const lastRow = data.length - 1;

 //Part1(data, lastRow);
  Part2(data, lastRow);
}

function Part1(data, lastRow) {
  let dataArray = [...data.map((x) => x.split(" ").filter((y) => y.trim()))];
  let part1Total = 0;

  for (let col = 0; col < dataArray[0].length; col++) {
    let operand = dataArray[lastRow][col];
    let columnTotal = 0;

    for (let row = 0; row < lastRow; row++) {
      if (operand === "+" || columnTotal === 0) {
        columnTotal += Number(dataArray[row][col]);
      } else {
        columnTotal *= Number(dataArray[row][col]);
      }
    }

    part1Total += columnTotal;
  }

  console.log("Part 1 Total:", part1Total);
}

function Part2(data, lastRow) {
  let dataArray = [...data.map((x) => x.split("  "))];
  console.log(dataArray)
  let part2Total = 0;

  for (let col = 0; col < dataArray[0].length; col++) {
    let operand = dataArray[lastRow][col];
    let columnTotal = 0;

    let columnNumbers = [];
    for (let row = 0; row < lastRow; row++) {
      columnNumbers.push(dataArray[row][col]);
    }

    const longestNumber = columnNumbers.reduce((x,y) => x.length > y.length ? x : y).length;
    columnNumbers = columnNumbers.map(x => x.padEnd(longestNumber, "*"));

    let cephalopodNumbers = [];

    for (let i = 0; i < longestNumber; i++) {
      let cephalopodNumber = "";

      for (let j = 0; j < columnNumbers.length; j++) {
        cephalopodNumber += columnNumbers[j][i].replace("*", "");
      }

      cephalopodNumbers.push(cephalopodNumber);
    }

    // console.log(columnNumbers);
    // console.log(cephalopodNumbers);
    // console.log("\n\n")

    for (let row = 0; row < lastRow; row++) {
      if (operand === "+" || columnTotal === 0) {
        columnTotal += Number(dataArray[row][col]);
      } else {
        columnTotal *= Number(dataArray[row][col]);
      }
    }

    part2Total += columnTotal;
  }

  console.log("Part 2 Total:", part2Total);
}