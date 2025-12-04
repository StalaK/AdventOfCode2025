// https://adventofcode.com/2025/day/4

import fs from "node:fs";

const dataRaw = fs.readFileSync("Day4/day4.txt", "utf8");
let grid = dataRaw.split("\n").filter((line) => line.trim());

Part1();
Part2();

function Part1() {
    let accessibleRolls = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === "@" && adjacentRollCount(x, y) < 4)
                accessibleRolls++;
        }
    }
    
    console.log("Part 1 Accessible rolls:", accessibleRolls);
}

function Part2() {
    let accessibleRolls = 0;
    let rollRemoved = false;
    let newGrid = [];

    do {
        rollRemoved = false;

        for (let y = 0; y < grid.length; y++) {
            let gridRow = "";

            for (let x = 0; x < grid[y].length; x++) {               
                if (grid[y][x] === "@" && adjacentRollCount(x, y) < 4) {
                    accessibleRolls++;
                    rollRemoved = true;
                    gridRow += ".";
                } else {
                    gridRow += grid[y][x];
                }
            }

            newGrid.push(gridRow);
        }

        grid = newGrid;
        newGrid = [];
    } while (rollRemoved);

    console.log("Part 2 Accessible rolls:", accessibleRolls);
}

function adjacentRollCount(x, y) {
    let rollCount = 0;

    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // Left, Right, Up, Down
        [-1, -1], [1, -1], [-1, 1], [1, 1] // Diagonals
    ];

    for (const [xDiff, yDiff] of directions) {
        const xCheck = x + xDiff;
        const yCheck = y + yDiff;

        if (xCheck >= 0
            && xCheck < grid[y].length
            && yCheck >= 0
            && yCheck < grid.length
            && grid[yCheck][xCheck] === "@") {
            rollCount++;
        }
    }

    return rollCount;
}
