# ES2015 cheatsheet

### Let
`Let` variables are scoped to the nearest *block* and are not hoisted to the top of the function like regular variables declared with `var`. A block is any code section with curly braces (i.e. if, else, for, while, etc.)

```javascript
function testFunc (){	

	var x = false;

	if (x){
		var xIsTrue = true;
	}else{
		var xIsFalse = true;
	}

	/*
	 * Returns undefined rather than crashing program
	 * This happens b/c vars are hoisted to top of func
	 */
	console.log(xIsTrue)
}

```