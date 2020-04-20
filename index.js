// Import stylesheets
import "./style.css";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>JS Decorator Example</h1>`;

const LoggerService = {
  log: console.log
};

// === Modern decorator solution ===

function Log(message) {
  return function(target, propertyKey, descriptor) {
    const originalFunction = descriptor.value;
    descriptor.value = function(...args) {
      LoggerService.log(message, ...args);
      return originalFunction.call(this, ...args); 
    };
    return descriptor;
  };
}

class Cart {
  products = [];

  method( ){}
  @Log("Product added!")
  addProduct(productName, quantity) {
    this.products.push({ productName, quantity });
  }
}

const cart = new Cart();

cart.addProduct("Bread", 12);
cart.addProduct("Eggs", 2);

// === Plain ES5 Example ===

function decorate(target, property, callback) {
  const descriptor = Object.getOwnPropertyDescriptor(target, property);
  Object.defineProperty(target, property, callback(descriptor));
}

function LogES5(message) {
  return function(descriptor) {
    const originalFunction = descriptor.value;
    descriptor.value = function(...args) {
      LoggerService.log(message, ...args);
      return originalFunction(...args);
    };
    return descriptor;
  };
}

function CartES5() {
  this.products= [];
  this.addProduct = (productName, quantity) => {
    this.products.push({ productName, quantity });
  }
}

const cartES5 = new CartES5();

decorate(cartES5, "addProduct", LogES5("Product added in ES5!"));

cartES5.addProduct("Bread", 6);
