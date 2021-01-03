// BUDGET CONTROLLER
var budgetController = (function() {

 
})();

// UI CONTROLLER
var UIController = (function(){

    return{
        getInput: function(){
            return{
             type = document.querySelector('.add__type').value,
             description = document.querySelector('.add__description').value,
             changeValueBy = document.querySelector('.add__value').value
            }
        }
    }


})();


// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

    var ctrlAddItem = () => {
    // 1. Get the field input data.
    var input = UICtrl.getInput();
    console.log(input);
    
    // 2. Add the item to the budget controller.

    // 3. Add the tiem to the UI.

    // 4. Calculate the budget.

    // 5. Display the budget on the UI.
    }

    document.querySelector('.add__btn').addEventListener('click', function() {
        console.log('button has been clicked.')
    });

    document.addEventListener('keypress', function(keyPressEvent){
        if (keyPressEvent.keyCode === 13 || keyPressEvent.which === 13){
            console.log('enter key was pressed.')
        }
    })

    

})(budgetController, UIController);



