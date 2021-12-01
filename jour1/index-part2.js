const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function countSlidesInscrease(mesures) {
  return mesures.slice(3).reduce((count, mesure, index) => {
    return mesure > mesures[index] ? count + 1 : count
  }, 0)
}

function main() {
  const resolving = ora('Resolving problem').start()
  console.time('exec')
  // const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  const mesures = rawInput.split('\n').map((line) => parseInt(line))
  const result = countSlidesInscrease(mesures)

  resolving.succeed(`Jour ${chalk.red(1)} - the answer is ${result}`)
  console.timeEnd('exec')
}

main()
