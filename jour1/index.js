const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function countInscrease(mesures) {
  return mesures.reduce((count, mesure, index) => {
    if (index === 0) return count
    return mesure > mesures[index - 1] ? count + 1 : count
  }, 0)
}

function main() {
  const resolving = ora('Resolving problem').start()
  console.time('exec')
  //   const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  const mesures = rawInput.split('\n').map((line) => parseInt(line))
  const result = countInscrease(mesures)

  resolving.succeed(`Jour ${chalk.red(1)} - the answer is ${result}`)
  console.timeEnd('exec')
}

main()
