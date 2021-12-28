# JavaScript Interview Questions and Answers

<br/>

## 1. Basic Concepts

### 1) What is the difference between JavaScript and ECMAScript?

`Ecma International` is an organization that creates standards for technologies. They've been operating since 1961, and in that time, they've created a wide range of global technology standards. `ECMA-262` is a standard published by Ecma International. It specifies a general-purpose scripting language. The language is called `ECMAScript`.

`JavaScript` is a general-purpose scripting language that conforms to the `ECMAScript specification`. The ECMAScript specification is a blueprint for creating a scripting language. JavaScript is an implementation of that blueprint. On the whole, JavaScript implements the ECMAScript specification as described in ECMA-262.

<br/>

### 2) What is V8 JavaScript engine?

`V8` is an open-source JavaScript engine developed by the Chromium Project for Google Chrome and Chromium web browsers. The project’s creator is Lars Bak. The first version of the V8 engine was released at the same time as the first version of Chrome: 2 September 2008. It has also been used on the server side, for example in Couchbase and Node.js.

`V8` first generates an abstract syntax tree with its own parser. Then, `Ignition` generates bytecode from this syntax tree using the internal V8 bytecode format. `TurboFan` compiles this bytecode into machine code. In other words, `V8` compiles `ECMAScript` directly to native machine code using `just-in-time` compilation before executing it. The compiled code is additionally optimized (and re-optimized) dynamically at runtime, based on heuristics of the code's execution profile. Optimization techniques used include `inlining`, `elision` of expensive runtime properties, and `inline caching`. The `garbage collector` is a generational incremental collector.

<br/>

## 2. Varaibles and Data Types

### 1) What are JavaScrpt data types?

#### Primitive

In `JavaScript`, a `primitive` (primitive value, primitive data type) is data that is not an object and has no methods. There are 7 primitive data types: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, and `null`.

- string
- number
- bigint
- boolean
- undefined
- symbol
- null

`All primitives` are `immutable`, i.e., they cannot be altered. It is important not to confuse a primitive itself with a variable assigned a primitive value. The variable may be reassigned a new value, but the existing value can not be changed in the ways that objects, arrays, and functions can be altered.

<br/>

#### Primitive wrapper objects in JavaScript

Except for `null` and `undefined`, all primitive values have object equivalents that wrap around the primitive values:

- String
- Number
- Bigint
- Boolean
- Symbol

<br/>

#### Non-primitive (objects)

- object
- function
- array

The fundamental difference between `primitives` and `non-primitives` is that primitives are immutable and non-primitives are mutable.

In JavaScript, objects can be seen as a collection of properties. With the object literal syntax, a limited set of properties are initialized; then properties can be added and removed. Property values can be values of any type, including other objects, which enables building complex data structures. Properties are identified using key values. A key value is either a String value or a Symbol value.

```javascript
var string = "This is a string.";
string[1] = "H";
console.log(string); // 'This is a string.'
```

<br/>

### 2) What is Prototype?

A `prototype` is an object that is associated with every functions and objects by default in JavaScript, where function's prototype property is accessible and modifiable and object's prototype property (aka attribute) is not visible.

The prototype object is special type of enumerable object to which additional properties can be attached to it which will be shared across all the instances of it's constructor function.

```javascript
function Student() {
  this.name = "John";
  this.gender = "M";
}

Student.prototype.age = 15;

var studObj1 = new Student();
alert(studObj1.age); // 15

var studObj2 = new Student();
alert(studObj2.age); // 15
```

<br/>

### 3) What is the difference among var, const and let keywords.

#### var

Scope of var:

`Scope` essentially means where these variables are available for use. `var` declarations are globally scoped or function/locally scoped.

The scope is global when a var variable is declared outside a function. This means that any variable that is declared with var outside a function block is available for use in the whole window.

And var is function scoped when it is declared within a function. This means that it is available and can be accessed only within that function.

```javascript
var globVal = "hello world!";

function myFunction() {
  var funcVal = "nice to meet you.";
}

console.log(globVal); // hello world!
console.log(funcVal); // Uncaught ReferenceError: funcVal is not defined
```

<br/>

Reassigning and redeclation of var:

`var` variables can be reassigned and redeclared. This means that we can do this within the same scope and won't get an error.

```javascript
var greeter = "hey hi.";
greeter = "say Hello instead.";
```

```javascript
var greeter = "hey hi.";
var greeter = "say Hello instead.";
```

<br/>

Hoisting of var:

`Hoisting` is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. This means that if we do this:

```javascript
console.log(greeter);
var greeter = "say hello";
```

it is interpreted as follows:

```javascript
var greeter;
console.log(greeter); // undefined
greeter = "say hello";
```

So `var` variables are hoisted to the top of their scope and initialized with a value of `undefined`.

<br/>

#### let

Scope of let:

`let` is block scoped. A block is a chunk of code bounded by {}. A block lives in curly braces. Anything within curly braces is a block. So a variable declared in a block with let is only available for use within that block. Let me explain this with an example:

```javascript
let greeting = "say hello.";
let times = 4;

if (times > 3) {
  let greeting = "say hi instead.";
  console.log(greeting); // say hi instead.
}
console.log(greeting); // say hello.
```

<br/>

Reassigning and redeclation of let:

`let` can be reassigned but not be redeclared.

```javascript
let greeter = "hey hi.";
greeter = "say Hello instead.";
```

however, this returns an error.

```javascript
let greeter = "hey hi.";
let greeter = "say Hello instead."; // Uncaught SyntaxError: Identifier 'greeter' has already been declared
```

This fact makes `let` a better choice than `var`. When using let, you don't have to bother if you have used a name for a variable before as a variable exists only within its scope.

Also, since a variable cannot be declared more than once within a scope, then the problem that occurs with `var` does not happen.

<br/>

Hoisting of let:

Just like `var`, `let` declarations are hoisted to the top. Unlike `var` which is initialized as `undefined`, the `let` keyword is not initialized. **_So if you try to use a `let` variable before declaration, you'll get a `ReferenceError`._**

```javascript
console.log(greeting); // Uncaught ReferenceError: greeting is not defined.
let greeting = "say hello.";
```

<br/>

#### const

Variables declared with the `const` maintain constant values. `const` declarations share some similarities with `let` declarations.

Scope of const:

`const` declarations are block scoped. Like `let` declarations, `const` declarations can only be accessed within the block they were declared.

<br/>

Reassigning and redeclation of let:

`const` can not be reassigned and also not be redeclared.

we can neither do this:

```javascript
const greeter = "hey hi.";
greeter = "say Hello instead."; // Uncaught TypeError: Assignment to constant variable.
```

nor this:

```javascript
const greeter = "hey hi.";
const greeter = "say Hello instead."; // Uncaught SyntaxError: Identifier 'greeter' has already been declared.
```

Every `const` declaration, therefore, must be initialized at the time of declaration.

```javascript
const greeter; // Uncaught SyntaxError: Missing initializer in const declaration.
```

<br/>

This behavior is somehow different when it comes to `objects` declared with `const`. While a const object cannot be reassigned, the properties of this objects can be reassigned.

```javascript
const greeting = {
  message: "say hello.",
  times: 4,
};

greeting.message = "say hi instead";
console.log(greeting.message); // say hi instead.

greeting = {
  words: "say good morning.",
  times: 5,
}; // Uncaught TypeError: Assignment to constant variable.
```

<br/>

Hoisting of const:

Just like `let`, `const` declarations are hoisted to the top but are not initialized.

<br/>

#### Summary

- `var` declarations are globally scoped or function scoped while `let` and `const` are block scoped.
- `var` variables can be reassigned and redeclared within its scope; `let` variables can be reassigned but not redeclared; `const` variables can neither be reassigned nor redeclared.
- They are all hoisted to the top of their scope. But while `var` variables are initialized with `undefined`, `let` and `const` variables are not initialized.
- While `var` and `let` can be declared without being initialized, `const` must be initialized during declaration.

<br/>

## 3. Operators and Methods

### 1) What is the difference between '===' and '==' operators?

`==` checks only for equality in value, whereas `===` is a stricter equality test and returns false if either the value or the type of the two variables are different.

```javascript
console.log("10" == 10); // true
console.log("10" === 10); // false

console.log(null == undefined); // true
console.log(null === undefined); // false

console.log(0 == false); // true
console.log(0 === false); // false
```

<br/>

<br/>

### References

\[1\] _Cloud Academy. (?). [The Difference Between ECMAScript and JavaScript][1] [Web Tutorial]_

[1]: https://cloudacademy.com/course/the-difference-between-ecma-script-and-javascript/the-difference-between-ecmascript-and-javascript/

\[2\] _Wikipedia. (?). [V8 (JavaScript engine)][2] [Web Documentation]_

[2]: https://en.wikipedia.org/wiki/V8_(JavaScript_engine)/

\[3\] _Mozilla. (2021, Sep 20). [Primitive][3] [Web Documentation]_

[3]: https://developer.mozilla.org/en-US/docs/Glossary/Primitive/

\[4\] _freeCodeCamp. (2020, Apr 2). [Var, Let, and Const – What's the Difference?][4] [Web Documentation]_

[4]: https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/

<br/>

### Hashtags

`#JavaScript` `#ECMAScript` `#scripting language`

<br/>

<br/>

Last modified on the 26th of September, 2021.

<br/>

© 2021, Byeongcheol Yoo. All rights reserved.
