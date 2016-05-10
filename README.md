# ES2015 cheatsheet

1. Declarations
  - [Let](#let)
  - [Const](#const)
2. Functions
  - [Default Parameters](#default-parameters)
  - [Options Object and Named Parameters](#options-object-and-named-parameters)
  - [Rest Parameters](#rest-parameters)
  - [Spread Operator](#spread-operator)
  - [Arrow Functions](#arrow-functions)

## Let
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


## Const

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
	console.log(LOCKOUT_TIME);

}
```

## Default Parameters 

Take the following function

```javascript
function showUsers(userNames){
	let numUsers = userNames.length;
	console.log(numUsers);
}
```

Below would return 3
```javascript
showUsers(['Tom', 'Gaby', 'Audrey']);
```

The following would return a type error
```javascript
showUsers();
// TypeError: Cannot read property 'length' of undefined
```

You can not always assume that userNames will always be assigned a value. So, historically, a common practice is to check for the presence of arguments as the very first thing in the function. 

```javascript
function showUsers(userNames){
	let users = !userNames ? [] : userNames;
	let numUsers = users.length;
	console.log(numUsers);
}
```

There is a cleaner way of doing this. Enter default function parameters.

```javascript
function showUsers(userNames=[]){
	let numUsers = userNames.length;
	console.log(numUsers);
}
```

now 

```javascript
showUsers();
```
will return 0 instead of a type error as userNames will default to an empty array if it is not passed.

## Options Object and Named Parameters

The options object is a widely used pattern that allows user-defined settings to be passed to a function in the form of properties on an object.

```javascript
function doSomething(action, options = {}){
	
	let visible = options.visible;
	let expires = options.expires;

	console.log("visible", visible);
	console.log("expires", expires);
}

doSomething("Something cool", {
	visible: true,
	expires: 50000
})
```

The problem with the above example is that it is not clear what options the function can take. Named parameters for optional settings make it easier to understand how a function should be invoked.

```javascript
function doSomething(action, {visible, expires}){
	
	console.log("visible", visible);
	console.log("expires", expires);

}

doSomething("Something cool", {
	visible: true,
	expires: 50000
})
```

What if omit options object in function call? A type error 

```javascript
doSomething("Something cool")
```


## Rest Parameters 

The new rest parameter syntax allows us to represent an indefinite number of aruguments as an explicit Array argument. The 3 dots infront of the `names` parameter are part of the new syntax and will push all `names` arguments passed into this function into an Array.

```javascript
function sayHi(x, y, z, ...names){

	console.log(x);

	for (let i in names){
		console.log("Hi ", names[i])
	}
}
```

Rest Paremeters must always be the last parameter in a function signature. This is because all arguments passed into the function (after the other regular paremeters) will be pushed into the Rest parameter array.

As an example, executing the following 
```javascript
sayHi("Saying hi", "Gaby", "Audrey", "Tom");
```

would return
```bash
> Saying hi
> Hi Gaby
> Hi Audrey
> Hi Tom
```

## Spread Operator
You can also use dot notation to split an array into individual arguments

```javascript

var names = ["Gaby", "Audrey", "Tom"];
sayHi("Saying hi", ...names); // becomes sayHi("Saying hi", "Gaby", "Audrey", "Tom")

```

The syntax for Rest Parameters and Spread Operators looks the same. However, `Rest Parameters` are used in function definitions of variatic functions and push arguments into an array. Whereas, the `Spread Operator` is used in function invocations and spreads an array into multiple arguments within the function call. 

Same syntax, but different behaviour depending on wher the dot notation is used.

## Arrow Functions

Arrow functions can be used to preserve scope. Arrow functions have a lexical binding which means that they bind to the scope of where they are defined and not where they run.




