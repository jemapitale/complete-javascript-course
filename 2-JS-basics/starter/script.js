/*console.log('This is a JavaScript external script.');
console.log('Hello World!!!');


/* VARIABLE AND DATA TYPES */

var firstName = 'Jema';
var lastName = 'Pitale';
var age = 22;
var fullAge = true;
/*
console.log(firstName);
console.log(fullAge);
console.log(age);

// Single line comment
/*
Multi-line comment
*/


/*VARIABLE MUTATION AND TYPE COERCION*/
/*
/*console.log(firstName + ' ' + age);
// age is automatically converted to a string.

var job, isMarried;
job = 'developer';
isMarried = false;
console.log(firstName + ' is a ' + job);

//Variable mutation - dynamic typing
age = 'twenty-two';
console.log(firstName + ' ' + age);

// pop-up window
alert(age);

// get input from user
var lastNamePrompt = prompt('What is your last name?');
console.log(firstName + ' ' + lastNamePrompt);
*/


/* BASIC OPERATORS */

//Math operators
var currentYear = 2020;
var ageJohn = 28;
var ageMark = 33;
var yearJohn = currentYear - ageJohn;
var yearMark = currentYear - ageMark;
/*
console.log(yearJohn);
// same for +, *, /

//Logical operators
var johnOlder = ageJohn > ageMark;
console.log(johnOlder);
// same for ==, >, <

//typeof operators
console.log(typeof johnOlder);


/*OPERATOR PRECEDENCE*/
var fullAge = 18;
var isFullAge = currentYear - yearJohn >= fullAge;
//this is actually 3 operators 
//'=' is asssignment, but it has the lowest precedence so it happens last.
// '-' has the highest precednce so occurs first 
//console.log(isFullAge);

//Multiple Assignments
var x, y;
x = y = (3 + 5) * 4 - 6;
//console.log(x,y);
// need to keep in mind the precendence and associativity
// x = x * 2 is the same as (double)
x *= 2;
//console.log(x);

/**** CODING CHALLENGE 1 ****/

var johnMass, johnHeight, markMass, markHeight;
johnMass = 70;
johnHeight = 1.7;
markMass = 75;
markMass = 1.82;
var johnBMI = johnMass / (johnHeight * johnHeight);
var markBMI = markMass / (markHeight * markHeight);
var isMarkBMIMore = johnBMI < markBMI;
console.log("Is Mark's BMI more than John's? "+ isMarkBMIMore);

/* IF-ELSE STATEMENTS */
var civilStatus = 'married';
var isMarried;
if (civilStatus === 'married'){
    console.log(firstName + ' is married');
    isMarried = true;
} else {
    console.log(firstName + ' is single');
}
if (isMarried){
    console.log(firstName + ' is married');
} else {
    console.log(firstName + ' is single');
}

/** CODING CHALLENGE 1 IMPROVED */
var johnMass, johnHeight, markMass, markHeight;
johnMass = 70;
johnHeight = 1.7;
markMass = 75;
markMass = 1.82;
var johnBMI = johnMass / (johnHeight * johnHeight);
var markBMI = markMass / (markHeight * markHeight);
var isMarkBMIMore = johnBMI < markBMI;

if (isMarkBMIMore){
    console.log("Mark's BMI is more");
} else if (!isMarkBMIMore){
    console.log("Johns's BMI is more");
}


/** THE TERNARY OPERATOR (conditional) AND SWITCH STATEMENTS */
// Writes if-else statement in one line
age >= 18 ? console.log(firstName + ' drinks beer') : console.log(firstName + ' drinks juice');

// assign values to variables using ternary operator.
var drink = age >= 18 ? 'beer' : 'juice';
console.log('drink is ' + drink);

// Switch statements
var job = 'developer';
switch (job){
    case 'teacher':
        console.log(firstName + ' teaches');
        break;
    case 'developer':
        console.log(firstName + ' codes');
        break;
    default:
        console.log(firstName + "'s job is unknown");
}

switch(true){
    case age > 18:
        console.log(firstName+ ' can drink beer');
        break;
    case age < 18:
        console.log(firstName+ ' can only drink juice');
        break;
}

/** Truthy and Falsy values and Equality operators */
/*
FALSY values: undefined, null, 0, '' (empty string), NaN (not a number). These are not actually false, but will result in false when evaluated in an if-else condition.
TRUTHY values: all values thata re not falsy - will result in true in a if-else condition.
*/
var height;
height = 23;
if (height || height === 0){
    console.log('Variable is defined');
} else {
    console.log('Variable is undefined');
}

//Equality Operators
if (height === 23){
    console.log('This is strict equality, which does not do type coersion.');
} else if (height == '23'){
    console.log('The == op does type coercion');
}

/** CODING CHALLENGE 2 */
var johnTeam = [89, 120, 103], mikeTeam = [116, 94, 123], maryTeam = [97, 134, 105];

var johnTotal = 0, mikeTotal = 0, maryTotal = 0;

for(var i =0; i < johnTeam.length; i++){
    johnTotal += johnTeam[i];
}
var johnAvg = johnTotal/johnTeam.length;

for(var j =0; j < mikeTeam.length; j++){
    mikeTotal += mikeTeam[j];
}
var mikeAvg = mikeTotal/mikeTeam.length;

for(var k =0; k < maryTeam.length; k++){
    maryTotal += maryTeam[k];
}
var maryAvg = maryTotal/maryTeam.length;
console.log("John's Team average is "+ johnAvg);
console.log("Mike's Team average is "+ mikeAvg);
console.log("Mary's Team average is "+ maryAvg);

switch(true){
    case johnAvg > mikeAvg:
        console.log("John's team wins");
        break;
    case johnAvg < mikeAvg:
        console.log("Mike's team wins");
        break;
    case johnAvg == mikeAvg:
        console.log("Both teams drew");
}

switch(true){
    case johnAvg > (mikeAvg && maryAvg):
        console.log("John's team wins");
        break;
    case mikeAvg > (johnAvg && maryAvg):
        console.log("Mike's team wins");
        break;
    case maryAvg > (johnAvg && mikeAvg):
        console.log("Mary's team wins");
        break;
    case johnAvg == (mikeAvg && maryAvg):
        console.log("All teams drew");
}


/**** FUNCTIONS ****/
function calculateAge(birthYear){
    return 2020 - birthYear;
}
var ageJohn = calculateAge(1990);
console.log(ageJohn);

/** FUNCTION STATEMENTS AND EXPRESSIONS */

//Function Declaration
function _whatDoYouDo(job, firstName) {}

//Function Expression
var whatDoYouDo = function(job, firstName){
    switch(job){
        case 'teacher':
            return firstName + ' teaches kids';
        case 'driver':
            return firstName + ' drives cars';
        case 'developer':
            return firstName + ' codes';
        default:
            return firstName + ' does something else';
    }
}

console.log(whatDoYouDo('codes','Jema'));

/**** ARRAYS ****/
//Zero indexed [0,1,2,...]
var names = ['John', 'Mark', 'Jane']; //most popular
var years = new Array(1998, 1999, 2002); //Another method but less commonly used
console.log(names[0]);
console.log(names.length); //no of elements in array
// Can also use this syntax to mutate the data in the array
names[1] = 'Ben';
console.log(names[1]);
names[5] = 'Mary';
console.log(names); //2 empty elements in the array
names[names.length] = 'new';
console.log(names); //add to end of the array

//Arrays can hold different data types within the same structure
var john = ['Nathan', 'Smith', 1990, 'teacher', false];

john.push('blue');
console.log(john);
//'push' adds an element to the end of the array

john.unshift('Mr');
console.log(john);
//'unshift' adds to the beginning of the array

john.pop()
console.log(john);
//'pop' removes elements from the end of the array

john.shift();
console.log(john);
//'shift' removes the first element of the array

var pos = john.indexOf(1990);
console.log(pos);
//'indexOf' return the postion of the argument that we want in the array
//returns -1 if the argument is not present in the array

//Using ternary operator
var isDesigner = john.indexOf('designer') === -1 ? 'John is NOT a designer.' : 'John is a designer';
console.log(isDesigner);
john[3] = 'designer';
var isDesigner = john.indexOf('designer') === -1 ? 'John is NOT a designer.' : 'John is a designer';
console.log(isDesigner);
//John is now a designer so it returns the index

/**** CODING CHALLENGE 3 *****/
var bills = [124, 48, 268];
var tips = [];
var finalBills = [];
var calculateTip = function(billAmount){
    switch(true){
        case billAmount < 50:
            return 0.2;
        case (50 < billAmount) &&  (billAmount < 200):
            return 0.15;
        case billAmount > 200:
            return 0.1;
        default:
            return 0.2;
    }
}
for (i = 0; i < bills.length; i++){
    tipsPer = calculateTip(bills[i]);
    tips[i] = bills[i] * tipsPer;
    finalBills[i] = bills[i] + tips[i];
}

console.log(tips);
console.log(finalBills);

/**** OBJECTS & PROPERTIES ****/
//object literal
var johnO = {
    firstName: 'John',   //firstName is a property of the johnO object
    lastName: 'Smith',
    birthYear: 1990,
    family: ['Jane', 'Mark', 'Bob', 'Emily'],
    job: 'teacher',
    isMarried: false
};

console.log(johnO);
console.log(johnO.firstName);
console.log(johnO['lastName']);
var x = 'birthYear';
console.log(johnO[x]);

johnO.job = 'driver';
console.log(johnO.job);

//object syntax
var jane = new Object();
jane.firstName = 'Jane';
jane.birthYear = 1992;
jane['lastName'] = 'Smith';
console.log(jane);

/**** Objects and methods ****/
//Add a method to johnObject to calculate the age of John

var johnObject = {
    firstName: 'John',   //firstName is a property of the johnO object
    lastName: 'Smith',
    birthYear: 1990,
    family: ['Jane', 'Mark', 'Bob', 'Emily'],
    job: 'teacher',
    isMarried: false,
    calcAge: function(){
        this.age = 2020 - this.birthYear;
    }
    //This is a function expression where we have the function without the name, just the argument which we assign to a variable which is in this case calcAge
};
johnObject.calcAge();
console.log(johnObject);

/**** CODING CHALLENGE 4 ****/
var jO = {
    name: 'john',
    mass: 92,
    height: 1.95,
    calcBMI: function(){
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

var mO = {
    name: 'mark',
    mass: 78,
    height: 1.62,
    calcBMI: function(){
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

jO.calcBMI();
mO.calcBMI();
console.log(jO, mO);