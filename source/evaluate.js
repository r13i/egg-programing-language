"use strict"

let parse = require("./parse.js")
let topScope = require("./environment.js");

module.exports = {
    evaluate: evaluate,
    run: run
};

/**
 * Object with keys holding all the pre-defined expressions in the language syntax, e.g. `do`, `if`, `define`, ..., and with values binded to JavaScript functions doing the actual job.
 */
let specialForms = Object.create(null);

// `if` is more like a ternary operator (i.e. (someExpressionToEvaluate) ? returnIfTrue : returnIfFalse) with 3 arguments
specialForms.if = (args, scope) => {
    if (args.length != 3) throw new SyntaxError(`if: Wrong number of arguments. Expected 3, received ${args.length}`);
    else if (evaluate(args[0], scope) !== false) return evaluate(args[1], scope);
    else return evaluate(args[2], scope);
};

// `while`
specialForms.while = (args, scope) => {
    if (args.length != 2) throw new SyntaxError(`while: Wrong number of arguments. Expected 2, received ${args.length}`);
    while (evaluate(args[0], scope) !== false) evaluate(args[1], scope);
    // Exit by returning false (like all expressions must do !)
    return false;
};

// `do` executes all its arguments, and return the value produced by its last argument
specialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args) {
        value = evaluate(arg, scope);
    }
    return value;
};

// `define` 
specialForms.define = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of `define`");
    }

    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
}


/**
 * Translates typed expressions (like `word`, `value`, `apply`) to their actual value by retreiving it from memory or by processing it by function call.
 * @arg expr The object from syntax tree to be evaluated
 * @arg scope An object holding the defined bindings and actual scope of the program
 * @returns The result of evaluating the given expression
 */
function evaluate (expr, scope) {
    if (expr.type == "value") return expr.value;
    else if (expr.type == "word") {
        if (expr.name in scope) return scope[expr.name];
        else throw new ReferenceError(`Undefined binding: ${expr.name}`)
    }
    else if (expr.type == "apply") {
        let {operator, args} = expr;
        if (operator.type == "word" && operator.name in specialForms) {
            return specialForms[operator.name] (args, scope);      // Passing args and scope to the actual JavaScript function doing the job
        }
        else {
            let op = evaluate(operator, scope);
            if (typeof op == "function") return op(...args.map(arg => evaluate(arg, scope)));
            else throw new TypeError("Applying a non-function.");
        }
    }
}

/**
 * Runs a program in a newly created scope
 * @arg program The text script to be parsed and evaluated
 * @returns The evaluated value
 */
function run(program) {
    return evaluate(parse(program), Object.create(topScope));
}