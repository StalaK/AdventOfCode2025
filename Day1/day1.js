import fs from 'node:fs';

export default function day1() {

    const data = fs.readFileSync('Day1/day1.txt', 'utf8');
    console.log(data);
}
