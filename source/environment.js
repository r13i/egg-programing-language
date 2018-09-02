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
    console.log(`[Output Egg]> ${value}`);
    return value;
};

topScope.array = (...values) => values;

topScope.length = array => array.length;

topScope.element = (array, n) => {
    if (array.length == 0) throw new RangeError("Array is actually empty");
    if (n > array.length - 1) throw new RangeError(`Reference index out of bound. Array length is ${array.length}`);
    return array[n];
};


module.exports = topScope;