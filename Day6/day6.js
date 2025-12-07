// https://adventofcode.com/2025/day/6

import fs from "node:fs";

export default function Day6() {
  const dataRaw = fs.readFileSync("Day6/day6.txt", "utf8");
  const data = dataRaw.split("\n").filter((line) => line.trim());

  const lastRow = data.length - 1;

  Part1(data, lastRow);
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
  const tempDataArray = [...data.map((x) => x.split(" ").filter((y) => y.trim()))];

  let colFrameSizes = [];
  for (let row = 0; row < tempDataArray.length; row++) {
    for (let col = 0; col < tempDataArray[row].length; col++) {
      colFrameSizes[col] = Math.max(colFrameSizes[col] ?? 0, tempDataArray[row][col].length);
    }
  }

  let dataArray = [];
  for (let row = 0; row < data.length; row++) {
    let newRow = [];
    let col = 0;
    let i = 0;

    while (i < data[row].length) {
      newRow.push(
        row === lastRow
          ? data[row].slice(i, i + colFrameSizes[col]).trim()
          : data[row].slice(i, i + colFrameSizes[col]).replaceAll(" ", "*")
      );

      i += colFrameSizes[col] + 1;
      col++;
    }

    dataArray.push(newRow);
  }

  let part2Total = 0;

  for (let col = 0; col < dataArray[0].length; col++) {
    let operand = dataArray[lastRow][col];
    let columnTotal = 0;

    let columnNumbers = [];
    for (let row = 0; row < lastRow; row++) {
      columnNumbers.push(dataArray[row][col]);
    }

    let cephalopodNumbers = [];

    for (let i = 0; i < colFrameSizes[col]; i++) {
      let cephalopodNumber = "";
      for (let j = 0; j < columnNumbers.length; j++) {
        cephalopodNumber += columnNumbers[j][i] === "*" ? "" : columnNumbers[j][i];
      }

      cephalopodNumbers.push(cephalopodNumber);
    }

    for (let num = 0; num < cephalopodNumbers.length; num++) {
      if (operand === "+" || columnTotal === 0) {
        columnTotal += Number(cephalopodNumbers[num]);
      } else {
        columnTotal *= Number(cephalopodNumbers[num]);
      }
    }

    part2Total += columnTotal;
  }

  console.log("Part 2 Total:", part2Total);
}