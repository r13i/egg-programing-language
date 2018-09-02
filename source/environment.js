"use strict"

/**
 * The top-level scope holding basic definitions (Booleans, basic arithmetic, display capabilities)
 */
const topScope = Object.create(null);

// Booleans
topScope.true = true;
topScope.false = false;

// Arithmetic
for (let op of ["+", "-", "*", "/", "%", "<", ">", "<=", ">=", "==", "!="]) {
    topScope[op] = Function("a, b", `return a ${op} b;`);
}

// Display capabilities
topScope.print = value => {
    console.log(`[Out]> ${value}`);
    return value;
}


module.exports = topScope;