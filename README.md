# ES2015 cheatsheet

1. Declarations
  - [Let](#let)
  - [Const](#const)
2. Functions
  - [Function Defaults](#function-defaults)
  - [Rest Params](#rest-params)
  - [Spread Operator](#spread-operator)
  - [Arrow Functions](#arrow-functions)

### Let
`Let` variables are scoped to the nearest *block* and are not hoisted to the top of the function like regular variables declared with `var`.

```javascript
function testFunc (){	

	// Variables that get hoisted
	// var x, xIsTrue, xIsFalse;

	var x = true;

	if (x){
		var xIsTrue = true;
	}else{
		var xIsFalse = true;
	}

	/*
	 * Returns undefined rather than a reference error, meaning the variable exists
	 * This happens b/c vars are hoisted to top of the function
	 */
	console.log(xIsFalse)
}

```

```javascript
function testFunc (){	

	// Variables that get hoisted
	// var x;

	var x = true;

	if (x){
		let xIsTrue = true;
	}else{
		let xIsFalse = true;
	}

	/*
	 * Will return refernce error
	 * Reference Error: xIsFalse is not defined
	 */
	console.log(xIsFalse)
}

```

let variables can be reassigned

```javascript
let x = 1;
x = 2;
```

but they cannot be redeclared

```javascript
let x = 1;
let x = 2;
```

the above will result in a type error

```bash
> TypeError: Identifier 'x' has already been declared
```

Using var in *for* loops may also cause some unexpected behaviour because of hoisting. Especially, if you have callbacks within the for loop.

```javascript

function sayHi (names){
	for (var i in names){

	  someFunc('do something', function(){
	  	// Console log within callback function
	  	console.log('Hi', names[i])
	  })
	}
}

```

Executing `sayHi(['Tom', 'Gaby', 'Audrey'])` within the callback will print out the following 

```bash
	> Hi Audrey
	> Hi Audrey
	> Hi Audrey
```

Use *let* in for loops to prevent hoisting

```javascript

function sayHi (names){
	for (let i in names){

	  someFunc('do something', function(){
	  	// Console log within callback function
	  	console.log('Hi', names[i])
	  })
	}
}

```

Executing `sayHi(['Tom', 'Gaby', 'Audrey'])` will now print out the following within the callback function as a new instance of i will be created in each iteration of the loop. 

```bash
	> Hi Tom
	> Hi Gaby
	> Hi Audrey
```


### Const

`const` keyword creates *read-only* named constants. 

```javascript
const MAX_TRIES = 5;
```

Constants cannot be reassigned. The following will not work and *MAX_TRIES* will stay equal to 5.

```javascript
const MAX_TRIES = 5;
MAX_TRIES = 10;
```

Constants also cannot be initialized without an initial value. The following will not work.

```javascript
const MAX_TRIES;
MAX_TRIES = 5;
``` 

Similar to let, constants are block scoped

```javascript
function someFunc (tries){
	
	const MAX_TRIES = 5;

	if (tries > MAX_TRIES){

		const LOCKOUT_TIME = 600000; // not visible outside of if block
		lockUser(LOCKOUT_TIME);
	}

	/*
	 * Will return refernce error
	 * Reference Error: LOCKOUT_TIME is not defined
	 */
	console.log(LOCKOUT_TIME)

}
```
