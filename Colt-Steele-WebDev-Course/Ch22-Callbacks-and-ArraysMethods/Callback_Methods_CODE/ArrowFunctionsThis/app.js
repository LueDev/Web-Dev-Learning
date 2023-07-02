/*

In JavaScript, the behavior of the this keyword differs between arrow functions and non-arrow functions. 
Understanding this difference is crucial because this refers to the execution context or the object that 
a function is being called on, and it can affect how functions access and manipulate data.

Non-Arrow Functions: - - - - - - - - - - - - - - - - - - - - 
In non-arrow functions, the value of this is determined by how the function is called. It is dynamically 
bound and refers to the object that called the function or the object that the function is a method of. 
The value of this can change based on the calling context.

        const obj = {
        name: 'John',
        greet: function() {
            console.log('Hello, ' + this.name);
        }
        };

        const greetFn = obj.greet;
        greetFn(); // Output: Hello, undefined (value of this.name is undefined)

    In this example, when greetFn() is invoked, the function is called without any explicit context, 
    so this inside the function points to the global object (window in a browser, or global in Node.js), 
    and this.name is undefined.   

Arrow Functions:
Arrow functions, on the other hand, do not bind their own this value. Instead, they inherit the this value 
from the surrounding context in which they are defined. They lexically bind the this value, meaning that 
this retains the value of the enclosing scope where the arrow function is defined.

        const obj = {
        name: 'John',
        greet: function() {
            const innerFunc = () => {
            console.log('Hello, ' + this.name);
            };
            innerFunc();
        }
        };

        obj.greet(); // Output: Hello, John

    In this example, the arrow function innerFunc is defined inside the greet method. Since arrow functions inherit 
    this from the surrounding context (the greet method), this inside innerFunc refers to the same this as in the 
    outer function. Therefore, this.name correctly accesses the name property of the obj object.

In summary, arrow functions have a lexical this binding, which means they inherit the this value from the surrounding 
context, while non-arrow functions have a dynamically bound this value, which is determined by the calling context.
*/

/*
Traditional (non-arrow) functions 'this' keyword relates to where the func is executed, not created.
Arrow Funcs 'this' keyword relates to where it is created bc it inherits the 'this' value from the surrounding/parent func. 
*/

const person = {
    firstName: 'Viggo',
    lastName: 'Mortensen',
    fullName: function () {
        return `${this.firstName} ${this.lastName}`
    },
    shoutName: function () {
        setTimeout(() => {
            //keyword 'this' in arrow functions refers to the value of 'this' when the function is created
            console.log(this);
            console.log(this.fullName())
        }, 3000)
    }
}