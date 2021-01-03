/*
// Using object literal
var johnL = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

// Function constructor
var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    // this.calculateAge = function() {
    //     console.log(2020 - this.yearOfBirth);
    // }
};

Person.prototype.calculateAge = function() {
    console.log(2020 - this.yearOfBirth);
};
Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');
john.calculateAge();
var jane = new Person('Jane', 1969, 'designer');
jane.calculateAge();
var mark = new Person('Mark', 1948, 'retired');
mark.calculateAge();

*/

/*
// Object.create

var personProto = {
    calculateAge: function() {
        console.log(2020 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
    name: {value : 'Jane'},
    yearOfBirth: {value: 1998},
    job: {value: 'developer'}
});
*/

/*
// Primitives vs Objects

// Primitives
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);

//Objects
var obj1 = {
    name: 'John',
    age: 26
};

var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

// Functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a,b) {
    a = 30;
    b.city = 'San Fran';
}

change(age, obj);
console.log(age);
console.log(obj);
*/

/*
// Passing functions as arguments
var years = [1990, 1965, 1937, 2005, 1998];
function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}
function calcAge(el) {
    return 2020 - el;
}
function isFullAge(el){
    return el >= 18;
}
function maxHeartRate(el){
    if (el >= 18 && el <= 81){
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
}
var ages = arrayCalc(years, calcAge);
console.log(ages);
var fullAges = arrayCalc(ages, isFullAge);
console.log(fullAges);
var rates = arrayCalc(ages, maxHeartRate);
console.log(rates);
*/
/*
// Functions returning functions
function interviewQuestion(job){
    if (job === 'designer'){
        return function(name){
            console.log(name + ', can you please explain what UX design is?');
        }
        // This is an anonymous function because it doesn't have a name.
    } else if (job === 'teacher'){
        return function (name){
            console.log('What subject do you teach, '+ name);
        }
    } else{
        return function(name){
            console.log('What do you do?')
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');
var designerQuestion = interviewQuestion('designer');
designerQuestion('Mary');

interviewQuestion('teacher')('Jamie');
*/

/*
//IIFE - Immediately invoked function expressions

function game(){
    var score = Math.random *10;
    console.log(score >= 5);
}
game();

(function (){
    var score = Math.random *10;
    console.log(score >= 5);
})();

(function () {

})();

(function (goodLuck){
    var score = Math.random *10;
    console.log(score >= 5 - goodLuck);
})(4);
*/
/*
// CLOSURES

function retirement(retirementAge) {
    var a =  ' years left until retirement.';
    return function(yearOfBirth) {
        var age = 2020 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var USretire = retirement(66);
USretire(1990);
retirement(66)(1990);

var GermanyReture = retirement(65);
var IcelandRetirement = retirement(67);
GermanyReture(1990);
IcelandRetirement(1990);

function interviewQuestion(job){
    return function(name){
        if (job === 'designer'){
            console.log(name + ', can you please explain what UX design is?');

        } else if (job === 'teacher'){
            console.log('What subject do you teach, '+ name + '?');
        } else{
            console.log('What do you do?')
        }
    }
}

interviewQuestion('teacher')('John');
*/


/*
// Bind, Call and Apply
var john = {
    name:'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay){
        if (style === 'formal'){
            console.log('Good '+ timeOfDay + ', Ladies. I\'m ' + this.name + ', I\'m a '+ this.job + ' and I\'m '+ this.age + ' years old.');
        } else if (style === 'friendly'){
            console.log('Yo!' + ', Ladies. I\'m ' + this.name + ', I\'m a '+ this.job + ' and I\'m '+ this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
}
john.presentation('formal', 'morning');
var emily = {
    name: 'Emily',
    age: 30,
    job: 'designer'
}
john.presentation.call(emily, 'friendly', 'afternoon');

//john.presentation.apply(emily, ['friendly', 'afternoon']);

var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('evening');

// Passing a callback function
var years = [1990, 1965, 1937, 2005, 1998];
function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}
function calcAge(el) {
    return 2020 - el;
}
function isFullAge(limit, el){
    return el >= limit;
}
var ages = arrayCalc(years, calcAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(fullJapan);
console.log(ages);
*/
/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/
/*
(function() {
    // 1.
    function Question(question, answers, correctAnswer){
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    // 4.2
    Question.prototype.displayQuestion = function(){
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++){
            console.log(i + ' ' + this.answers[i]);
        }
    }

    // 5.2
    Question.prototype.checkAnswer = function(userAns){
        console.log(userAns)
        if (userAns == this.correctAnswer){
            
            console.log('Correct Answer');
        } else {
            console.log('Wrong answer.')
        }
    }

    // 2.
    var q1 = new Question('Is JS good to learn?', ['yes','no'],0);
    var q2 = new Question('Are you vegan?', ['yes', 'no'], 0);
    var q3 = new Question('Do you enjoy programming?', ['yes','no','sometimes'], 0);

    // 3.
    var allQuestions = [q1, q2, q3];

    // 4.1
    var chosenQ = Math.floor(Math.random() * allQuestions.length);
    // 4.3
    allQuestions[chosenQ].displayQuestion();

    // 5.1
    var userAnswer = parseInt(prompt('Please answer.'));
    // 5.3
    allQuestions[chosenQ].checkAnswer(userAnswer);

})();
*/
/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

(function() {
    // 1.
    function Question(question, answers, correctAnswer){
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    // 4.2
    Question.prototype.displayQuestion = function(){
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++){
            console.log(i + ' ' + this.answers[i]);
        }
    }

    // 5.2
    Question.prototype.checkAnswer = function(userAns, callbackScore){
        var sc;
        console.log(userAns)
        if (userAns == this.correctAnswer){
            console.log('Correct Answer');
            // 11.
            sc = callbackScore(true);
        } else {
            console.log('Wrong answer.')
            sc = callbackScore(false);
        }
        this.displayScore(sc);

    }

    // 11. 
    Question.prototype.displayScore = function(score){
        console.log('Current score is '+ score);
        console.log('---------------------------');
    }
    // 2.
    var q1 = new Question('Is JS good to learn?', ['yes','no'],0);
    var q2 = new Question('Are you vegan?', ['yes', 'no'], 0);
    var q3 = new Question('Do you enjoy programming?', ['yes','no','sometimes'], 0);

    // 10.
    function calcScore(){
        var score = 0;
        return function(correct){
            if (correct){
                score++;
            }
            return score;
        }
    }

    var keepScore = calcScore();

    // 8.1
    function nextQuestion(){
        // 3.
        var allQuestions = [q1, q2, q3];

        // 4.1
        var chosenQ = Math.floor(Math.random() * allQuestions.length);
        // 4.3
        allQuestions[chosenQ].displayQuestion();

        // 5.1
        var userAnswer = prompt('Please answer.');
        
        // 9.
        if (userAnswer !== 'exit'){
            // 5.3
            allQuestions[chosenQ].checkAnswer(parseInt(userAnswer), keepScore);
            nextQuestion();
        }
    }

    nextQuestion();

})();
