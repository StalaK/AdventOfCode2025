// https://adventofcode.com/2025/day/8

import fs from "node:fs";

export default function Day8() {
  const dataRaw = fs.readFileSync("Day8/day8.txt", "utf8");
  const data = dataRaw.split("\n").filter((line) => line.trim());
  const NO_OF_CONNECTIONS = 1000;

  let points = data.map((d, i) => {
    let point = d.split(",");
    return {
      index: i,
      x: point[0],
      y: point[1],
      z: point[2],
    };
  });

  Part1(points, NO_OF_CONNECTIONS);
  Part2(points);
}

function Part1(points, noOfConnections) {
  let connections = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let distance = getDistance(points[i], points[j]);
      connections.push({ from: i, to: j, distance: distance });
    }
  }

  connections = connections.sort((a, b) => a.distance - b.distance);

  let circuits = [];
  for (let i = 0; i < noOfConnections; i++) {
    let existingFrom = circuits.find((x) => x?.includes(connections[i].from));
    let existingTo = circuits.find((all) => all?.includes(connections[i].to));

    if (existingFrom && existingTo && existingFrom === existingTo) {
      continue;
    }

    if (existingFrom && existingTo) {
      existingFrom.push(...existingTo);
      circuits.splice(circuits.indexOf(existingTo), 1);
    } else {
      if (existingFrom) {
        existingFrom.push(connections[i].to);
      }

      if (existingTo) {
        existingTo.push(connections[i].from);
      }

      if (!existingFrom && !existingTo) {
        circuits.push([connections[i].from, connections[i].to]);
      }
    }
  }

  circuits = circuits.sort((a, b) => b.length - a.length);
  console.log("Part 1:", circuits[0].length * circuits[1].length * circuits[2].length);
}

function Part2(points) {
  let connections = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let distance = getDistance(points[i], points[j]);
      connections.push({ from: i, to: j, distance: distance });
    }
  }

  connections = connections.sort((a, b) => a.distance - b.distance);

  let circuits = [];
  let unconnected = [...points.map((x) => x.index)];
  let lastIndex = -1;
  let result = 0;

  for (let i = 0; i < connections.length; i++) {
    if (unconnected.length == 1) {
      lastIndex = unconnected[0];
    }

    let existingFrom = circuits.find((x) => x?.includes(connections[i].from));
    let existingTo = circuits.find((all) => all?.includes(connections[i].to));

    if (existingFrom && existingTo && existingFrom === existingTo) {
      continue;
    }

    if (existingFrom && existingTo) {
      existingFrom.push(...existingTo);
      circuits.splice(circuits.indexOf(existingTo), 1);
    } else {
      if (existingFrom) {
        existingFrom.push(connections[i].to);
        unconnected.splice(unconnected.indexOf(connections[i].to), 1);
      }

      if (existingTo) {
        existingTo.push(connections[i].from);
        unconnected.splice(unconnected.indexOf(connections[i].from), 1);
      }

      if (!existingFrom && !existingTo) {
        circuits.push([connections[i].from, connections[i].to]);
        unconnected.splice(unconnected.indexOf(connections[i].to), 1);
        unconnected.splice(unconnected.indexOf(connections[i].from), 1);
      }
    }

    if (unconnected.length === 0 && circuits.length === 1) {
      result = points[connections[i].from].x * points[connections[i].to].x;
      break;
    }
  }

  console.log("Part 2:", result);
}

function getDistance(pointA, pointB) {
  return Math.sqrt(
    Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.z - pointB.z, 2)
  );
}