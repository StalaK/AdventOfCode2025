import Day1 from "./Day1/day1.js";
import Day2 from "./Day2/day2.js";
import Day3 from "./Day3/day3.js";
import Day4 from "./Day4/day4.js";

console.log("Advent of Code 2025");

const dayNo = process.argv[2];
eval(`Day${dayNo}();`);