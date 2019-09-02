// What is a closure?
  // A closure is a function that is returned from another function that will rely on data declared within the lexical scope
  // Lexical Scope is the term we use to reference the scope of a declared variable based on it's position within the code
  // Inner functions always contain the scope of the outer functions

  // Example:
  function counter(){
    // Local variable to the counter function
    let count = 0;

    // The closure function that is returned that will rely on data from the counter functions scope
    function addOne(){
      count += 1;
      console.log(count);
    };

    // Return the inner 'addOne' function
    return addOne;
  };

// Create some new counters
const counterOne = counter();

// Console log what counterOne is, it should be the addOne function that is returned
console.log(counterOne);

// Now that counterOne is a function, we can invoke it
counterOne();

// What will happen when we invoke counterOne 5 times?
  // It should increase the private 'count' variable to 5
  // This is because it retains a reference (also known as a 'snapshot') to any variables from the parent functions scope, in this case, the count variable 
counterOne();
counterOne();
counterOne();
counterOne();

// What happens if we create a new variable and assign it the value of counter invoked?
const counterTwo = counter();

// This will create a new 'snapshot' of the counter functions scope and assign it to the counterTwo variable
counterTwo();
counterTwo();
counterTwo();
counterTwo();

// Invoking counterTwo 4 times will now log out to four because it's snaochat is different from the counterOne's snapshot

// Practice creating closures

// Lets make a closure to keep track of orders a sandwich shop
function createOrder(){
  // this array will store the ingrediants on our sandwich
  const order = [];
  // the innerfunction that is returned will add the ingrediant to the order
  return function addIngredient(ingredient){
    order.push(ingredient);
    return order;
  };
};

// Let's create an order
let taytesOrder = createOrder();
// Now add ingredients using the closure function
taytesOrder('Meatballs');
taytesOrder('Marinara Sauce');
taytesOrder('Parmasen Cheese');

// Create another order
let someonesOrder = createOrder();
// Now add ingredients
someonesOrder('Ham');
someonesOrder('Cheese');

// Now lets add more functionality to this closure using a modular pattern

function createOrderV2(){
let orderIngredients = [];

// return a module that encases multiple methods
return {
  addIngredient(ingredient){
    orderIngredients.push(ingredient);
    return orderIngredients;
  },
  removeIngredient(ingredient){
    // check to make sure the ingredient exists
    let ingredientIndex = orderIngredients.indexOf(ingredient);
    // this will return the index value if found, if not it will return -1
    // check to see if the item is missing
    if(ingredientIndex === -1){
      // return an error message
      return 'Sorry, that ingredient does not exist.'
    }else {
      // if it is found, remove the item
      orderIngredients.splice(ingredientIndex, 1);
      return orderIngredients;
    }
  },
  readOrder(){
    return orderIngredients;
  }
}
};

// Let's create another closure function that will mimic a calculator using the modular pattern
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

// Create an instance of a calculator using the calculator closure
let ti84 = calculator();
// logging the ti84 should return the module or object that encases the different methods we can execute
console.log(ti84);
// lets use the new texas instrument YEEEHAW 🤠
ti84.add(10);
ti84.subtract(5);
ti84.multiply(2);
ti84.divide(2);

// Let the students create their own closure function by creating a bank account where they can deposit, withdraw, and check balance
// Give the students about 10-15 minutes

// Solution
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