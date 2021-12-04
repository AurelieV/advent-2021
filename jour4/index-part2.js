const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function turn(grids, ball) {
  for (const grid of grids) {
    if (grid.numbers.has(ball)) {
      const number = grid.numbers.get(ball)
      const { x, y } = number
      number.marked = true
      grid.columns[x] = grid.columns[x] - 1
      grid.rows[y] = grid.rows[y] - 1
      if (grid.columns[x] === 0 || grid.rows[y] === 0) {
        grid.winning = true
      }
    }
  }
  return grids.filter((grid) => !grid.winning)
}

function game(balls, grids) {
  let remainingGrids = grids
  let index = -1
  while (remainingGrids.length > 1 && index < balls.length - 1) {
    index = index + 1
    remainingGrids = turn(remainingGrids, balls[index])
  }
  if (remainingGrids.length > 1) {
    console.log('Oups')
    return
  }
  const lastGrid = remainingGrids[0]
  while (remainingGrids.length !== 0 && index < balls.length - 1) {
    index = index + 1
    remainingGrids = turn(remainingGrids, balls[index])
  }
  const remainings = Array.from(lastGrid.numbers).reduce((total, [number, { marked }]) => {
    if (marked) return total
    return total + parseInt(number)
  }, 0)

  return remainings * parseInt(balls[index])
}

function main() {
  console.time('exec')
  const resolving = ora('Reading file').start()
  // const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  const [ballsData, ...gridsData] = rawInput.split('\n\n')
  const balls = ballsData.split(',')
  const grids = gridsData.map((block) => {
    const lines = block.split('\n')
    const numbers = new Map()
    lines.forEach((line, y) => {
      line
        .split(/\s+/)
        .filter((n) => !!n)
        .forEach((number, x) => {
          numbers.set(number, { x, y })
        })
    })
    return {
      columns: [5, 5, 5, 5, 5],
      rows: [5, 5, 5, 5, 5],
      numbers,
    }
  })

  console.log(`Analyzing ${grids.length}`)
  const result = game(balls, grids)

  resolving.succeed(`Jour ${chalk.red(4)} - the answer is ${chalk.bold.magenta(result)}`)
  console.timeEnd('exec')
}

main()
