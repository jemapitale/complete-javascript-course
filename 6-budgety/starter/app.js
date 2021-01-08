/**
 * BUDGET CONTROLLER
 * - keeps track of budget, income, expense and percentages
 *
 *
 *
 *  */
var budgetController = (function () {
  // Function contructor (private)
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Function contructor (private)
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    //initial value
    var sum = 0;

    // forearch loop accepts a callback function
    data.allItems[type].forEach(function (currentElement) {
      sum += currentElement.value;
    });
    data.totals[type] = sum;
  };

  // Data storage for all items
  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1, // initialliy set to -1 b/c it is a value when something is non-existent
  };

  /**
   * BUDGET CONTROLLER PUBLIC FUNCTIONS
   */

  return {
    addItem: function ({ type, description, value }) {
      //setter
      var newItem, ID, typeArrayLength;

      if (data.allItems[type].length > 0) {
        // Get length of array
        typeArrayLength = data.allItems[type].length - 1;
        // ID = last id + 1
        ID = data.allItems[type][typeArrayLength].id + 1;
      } else {
        ID = 0;
      }
      //Create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, description, value);
      } else if (type === 'inc') {
        newItem = new Income(ID, description, value);
      }

      // Push it to our data structure
      data.allItems[type].push(newItem);

      return newItem;
    },

    calculateBudget: function () {
      //setter
      // Calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // Calculate the budget.

      data.budget = data.totals.inc - data.totals.exp;

      // Calculate percentage of income spent.
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },

    testing: function () {
      console.log(data);
    },
  };
})();

/**
 * UI CONTROLLER
 *
 *
 *
 *
 *  */
var UIController = (function () {
  var DOMstrings = {
    inputType: '.add__type',
    description: '.add__description',
    changeValueBy: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
  };

  /**
   * UI CONTROLLER PUBLIC FUNCTIONS
   */
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.description).value,
        value: parseFloat(
          document.querySelector(DOMstrings.changeValueBy).value
        ),
      };
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;

      // Create HTML strIng with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;

        html =
          '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description% </div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;

        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description% </div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //Replace the placeholder text with actual data
      newHtml = html.replace('%id', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value', obj.value);

      // Insert the HTML into the DOM using the "expenses__list" class and "income__list"
      // -  uses insertAdjacentHTML(position, text)
      // -  using beforeend because we want to add it to the end of the list.
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function () {
      var fields, fieldsArr;
      //select all and returns a list
      fields = document.querySelectorAll(
        DOMstrings.description + ', ' + DOMstrings.changeValueBy
      );

      // need to convert list to array so that we can use the array methods (using slice to do this)
      fieldsArr = Array.prototype.slice.call(fields);

      //anonymous function
      fieldsArr.forEach(function (currentEl, index, array) {
        currentEl.value = '';
      });

      fieldsArr[0].focus();
    },

    getDOMStrings: function () {
      // Exposes DOMstrings object to make it public
      return DOMstrings;
    },
  };
})();

/**  GLOBAL APP CONTROLLER
 *
 *
 *
 *
 *  */
var controller = (function (budgetCtrl, UICtrl) {
  var setUpEventListeners = function () {
    var DOM = UICtrl.getDOMStrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (keyPressEvent) {
      if (keyPressEvent.keyCode === 13 || keyPressEvent.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var updateBudget = function () {
    var budget;
    // 1. Calculate the budget.
    budgetCtrl.calculateBudget();

    // 2. Return the budget.
    budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI.
    console.log(budget);
  };

  var ctrlAddItem = () => {
    var input, newItem;
    // 1. Get the field input data.
    input = UICtrl.getInput();

    // Check that something was entered.
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller.
      newItem = budgetCtrl.addItem(input);

      // 3. Add the item to the UI.
      UICtrl.addListItem(newItem, input.type);

      // 4. Clear the fields
      UICtrl.clearFields();

      // 5. Calculate and update the budget.
      updateBudget();
    }
  };

  /**
   * GLOBAL APP CONTROLLER PUBLIC FUNCTIONS
   */

  return {
    init: function () {
      setUpEventListeners();
    },
  };
})(budgetController, UIController);

controller.init();
