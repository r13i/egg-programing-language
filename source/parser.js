"use strict"

/**
 * Parses strings, numbers, and name bindings from the program script
 * @arg program The script string
 * @returns The value return by function `parseApply` called with the parsed expression and the rest of the program
 */
function parseExpression (program) {
    program = skipSpace(program);
    let match, expr;

    // Parsing string expressions: We look for anything held between double quotes
    if (match = /^"([^"]*)"/.exec(program)) expr = { type: "value", value: match[1] };
    // Parsing numbers: We look for chains of digits
    else if (match = /^\d+\b/.exec(program)) expr = { type: "value", value: Number(match[0]) };
    // Parsing words, aka binding names: We look for everything that doesn't contain a whitespace, slash, parentheses, quotes
    else if (match = /^[^\s(),"]+/.exec(program)) expr = { type: "word", value: match[0] };
    // Anything else is a syntax error
    else throw new SyntaxError("Unexpected syntax: " + program);

    return parseApply (expr, program.slice(match[0].length))
}

/**
 * Parses applications, i.e. expressions to be run or executed
 * @arg expr The application expression (e.g. do, if, ...)
 * @arg program The remaining program string from last parse operation
 * @returns The syntax tree object for the given application
 */
function parseApply (expr, program) {
    program = skipSpace(program);

    // An application must be wrapped between parentheses, so first thing is to verify this
    if (program[0] != "(") return { expr: expr, rest: program };

    program = skipSpace(program.slice(1));
    expr = { type: "apply", expr: expr, args: [] };

    while (program[0] != ")") {
        let arg = parseExpression(program);
        expr.args.push(arg.expr);

        program = skipSpace(arg.rest);
        if (program[0] == ",") program = skipSpace(program.slice(1));
        else if (program[0] != ")") throw new SyntaxError("Expected ',' or ')'");    
    }

    // We proceed a last recursive call to see if there are no following parentheses
    return parseApply(expr, program.slice(1));
}


function parse (program) {
    let { expr, rest } = parseExpression(program);
    if (skipSpace(rest).length > 0) throw new SyntaxError("Unexpected text after program");
    return expr;
}


/**
 * Trims all whitespaces at the start of a string
 * @arg str The string to be trimmed
 * @returns A string with all starting whitespace removed
 */
function skipSpace (str) {
    let first = str.search(/\S/);   // We look for the first non-whitespace character
    if (first == -1) return "";
    else return str.slice(first);
}


let prog = "do( define(x, 10), <(x, 5))(123)";
console.log(JSON.stringify(parse(prog), null, 4));