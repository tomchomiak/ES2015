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

	var x = true;

	if (x){
		var xIsTrue = true;
	}else{
		var xIsFalse = true;
	}

	/*
	 * Returns undefined rather than crashing program
	 * This happens b/c vars are hoisted to top of func
	 */
	console.log(xIsFalse)
}

```

```javascript
function testFunc (){	

	var x = true;

	if (x){
		let xIsTrue = true;
	}else{
		let xIsFalse = true;
	}

	/*
	 * Will get refernce error
	 * Reference Error: xIsFalse is not defined
	 */
	console.log(xIsFalse)
}

```

Use var in *for* loops may also cause some unexpected behaviour because of hoisting. Especially, if you have any callbacks within the for loop.

```javascript

function sayHi (names){
	for (var i in names){

	  someFunc(function(){
	  	// Console log within callback function
	  	console.log('Hi', names[i])
	  })
	}
}

```

Executing `sayHi(['Tom', 'Gaby', 'Audrey'])` will print out the following within the callback function. 

```bash
	> Hi Audrey
	> Hi Audrey
	> Hi Audrey
```

Use *let* in for loops to prevent hoisting

```javascript

function sayHi (names){
	for (let i in names){

	  someFunc(function(){
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
