const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function countOneAt(numbers, pos) {
  return numbers.reduce((total, number) => total + ((number >> pos) % 2), 0)
}

function getGammaRate(numbers, maskLength) {
  let gamma = ''
  for (let i = 0; i < maskLength; i++) {
    const ones = countOneAt(numbers, i)
    gamma = `${ones > numbers.length / 2 ? '1' : '0'}${gamma}`
  }
  console.log(gamma)
  return parseInt(gamma, 2)
}

function xor(number, maskLength) {
  return number ^ parseInt(new Array(maskLength).fill('1').join(''), 2)
}

function main() {
  console.time('exec')
  const resolving = ora('Reading file').start()
  //   const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  const lines = rawInput.split('\n')
  const maskLength = lines[0].length
  const numbers = lines.map((line) => parseInt(line, 2))

  const gammaRate = getGammaRate(numbers, maskLength)
  const epsilonRate = xor(gammaRate, maskLength)

  resolving.succeed(`Jour ${chalk.red(3)} - the answer is ${chalk.bold.magenta(gammaRate * epsilonRate)}`)
  console.timeEnd('exec')
}

main()
