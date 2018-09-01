
let parse = require("./parse.js")

let prog = "do ( define (x, 10), <(x, 5))"
console.log(JSON.stringify(parse(prog), null, 4));
