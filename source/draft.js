
let parse = require("./parse.js");
let {evaluate, run} = require("./evaluate.js");
let scope = require("./environment.js");


let prog = "if(*(2, 3), print(true), print(false))";


