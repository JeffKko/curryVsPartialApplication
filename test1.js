const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

function sum(a, b, c) {
  return a + b + c
}

function hardFunc() {
  let num = Array.from({length: 10000})
  return num.map((value, index) => index).reduce((a, value) => a + value)
}

function curry(a) {
  return function(b) {
    return function(c) {
      return a + b + c
    }
  }
}

const sumPartial = sum.bind(null, hardFunc())
const sumCurried = curry(hardFunc())

suite
  .add('normal', () => {

    sum(hardFunc(), 2, 3)

  })
  .add('partail application', () => {

    sumPartial(2, 3)

  })
  .add('curry', () => {

    sumCurried(2)(3)

  })
  .on('cycle', event => console.log(String(event.target)))
  .on('complete', () => console.log('complete'))
  .run({ 'async': true })
