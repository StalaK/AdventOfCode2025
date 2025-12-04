// https://adventofcode.com/2025/day/2

import fs from "node:fs";

export default function Day2() {
  const data = fs.readFileSync("Day2/day2.txt", "utf8");
  const idRanges = data.split(",");

  let part1InvalidTotal = 0;
  let part2InvalidTotal = 0;

  idRanges.forEach((range) => {
    const idRange = range.split("-");
    const ids = Array.from({ length: idRange[1] - idRange[0] + 1 }, (_, i) => i + parseInt(idRange[0], 10));

    ids.forEach((id) => {
      const idStr = id.toString();

      if (idStr.len % 2 !== 0 && idStr.slice(0, idStr.length / 2) === idStr.slice(idStr.length / 2, id)) {
        part1InvalidTotal += id;
      }

      let checkWidth = 1;

      while (checkWidth <= idStr.length / 2) {
        const pattern = idStr.slice(0, checkWidth);
        let repeater = true;

        for (let i = 0; i < idStr.length; i += checkWidth) {
          const toCheck = idStr.slice(i, i + checkWidth);

          if (toCheck !== pattern) {
            repeater = false;
            break;
          }
        }

        if (repeater) {
          part2InvalidTotal += id;
          break;
        }

        checkWidth++;
      }
    });
  });

  console.log("Part 1:", part1InvalidTotal);
  console.log("Part 2:", part2InvalidTotal);
}
