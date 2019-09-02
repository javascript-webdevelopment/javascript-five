# Javascript Five

In this lecture we cover closures, prototypal inheritance, and constructor functions.

## Closures

A `closure function` is a function that is returned from another function. The inner function that is returned will rely on data that is declared in the outher functions scope.

Here is an example.

```js
  function counter(){
    // Local variable to the counter function
    let count = 0;

    // The closure function that is returned that will rely on data from the counter functions scope
    function addOne(){
      return count += 1;
    };

    // Return the inner 'addOne' function
    // It's important to note that we DO NOT invoke the 'addOne' function because we want to return the function itself
    return addOne;
  };
```

We can now create what we like to call `snapshots` of the closure function. When a function forms a closure, it has access to all of it's local variables and the lexical environment. The lexical scope that the function has access to is the `snapshot`.

`lexical scope` - This is where we determine a variables or functions scope based solely on it's position in our code.

We can create the snapshot like this.

```js
const countOne = counter();
```

`countOne` is now a function. It's easy to think that it is now just the `addOne` inner function that gets returned from `counter`.  The `countOne` function now retains a reference to the variables that were declared inside of the lexical scope of the `counter` function.

So we can invoke this snapshot multiple times to increment the `private` count variable.

```js
countOne();
countOne();
countOne();
```

We can also create a brand new `snapshot`.

```js
const countTwo = counter();
```

Then we can use the new snapshot multple times. The `count` variable in the `countTwo` will not be the same variable we refer to in `countOne`.

```js
countTwo();
countTwo();
countTwo();
```

### Module Pattern

We can follow a `module pattern` with our closure functions by creating `private variables` and `private functions`. This is a way that we can create data that will be shielded from our `global scope` so the only function that has access to it, is the `closure function`.

```js
function modulePattern() {
  // variables and functions here are private and are only accessed through the public functions in the returned object
  let privateVariable = 'I am private';
  
  let privateFunction = function() {
    console.log(privateVariable)
  }
  
  return {
    // everything returned is public
    changeVar: function(str) {
      privateVariable = str;
    },
    readVar: function() {
      privateFunction();
    }
  }
}

// module1 is now a public object with public methods that access and change private variables.
// Notice how we can not call module1.privateFunction
// We can only call that function within the code of the function.
var module1 = modulePattern();
```

This time we are returning multiple functions, rather than just one function.

### Closure Practice Problems

Now let's practice creating some closure functions with different use cases.

Let's first create a closure function to make a sandwhich.

```js
function createSandwhich(){
    // this will keep track 
    const sandwhichIngredients = [];
    // thefunction that gets returned will add ingredients to the sandwhich
    function addIngredient(ingredient){
        sandwhichIngredients.push(ingredient);
        return sandwhichIngredients;
    }
    // return the function
    return addIngredient;
}
```

We now have a sandwhich maker closure function that we can easily re-use to create new sandwhiches. Let's go ahead an now make a few.

```js
// make the sandwhich
let tayteSandwhich = createSandwhich();
// add ingredients
tayteSandwhich('Meatballs');
tayteSandwhich('Marinara Sauce');
tayteSandwhich('Parmasen Cheese');
```

```js
// make the sandwhich
let mattSandwhich = createSandwhich();
// add ingredients
mattSandwhich('Ham')
mattSandwhich('Cheese')
```

Now let's revamp our closure function to add more functionality by following the module pattern.

```js
function createSandwhich(){
    // this will keep track 
    const sandwhichIngredients = [];

    // add ingredients
    function addIngredient(ingredient){
        sandwhichIngredients.push(ingredient);
        return sandwhichIngredients;
    };
    
    // remove ingredients
    function removeIngredient(){
        // check to make sure the ingredient exists
        // this will return the index value or -1 if not found
        let ingredientIndex = sandwhichIngredients.indexOf(ingredient);
        // check to see if item is missing
        if(ingredientIndex === -1){
            // return an error message
            return 'Sorry, that ingredient does not exist. Pleas try another!'
        } else {
            // if it is found, remove the item
            sandwhichIngredients.splice(ingredientIndex, 1);
            return sandwhichIngredients;
        };
    };

    // read the ingredients
    function readIngredients(){
        return sandwhichIngredients;
    };

    // create the module or object thatv will be returned
    return {
        addIngredient,
        removeIngredient,
        readIngredients
    };
}
```

Let's used our revamped sandwhich maker closure function.

```js
// make the sandwhich
let tayteSandwhich = createSandwhich();
// add ingredients
tayteSandwhich.addIngredient('Meatballs');
tayteSandwhich.addIngredient('Marinara Sauce');
tayteSandwhich.addIngredient('Parmasen Cheese');
// remove ingredient
tayteSandwhich.removeIngredient('Meatballs');
// read the ingredients on the sandwhich
tayteSandwhich.reaadIngredients();
```

