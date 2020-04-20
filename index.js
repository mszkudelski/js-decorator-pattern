// Import stylesheets
import "./style.css";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>JS Decorator Example</h1>`;

const LoggerService = {
  log: console.log
};

function Log(message) {
  return function(target, propertyKey, descriptor) {
    const originalFunction = descriptor.value;
    descriptor.value = function(...args) {
      LoggerService.log(message, ...args);
      return originalFunction.bind(target)(...args);
    };
    return descriptor;
  };
}

class Cart {
  @Log("Product added!")
  addProduct(productName, quantity) {}
}

new Cart().addProduct("Bread", 12);
new Cart().addProduct("Eggs", 2);

// Plain ES5 Example

function decorate(target, property, callback) {
  const descriptor = Object.getOwnPropertyDescriptor(target, property);
  Object.defineProperty(target, property, callback(descriptor));
}

function LogES5(message) {
  return function(descriptor) {
    const originalFunction = descriptor.value;
    descriptor.value = function(...args) {
      LoggerService.log(message, ...args);
      return originalFunction.bind(target)(...args);
    };
    return descriptor;
  };
}

const cart = {
  addProduct(productName, quantity) {}
};

decorate(cart, "addProduct", LogES5("Product added in ES5!"));

cart.addProduct("ES5 Bread", 6);
