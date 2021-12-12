const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function markTile(ocean, x, y) {
  const id = `${x},${y}`
  if (!ocean.has(id)) {
    ocean.set(id, 0)
  }
  ocean.set(id, ocean.get(id) + 1)
}

function markVector(ocean, vector) {
  if (vector.x0 === vector.x1) {
    const minY = Math.min(vector.y0, vector.y1)
    const maxY = Math.max(vector.y0, vector.y1)
    for (let y = minY; y <= maxY; y++) {
      markTile(ocean, vector.x0, y)
    }
  } else if (vector.y0 === vector.y1) {
    const minX = Math.min(vector.x0, vector.x1)
    const maxX = Math.max(vector.x0, vector.x1)
    for (let x = minX; x <= maxX; x++) {
      markTile(ocean, x, vector.y0)
    }
  }
}

function main() {
  console.time('exec')
  const resolving = ora('Reading file').start()
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  //   const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  const vectors = rawInput.split('\n').map((line) => {
    const [, x0, y0, x1, y1] = line.match(/(\d+),(\d+) -> (\d+),(\d+)/)
    return { x0: parseInt(x0), y0: parseInt(y0), x1: parseInt(x1), y1: parseInt(y1) }
  })
  const ocean = new Map()

  for (const vector of vectors) {
    markVector(ocean, vector)
  }

  const safeTilesCount = Array.from(ocean.values()).reduce((total, tile) => (tile >= 2 ? total + 1 : total), 0)

  resolving.succeed(`Jour ${chalk.red(5)} - the answer is ${chalk.bold.magenta(safeTilesCount)}`)
  console.timeEnd('exec')
}

main()
