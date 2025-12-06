// https://adventofcode.com/2025/day/6

import fs from "node:fs";

export default function Day6() {
  const dataRaw = fs.readFileSync("Day6/day6.sample.txt", "utf8");
  const data = dataRaw.split("\n").filter((line) => line.trim());

  
  let dataArray = [...data.map((x) => x.split(" ").filter((y) => y.trim()))];
  const lastRow = dataArray.length - 1;
  
  //Part1(dataArray, lastRow);
  Part2(dataArray, lastRow);
}

function Part1(dataArray, lastRow) {
  let part1Total = 0;
  for (let row = 0; row < dataArray[0].length; row++) {
    let operand = dataArray[lastRow][row];
    let columnTotal = 0;
    let outstr = "";

    for (let col = 0; col < lastRow; col++) {

      if (operand === "+" || columnTotal === 0) {
        columnTotal += Number(dataArray[col][row]);
        outstr += "+" + dataArray[col][row];
      } else {
        columnTotal *= Number(dataArray[col][row]);
        outstr += "*" + dataArray[col][row];
      }

    }
    outstr += " = \t\t" + columnTotal;
    console.log(outstr);
    part1Total += columnTotal;
  }

  console.log("Part 1 Total:", part1Total);
}

function Part2(dataArray, lastRow) {
  let part2Total = 0;
  for (let row = 0; row < dataArray[0].length; row++) {
    let operand = dataArray[lastRow][row];
    let columnTotal = 0;
    let outstr = "";

    for (let col = 0; col < lastRow; col++) {

      if (operand === "+" || columnTotal === 0) {
        columnTotal += Number(dataArray[col][row]);
        outstr += "+" + dataArray[col][row];
      } else {
        columnTotal *= Number(dataArray[col][row]);
        outstr += "*" + dataArray[col][row];
      }

    }
    outstr += " = \t\t" + columnTotal;
    console.log(outstr);
    part1Total += columnTotal;
  }

  console.log("Part 2 Total:", part1Total);
}