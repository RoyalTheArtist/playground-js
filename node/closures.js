
// simple intro to closures
// function makeFunc() {
//   let name = "Mozilla"
//   function displayName() {
//     console.log(name)
//   }

//   function setName(new_name) {
//     name = new_name
//   }

//   return { displayName, setName }
// }

// const myFunc = makeFunc()
// myFunc.displayName()
// myFunc.setName("Toodles")
// myFunc.displayName()

// making a function factory
// function makeAdder(x) {
//   return function (y) {
//     return x + y
//   }
// }

// const adds5 = makeAdder(5)
// const adds10 = makeAdder(10)

// console.log(adds5(2))
// console.log(adds10(2))

// using closure to define public functions and private func and var
// const counter = (function () {
//   let privateCounter = 0
//   function changeBy(val) {
//     privateCounter += val
//   }

//   return {
//     increment() {
//       changeBy(1)
//     },

//     decrement() {
//       changeBy(-1)
//     },

//     value() {
//       return privateCounter
//     } 
//   }
// })();

// console.log(counter.value())

// counter.increment()
// counter.increment()
// console.log(counter.value())

// counter.decrement()
// console.log(counter.value())

// lexical scope issues
