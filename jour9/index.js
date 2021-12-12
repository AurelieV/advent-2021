const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function getNeighboors(points, x, y) {
  const result = []
  if (x > 0) {
    result.push(points[y][x - 1])
  }
  if (y > 0) {
    result.push(points[y - 1][x])
  }
  if (y < points.length - 1) {
    result.push(points[y + 1][x])
  }
  if (x < points[y].length - 1) {
    result.push(points[y][x + 1])
  }

  return result
}

function isLow(points, x, y) {
  return getNeighboors(points, x, y).every((point) => point > points[y][x])
}

function main() {
  console.time('exec')
  const resolving = ora('Reading file').start()
  //   const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  const points = rawInput.split('\n').map((line) => line.split('').map((c) => parseInt(c)))
  let result = 0
  for (let x = 0; x < points[0].length; x++) {
    for (let y = 0; y < points.length; y++) {
      if (isLow(points, x, y)) {
        result += points[y][x] + 1
      }
    }
  }

  resolving.succeed(`Jour ${chalk.red(9)} - the answer is ${chalk.bold.magenta(result)}`)
  console.timeEnd('exec')
}

main()
