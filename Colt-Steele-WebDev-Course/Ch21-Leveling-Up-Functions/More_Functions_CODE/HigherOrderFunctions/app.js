// ======================
// FUNCTIONS AS ARGUMENTS
// ======================

function callTwice(func) {
    func();
    func();
}

function callTenTimes(f) {
    for (let i = 0; i < 10; i++) {
        f()
    }
}

function rollDie() {
    const roll = Math.floor(Math.random() * 6) + 1
    console.log(roll)
}

callTwice(rollDie)

// ====================
// RETURNING FUNCTIONS
// ====================


function makeMysteryFunc() {
    const rand = Math.random();
    if (rand > 0.5) {
        return function () {
            console.log("CONGRATS, I AM A GOOD FUNCTION!")
            console.log("YOU WIN A MILLION DOLLARS!!")
        }
    } else {
        return function () {
            alert("YOU HAVE BEEN INFECTED BY A COMPUTER VIRUS!")
            alert("STOP TRYING TO CLOSE THIS WINDOW!")
            alert("STOP TRYING TO CLOSE THIS WINDOW!")
            alert("STOP TRYING TO CLOSE THIS WINDOW!")
            alert("STOP TRYING TO CLOSE THIS WINDOW!")
            alert("STOP TRYING TO CLOSE THIS WINDOW!")
        }
    }
}

// Calling makeMysteryFunc() returns the function defition. 
// To execute the functions, rather than return their definition, 
//      the function must be captured/assigned a variable that we 
//      may then call with parenthesis () to execute the function. 

const mystery = makeMysteryFunc();
mystery() // This executes the function definition returned from makeMysteryFunc()


//This is known as a factory function. This function is passed
//as a function expression 
//      const varName = makeBetweenFunc(1, 5))
//which can be called with passed arguments 
//      varName(4) which would return true given it's between 1 and 5.

// We can repeatedly use this function as a quicker/intuitive tool for 
// function usage
function makeBetweenFunc(min, max) {
    return function (num) {
        return num >= min && num <= max;
    }
}

const isChild = makeBetweenFunc(1, 17);
const isAdult = makeBetweenFunc(18, 59);
const isSenior = makeBetweenFunc(60, 120);

isChild(16); // returns true
isChild(18); // returns false
isAdult(19); // returns true
isAdult(66); // returns false