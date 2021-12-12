const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')

function countEasyDigits(outputs) {
  return outputs.reduce((total, output) => ([2, 4, 3, 7].includes(output.length) ? total + 1 : total), 0)
}

function main() {
  console.time('exec')
  const resolving = ora('Reading file').start()
  //   const rawInput = fs.readFileSync(path.resolve(__dirname, 'test.txt'), 'utf-8')
  const rawInput = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

  const lines = rawInput.split('\n').map((line) => {
    const [inputs, outputs] = line.split(' | ')
    return {
      inputs: inputs.split(' '),
      outputs: outputs.split(' '),
    }
  })

  const count = lines.reduce((total, line) => total + countEasyDigits(line.outputs), 0)

  resolving.succeed(`Jour ${chalk.red(8)} - the answer is ${chalk.bold.magenta(count)}`)
  console.timeEnd('exec')
}

main()
