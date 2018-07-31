const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

function sum(a, b, c) {
  return a + b + c
}

function curry(a) {
  return function(b) {
    return function(c) {
      return a + b + c
    }
  }
}

const sumPartial = sum.bind(null, 1)
const sumCurried = curry(1)

suite
  .add('normal', () => {

    sum(1, 2, 3)

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
