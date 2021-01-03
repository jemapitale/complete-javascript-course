///////////////////////////////////////
// Lecture: Hoisting
calculateAge(1990);

//function declaration
function calculateAge(year){
    console.log(2020-year);
}

calculateAge(1997);

// This is hoisting. In the creation phase of the execution context (in this case global context), the function declared calculateAge is stored in the variable object and even before the code is executed. 
// This is why when we enter the execution phase, the calculateAge function is already available for us to use it. We don't have to first declare the function and then use it, but we can also first use it and only declare it in our code later. This is why calling the function works before and after it is declared.

// This only works for function declarations.

//function expression - years until retire
//retirement(1992);
var retirement = function(year){
    console.log(65 - (2020 - year));
}

retirement(1990);

// Calling the function before the function won't work. This is because this function is not a function declarition, but a function expression. 

//Hoisting with functions only works for function declarations.

//Hoisting also occurs with variables, but in a different way.
console.log(age);
var age = 23;
console.log(age);
// Calling the variable before it is defined does not result in an error (like the function expression does). Instead it appears as undefined. JS knows that there will be an age variable but we don't have the value yet.
// This is because in the creation phase of the variable object, the code is scanned for variable declaration and they are then set to undefined.
// If there was no variable and it was called, then we would get an error because there is no declaration.

function foo() {
    console.log(age);
    var age = 65;
    console.log(age);
}
foo();
console.log(age);

// The console prints two different values for age. The variable of age on #31 gets stored in the global execution object.
// The foo function gets its own execution context object in which we can store a variable of the same name, evern though they are different variables.
// Hoisting works the same way in functions (are undefined if you call them before they are declared).
// Hoisting adv+ - can use function declarations before they are declared.

///////////////////////////////////////
// Lecture: Scoping

console.log('SCOPING');
// First scoping example


var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}




// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

console.log("'THIS' LECTURE");

calculateAgeThis(1985)
function calculateAgeThis(year){
    console.log(2020 - year);
    console.log(this);
    //the 'this' variable is a window object because it is a regular function call, not a method. The object that is function is attached to is the global object.
}

var johnOb = {
    name: 'John',
    birthYear: 1990,
    calculateAge: function(){
        console.log(this);
        console.log(2020 - this.birthYear);
        function innerFunc(){
            console.log('In INNER ');
            console.log(this);
            // the 'this' keyword in the inner function is back to being the window, not the john object.
        }
        innerFunc();
    }
    //function expression not a function declaration
}

johnOb.calculateAge();
// the this variable now is the johnOb because the 'this' keyword refers to the object that called the method.

var mikeOb = {
    name: 'Mike',
    birthYear: 1984
    //METHOD BORROWING
}

mikeOb.calculateAge = johnOb.calculateAge;
//We don't use the paraenthesis because the parenthesis are for calling a function. We are treating the function here as a variable.
mikeOb.calculateAge();

