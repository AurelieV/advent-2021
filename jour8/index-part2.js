const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function mapSignal(inputs) {
  let map = new Map()
  map.set(
    1,
    inputs.find((input) => input.length === 2)
  )
  map.set(
    4,
    inputs.find((input) => input.length === 4)
  )
  map.set(
    7,
    inputs.find((input) => input.length === 3)
  )
  map.set(
    8,
    inputs.find((input) => input.length === 7)
  )

  // 0, 9 and 6 are the only digit with 6 segments
  const sixSegments = inputs.filter((input) => input.length === 6)
  const cf = map.get(1).split('')

  // 6 is the only one which dont have C and F
  map.set(
    6,
    sixSegments.find((input) => input.split('').filter((segment) => cf.includes(segment)).length !== 2)
  )

  // 4 contains B/C/D/F so BD is easy to find
  const bd = map
    .get(4)
    .split('')
    .filter((segment) => !cf.includes(segment))

  // 0 is the only 6segments without bd
  map.set(
    0,
    sixSegments.find((input) => input.split('').filter((segment) => bd.includes(segment)).length !== 2)
  )

  // 9 is the remaining 6segment digits
  map.set(
    9,
    sixSegments.find((input) => input !== map.get(0) && input !== map.get(6))
  )

  // 2,3 et 5 are the digits with 5 segments
  const fiveSegments = inputs.filter((input) => input.length === 5)

  // d is the only one no present in 0
  const b = bd.find((segment) => map.get(0).split('').includes(segment))

  // 5 is the only 5 segments digit with b
  map.set(
    5,
    fiveSegments.find((input) => input.split('').includes(b))
  )

  // 3 is the only 5 segments digits which have CF
  map.set(
    3,
    fiveSegments.find((input) => input.split('').filter((segment) => cf.includes(segment)).length === 2)
  )

  // 2 is the remaining 5 segment digit
  map.set(
    2,
    fiveSegments.find((input) => input !== map.get(3) && input !== map.get(5))
  )

  const reverseMap = new Map()
  ;[...map.entries()].forEach(([key, value]) => reverseMap.set(normalizeDigit(value), key))

  return reverseMap
}

function normalizeDigit(segments) {
  return segments.split('').sort().join('')
}

function getOutputValue(line) {
  const map = mapSignal(line.inputs)
  return parseInt(line.outputs.map((output) => map.get(normalizeDigit(output))).join(''))
}

function main() {
  console.time('exec')
  const resolving = ora('Reading file').start()
  // const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  const lines = rawInput.split('\n').map((line) => {
    const [inputs, outputs] = line.split(' | ')
    return {
      inputs: inputs.split(' '),
      outputs: outputs.split(' '),
    }
  })

  // const maps = lines.map((line) => mapSignal(line.inputs))
  const result = lines.reduce((total, line) => total + getOutputValue(line), 0)

  resolving.succeed(`Jour ${chalk.red(8)} - the answer is ${chalk.bold.magenta(result)}`)
  console.timeEnd('exec')
}

main()
