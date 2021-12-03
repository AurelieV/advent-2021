const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function splitBy(numbers, pos) {
  const result = { 0: [], 1: [] }
  for (number of numbers) {
    result[number[pos]].push(number)
  }
  return result
}

function getOxygen(numbers) {
  let index = 0
  let MAX = numbers.length
  while (numbers.length > 1 && index < MAX) {
    const split = splitBy(numbers, index)
    if (split[1].length >= split[0].length) {
      numbers = split[1]
    } else {
      numbers = split[0]
    }
    index++
  }
  return parseInt(numbers[0].join(''), 2)
}

function getCO2(numbers) {
  let index = 0
  let MAX = numbers.length
  while (numbers.length > 1 && index < MAX) {
    const split = splitBy(numbers, index)
    if (split[0].length <= split[1].length) {
      numbers = split[0]
    } else {
      numbers = split[1]
    }
    index++
  }
  return parseInt(numbers[0].join(''), 2)
}

function main() {
  console.time('exec')
  const resolving = ora('Reading file').start()
  // const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  const numbers = rawInput.split('\n').map((line) => line.split('').map((b) => parseInt(b)))
  const oxygen = getOxygen(numbers)
  const co2 = getCO2(numbers)

  resolving.succeed(`Jour ${chalk.red(3)} - the answer is ${chalk.bold.magenta(oxygen * co2)}`)
  console.timeEnd('exec')
}

main()
