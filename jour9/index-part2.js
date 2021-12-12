const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function getNeighboorsCoordinates(points, x, y) {
  const result = []
  if (x > 0) {
    result.push({ y, x: x - 1 })
  }
  if (y > 0) {
    result.push({ y: y - 1, x })
  }
  if (y < points.length - 1) {
    result.push({ y: y + 1, x })
  }
  if (x < points[y].length - 1) {
    result.push({ y, x: x + 1 })
  }

  return result
}

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
  return getNeighboors(points, x, y).every(({ value }) => value > points[y][x].value)
}

function markBassin(x, y, points, bassins, bassin = `${x}-${y}`, first = true) {
  if (first) {
    bassins.set(bassin, 0)
  }
  if (points[y][x].bassin || points[y][x].value === 9) return
  points[y][x].bassin = bassin
  bassins.set(bassin, bassins.get(bassin) + 1)
  const neightboors = getNeighboorsCoordinates(points, x, y)
  neightboors
    .filter(({ x: x1, y: y1 }) => points[y1][x1].value >= points[y][x].value)
    .forEach(({ x, y }) => {
      markBassin(x, y, points, bassins, bassin, false)
    })
}

function main() {
  console.time('exec')
  const resolving = ora('Reading file').start()
  // const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  const points = rawInput
    .split('\n')
    .map((line) => line.split('').map((c) => ({ value: parseInt(c), bassin: undefined })))
  let lowPoints = []
  for (let x = 0; x < points[0].length; x++) {
    for (let y = 0; y < points.length; y++) {
      if (isLow(points, x, y)) {
        lowPoints.push({ x, y })
      }
    }
  }

  const bassins = new Map()
  lowPoints.forEach(({ x, y }) => markBassin(x, y, points, bassins))
  const result = [...bassins.values()]
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, value) => total * value, 1)

  resolving.succeed(`Jour ${chalk.red(9)} - the answer is ${chalk.bold.magenta(result)}`)
  console.timeEnd('exec')
}

main()
