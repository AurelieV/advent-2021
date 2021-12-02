const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function updatePosition(position, { command, input }) {
  if (command === 'forward') {
    position.x = position.x + input
    position.y = position.y + input * position.aim
  } else if (command === 'down') {
    position.aim = position.aim + input
  } else if (command === 'up') {
    position.aim = position.aim - input
  }
}

function executeInstructions(instructions) {
  const position = { x: 0, y: 0, aim: 0 }
  for (let instruction of instructions) {
    updatePosition(position, instruction)
  }

  return position
}

function main() {
  console.time('exec')
  const resolving = ora('Reading file').start()
  // const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  const instructions = rawInput.split('\n').map((line) => {
    const [, command, input] = line.match(/^(\D+) (\d+)$/)
    return { command, input: parseInt(input) }
  })

  const finalPosition = executeInstructions(instructions)

  resolving.succeed(`Jour ${chalk.red(2)} - the answer is ${chalk.bold.magenta(finalPosition.x * finalPosition.y)}`)
  console.timeEnd('exec')
}

main()
