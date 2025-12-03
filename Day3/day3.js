// https://adventofcode.com/2025/day/3

import fs from "node:fs";

const dataRaw = fs.readFileSync("Day3/day3.txt", "utf8");
const batteryBanks = dataRaw.split("\n").filter((line) => line.trim());

let part1TotalJoltage = 0;
let part2TotalJoltage = 0;

batteryBanks.forEach(bank => {
    let max1 = 0;
    let max2 = 0;

    for (let i = 0; i < bank.length; i++) {
        const joltage = parseInt(bank[i]);

        if (joltage > max1 && i !== bank.length - 1) {
            max1 = joltage;
            max2 = 0;
        } else if (joltage > max2) {
            max2 = joltage;
        }
    }

    const joltageString = `${max1}${max2}`;
    part1TotalJoltage += parseInt(joltageString);

    let joltageValues = new Array(12).fill(0);

    for (let i = 0; i < bank.length; i++) {
        const joltage = parseInt(bank[i]);

        for (let j = 0; j < joltageValues.length; j++) {
            if (joltage > joltageValues[j] && joltageValues.length - j <= bank.length - i) {
                joltageValues[j] = joltage;
                joltageValues = [...joltageValues.slice(0,j+1), ...new Array(joltageValues.length - j -1).fill(0)];
                break;
            }
        }
    }

    part2TotalJoltage += parseInt(joltageValues.join(''));
});

console.log("Part 1 total Joltage:", part1TotalJoltage);
console.log("Part 2 total Joltage:", part2TotalJoltage);
