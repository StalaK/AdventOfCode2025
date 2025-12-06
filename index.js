import Day1 from "./Day1/day1.js";
import Day2 from "./Day2/day2.js";
import Day3 from "./Day3/day3.js";
import Day4 from "./Day4/day4.js";
import Day5 from "./Day5/day5.js";
import Day6 from "./Day6/day6.js";
import Day7 from "./Day7/day7.js";
import Day8 from "./Day8/day8.js";
import Day9 from "./Day9/day9.js";
import Day10 from "./Day10/day10.js";
import Day11 from "./Day11/day11.js";
import Day12 from "./Day12/day12.js";

console.log("Advent of Code 2025");

const dayNo = process.argv[2];
eval(`Day${dayNo}();`);