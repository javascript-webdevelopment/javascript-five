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

