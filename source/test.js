
// // This is some sort of Unit Testing, although some functionalities might be tested all at once

// let parse = require("./parse.js");
// let {evaluate, run} = require("./evaluate.js");
// let scope = require("./environment.js");

// let prog = "";

// // Testing if
// console.log("\nTesting `if`:");
// prog = "if(*(2, 3), print(true), print(false))";
// run(prog);

// // Testing define, while, do, print
// console.log("\nTesting basics `define, while, do, print`:");
// prog = `do(
//     define(sum, 0),
//     define(idx, 1),
//     while(
//         <(idx, 10),
//         do(
//             define(sum, +(sum, idx)),
//             define(idx, +(idx, 1))
//         )
//     ),
//     print(sum)
// )`;
// run(prog);

// // Testing fun
// console.log("\nTesting `fun` function constructor:");
// prog = `do(
//     define(addOne, fun(a, +(a, 1))),
//     print(addOne(5))
// )`;
// run(prog);

// // Testing fun: creating pow function
// console.log("\nTesting `fun` function constructor: Building a pow function");
// prog = `do(
//     define(pow, fun(
//         base,
//         exp,
//         do(
//             define(idx, 1),
//             define(current, base),
//             while (
//                 <(idx, exp),
//                 do(
//                     define(current, * (current, base)),
//                     define(idx, +(idx, 1))
//                 )
//             ),
//             print(current)
//         )
//     )),
//     pow(2, 10)
// )`;
// run(prog);



// // Testing fun: creating pow recursively :)
// console.log("\nTesting `fun` function constructor: Building a pow function - Recursively ;)");
// prog = `do(
//     define(pow, fun(
//         base,
//         exp,
//         do(
//             if(
//                 ==(exp, 0),
//                 1,
//                 *(base, pow(base, -(exp, 1)))
//             )
//         )
//     )),
//     print(pow(2, 10))
// )`;
// run(prog);

// // Testing arrays
// console.log("\nTesting arrays constructor:");
// prog = `do(
//     define(arr, array(1, 2, 3)),
//     print(length(arr)),
//     print(element(arr, 0))
// )`;
// run(prog);



let f = function(...vals) { return vals; }
console.log(f(1, 2 ,3))