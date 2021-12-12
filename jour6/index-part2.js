const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function turn(fishGroups) {
  const newFishes = fishGroups.get(0)
  ;[1, 2, 3, 4, 5, 6, 7, 8].forEach((group) => {
    fishGroups.set(group - 1, fishGroups.get(group))
  })
  fishGroups.set(6, newFishes + fishGroups.get(6))
  fishGroups.set(8, newFishes)
}

function main() {
  console.time('exec')
  const resolving = ora('Reading file').start()
  //   const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  let fishes = rawInput.split(',').map((fish) => parseInt(fish))
  const fishGroups = new Map(new Array(9).fill([]).map((_, i) => [i, 0]))

  for (const fish of fishes) {
    fishGroups.set(fish, fishGroups.get(fish) + 1)
  }

  for (let i = 1; i <= 256; i++) {
    turn(fishGroups)
  }

  const total = [...fishGroups.values()].reduce((total, count) => total + count, 0)

  resolving.succeed(`Jour ${chalk.red(6)} - the answer is ${chalk.bold.magenta(total)}`)
  console.timeEnd('exec')
}

main()
