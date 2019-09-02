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

Now let's create another closure function that has a little more functionality. This time we will create a calculator that we can use to perform basic math operations for us. We will use the `modular pattern` to house our methods.

```js
function calculator(){
  // create a starting value at zero
  let value = 0;
  // return a module that will contain methods for functionality
  return {
    add(num){
      return value += num;
    },
    subtract(num){
      return value -= num;
    },
    multiply(num){
      return value *= num;
    },
    divide(num){
      return value /= num;
    }
  };
};
```

Let's use the new calculator that we just created.

```js
let ti84 = calculator();
// logging the ti84 should return the module or object that encases the different methods we can execute
console.log(ti84);
// lets use the new texas instrument YEEEHAW 🤠
ti84.add(10);
ti84.subtract(5);
ti84.multiply(2);
ti84.divide(2);
```

The final closure method that we will now create will be a bank account. We want this closure function to have full functionality of a bank account. We want to be able to deposit, withdraw, and check our balance. Let's make sure we use the `modular pattern` so we can return multiple functions.

```js
function createAccount(){
  // define a starting balance
  let balance = 0;
  // return a module with methods to deposit, withdraw, and check balance
  return {
    deposit(amount){
      return balance += amount;
    },
    withdraw(amount){
      return balance -= amount;
    },
    checkBalance(){
      return 'Account has a balance of ' + balance;
    }
  }
};
```

## Constructor Functions and Protoype Methods

A `constructor function` is special function we can use in javascript to create a new object. These are what `classes` are built around in javascript.

It's easy to think that a `constructor function` is a blueprint to the object we want to build.

We will create a `constructor function` just like any other function, except this time it will start will capital letter.

```js
function Car(){

}
```

Inside of the constructor function, we use the `this` keyword to refer to the object the function will build. The instance will automatically be returned for us so we do not need to delcare the `return` statement.


```js
function Car(){
    // this ==> {} IMPLIED
    this.make = 'Tesla';
    this.model = 'Model X';
    // return this IMPLIED
}
```

We can now create a new `instance` or a new object from the constructor function using the `new` keyword.

```js
const myCar = new Car();
console.log(myCar) // => {make: 'Tesla', model: 'Model X'}
```

The `new` keyword will set the context for our constructor. It is what creates the object that we refer to using the `this` keyword.

We can also use `parameters` in our constructor functions to accept user input and use dynamic data.

```js
// same constructor as before, but this time we recieve arguments
function Car(make, model){
    this.make = make;
    this.model = model;
}
```

we can now call upon that constructor function to create a new instance and pass in data to that instance.

```js
const myCar = Car('Tesla', 'Model X');
```

Now let's add some methods to our contructor function.

```js
function Car(make, model){
    this.make = make;
    this.model = model;

    // method to honk
    this.honk = function(){
        alert('Beep Beep');
    }
}
```

Now let's create some instances from our new constructor that has a method on it.

```js
var subaru = new Car('Subaru', 'WRX');
var civic = new Car('Honda', 'Civic');
var tesla = new Car('Tesla', 'Model S');
```

We can now call the `honk` method on all of the car instances that we have created.

```js
subaru.honk();
civic.honk();
tesla.honk();
```

If we take a closer look at this, by console logging the instance objects, you can see that we are delcaring a new `honk` function everytime we create a new instance from the Car constructor. This could be very impactful and not memory efficiant for our applications when we create hundreds of instances from that constructor.

So how can we go about having this method avaiable to us for every instance, but only declare it once? This is where `prototype functions` save the day!

Instead of putting the `honk` method on every instance that gets created, we can add the method as a `prototype method` to the `Car` constructor. This will allow all car objects made from the Car constructor to have access to it, while only having to delcare it once.

We will directly target the `prototype` property that exists on the `Car` function (object) and add the method onto it.

```js
Car.prototype.honk = function(){
    alert(`Beep Beep, I am a ${this.make}!`);
}

// Now we can create our instances
var subaru = new Car('Subaru', 'WRX');
var civic = new Car('Honda', 'Civic');
var tesla = new Car('Tesla', 'Model S');

// We can still use the prototype method on every instance
subaru.honk();
civic.honk();
tesla.honk();

// notice how the `honk` method does not show up on the instance when we console log it now
console.log(subaru)
console.log(civic)
console.log(tesla)
```

After console logging the instances, we can see that the `honk` method no longer exists on that object. So how does the object have access to that prototype method?

This is where `prototypal inheritance` comes into play.
