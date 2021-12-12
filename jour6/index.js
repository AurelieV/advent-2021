const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function turn(fishes) {
  let babyFishes = 0
  fishes.forEach((fish, index) => {
    fishes[index] = fish === 0 ? 6 : fish - 1
    if (fish === 0) {
      babyFishes++
    }
  })
  return fishes.concat(new Array(babyFishes).fill(8))
}

function main() {
  console.time('exec')
  const resolving = ora('Reading file').start()
  //   const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  let fishes = rawInput.split(',').map((fish) => parseInt(fish))
  for (let i = 1; i <= 80; i++) {
    fishes = turn(fishes)
  }

  resolving.succeed(`Jour ${chalk.red(6)} - the answer is ${chalk.bold.magenta(fishes.length)}`)
  console.timeEnd('exec')
}

main()
