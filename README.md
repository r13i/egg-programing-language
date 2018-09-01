# Creating a new programming language, called Egg:

This project is inspired from the book: Eloquent JavaScript, 3rd edition.

### Parsing:

The syntax is the first visible part of a script in programming language.

The language we are building will have the following specifications:
- Egg will be an expression-oriented language.
- Strings will be sequences of characters, wrapped in double quotes, with no back-slash escape.
- Binding names are any expression that doesn't consist of a whitespace, and that doesn't have any meaning in the syntax.
- Scripts will be written by putting parentheses after expressions, while having arguments sparated with commas between these parentheses.
- Operators like (>, <, +, ...) are normal bindings, applied like any function.
- To do multiple instructions in sequence, and since there is no concept of block, we need a `do` construct to represent this.
- Each program will be described with data structures that are basically objects (expression objects), each of which has a `type` property indicating the type of the expression and other properties indicating its content.
- <strong>Syntax Tree :</strong>
    - Type `value` represents strings or numbers. Their `value` property holds the value of the expression.
    - Type `word` is used for identifiers, binding names, ..., with a `name` property holding the name string.
    - Type `apply` is used for applications, with an `operator` property refering to the expression being applied, and an 'args' property that is an array holding the arguments.
