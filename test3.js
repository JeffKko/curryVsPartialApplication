const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

function sum(a, b) {
  return a + b
}

function hardFunc() {
  let num = Array.from({length: 10000})
  return num.map((value, index) => index).reduce((a, value) => a + value)
}

function curry(a) {
  return function(b) {
    return a + b
  }
}

const sumPartial = sum.bind(null, hardFunc())
const sumCurried = curry(hardFunc())

suite
  .add('normal', () => {

    sum(hardFunc(), 2)

  })
  .add('partail application', () => {

    sumPartial(2)

  })
  .add('curry', () => {

    sumCurried(2)

  })
  .on('cycle', event => console.log(String(event.target)))
  .on('complete', () => console.log('complete'))
  .run({ 'async': true })
