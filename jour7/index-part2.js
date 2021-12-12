const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function getFuel(crabs, position) {
  return crabs.reduce((total, crabs) => {
    const distance = Math.abs(crabs - position)
    return total + (distance * (distance + 1)) / 2
  }, 0)
}

function main() {
  console.time('exec')
  const resolving = ora('Reading file').start()
  //   const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  const crabs = rawInput.split(',').map((c) => parseInt(c))
  const maxPosition = Math.max(...crabs)

  const fuels = new Array(maxPosition + 1).fill(0).map((_, pos) => getFuel(crabs, pos))

  resolving.succeed(`Jour ${chalk.red(7)} - the answer is ${chalk.bold.magenta(Math.min(...fuels))}`)
  console.timeEnd('exec')
}

main()
