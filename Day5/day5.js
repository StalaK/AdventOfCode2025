// https://adventofcode.com/2025/day/5

import fs from "node:fs";

export default function Day5() {
  const dataRaw = fs.readFileSync("Day5/day5.txt", "utf8");
  let data = dataRaw.split("\n");

  const split = data.indexOf("");
  const freshIds = data.slice(0, split).filter((x) => x.trim());
  const stock = data.slice(split + 1, data.length).filter((x) => x.trim());

  let freshIngredientCount = 0;
  let aggregatedRanges = aggregateRanges(freshIds);

  for (let i = 0; i < stock.length; i++) {
    for (let j = 0; j < aggregatedRanges.length; j++) {
      const ranges = aggregatedRanges[j].split("-");
      const min = parseInt(ranges[0]);
      const max = parseInt(ranges[1]);

      if (stock[i] >= min && stock[i] <= max) {
        freshIngredientCount++;
        break;
      }
    }
  }

  let freshIdCount = 0;

  for (var i = 0; i < aggregatedRanges.length; i++) {
    const rangeVals = aggregatedRanges[i].split("-");
    const min = parseInt(rangeVals[0]);
    const max = parseInt(rangeVals[1]);

    freshIdCount += max - min + 1;
  };

  console.log("Part 1, Fresh Ingredient Count:", freshIngredientCount);
  console.log("Part 2, Fresh ID Count:", freshIdCount);
}

function aggregateRanges(freshIds) {
  let aggregatedRanges = [];

  for (let i = 0; i < freshIds.length; i++) {
    const ranges = freshIds[i].split("-");
    const min = parseInt(ranges[0]);
    const max = parseInt(ranges[1]);
    let newRecord = true;

    for (let j = 0; j < aggregatedRanges.length; j++) {
      const checkRanges = aggregatedRanges[j].split("-");
      const checkRangeMin = parseInt(checkRanges[0]);
      const checkRangeMax = parseInt(checkRanges[1]);

      if (min <= checkRangeMin && max >= checkRangeMin && max <= checkRangeMax) {
        newRecord = false;
        aggregatedRanges[j] = `${min}-${checkRangeMax}`;
        break;
      }

      if (min >= checkRangeMin && min <= checkRangeMax && max >= checkRangeMax) {
        newRecord = false;
        aggregatedRanges[j] = `${checkRangeMin}-${max}`;
        break;
      }

      if (min <= checkRangeMin && max >= checkRangeMax) {
        newRecord = false;
        aggregatedRanges[j] = `${min}-${max}`;
        break;
      }

      if (min >= checkRangeMin && max <= checkRangeMax) {
        newRecord = false;
        break;
      }
    }

    if (newRecord) {
      aggregatedRanges.push(freshIds[i]);
    }
  }

  return freshIds.length == aggregatedRanges.length ? aggregatedRanges : aggregateRanges(aggregatedRanges);
}