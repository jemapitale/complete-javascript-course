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
    this.percentage = -1;
  };

  // Different prototype function which have specific tasks
  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
      console.log(this.value);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    console.log(this.percentage);
    return this.percentage;
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

    deleteItem: function (type, id) {
      var foundId, index;
      //map receives a callback function which also have access to the current element, current index, and entire array
      foundId = data.allItems[type].map((current) => {
        return current.id;
      });

      index = foundId.indexOf(id);

      // only want to remove if the index exists
      if (index !== -1) {
        //splice is used to remove elements, whilst the spice method is used to create a copy
        // 1st argument if splice is the position to start deleting, and the 2nd argument is the no of elements to delete
        data.allItems[type].splice(index, 1);
      }
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

    calculatePercentages: () => {
      /// on each expense objectw
      data.allItems.exp.forEach((current) => {
        current.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: () => {
      //store all of the expense percentages in an array
      var allPercentages = data.allItems.exp.map((current) => {
        console.log(current.getPercentage());
        return current.getPercentage();
      });
      console.log(allPercentages);
      return allPercentages;
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
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month',
  };

  /**
   * UI CONTROLLER PUBLIC FUNCTIONS
   */

  var formatNumber = (num, type) => {
    var int, numSplit, dec;
    // calculate absolute value of num - removed sign of number
    num = Math.abs(num);

    // sort out decimal numbers - toFixed() is a method of the number prototype
    num = num.toFixed(2);

    // Need to split the number into decimal and integer part.
    numSplit = num.split('.');

    int = numSplit[0];

    // Add comma to integar part if it is in 1000's
    if (int.length > 3) {
      // Substring(number where we want to start from, how many characters we want)
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }

    dec = numSplit[1];

    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
  };
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
      newHtml = newHtml.replace('%value%', formatNumber(obj.value));

      // Insert the HTML into the DOM using the "expenses__list" class and "income__list"
      // -  uses insertAdjacentHTML(position, text)
      // -  using beforeend because we want to add it to the end of the list.
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function (selectorID) {
      var el, parentEl;
      //Need to move up to the parent in the DOM in order to removeChild.
      el = document.getElementById(selectorID);
      parentEl = el.parentNode;
      parentEl.removeChild(el);
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

    displayBudget: function (obj) {
      var type;
      // Need to format the numbers shown as text for budget but
      // don't know if positive or negative
      obj.budget > 0 ? (type = 'inc') : (type = 'exp');
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        'inc'
      );
      document.querySelector(
        DOMstrings.expensesLabel
      ).textContent = formatNumber(obj.totalExp, 'exp');
      document.querySelector(DOMstrings.percentageLabel).textContent =
        obj.percentage;

      // only want to display percentage if it is not equal to -1 or 0.
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },

    dispayPercentages: function (percentagesArray) {
      // returns a a node list,
      // Need to loop over all of the elements (nodes) in the selection,
      // then change the text content property for all of them.
      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      var nodeListForEach = (list, callback) => {
        // a for loop - in each iteration calls the callback function
        // list des have the length() method
        for (var i = 0; i < list.length; i++) {
          // parameters for the callback function are the current and index.
          // current = list at position i,
          // index = i
          callback(list[i], i);
        }
      };

      nodeListForEach(fields, (current, index) => {
        if (percentagesArray[index] > 0) {
          current.textContent = percentagesArray[index] + '%';
        } else {
          current.textContent = '---';
        }
      });
    },

    displayMonth: function () {
      var now, year, month, months;

      now = new Date();
      months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      month = now.getMonth();
      year = now.getFullYear();
      document.querySelector(DOMstrings.dateLabel).textContent =
        months[month] + ' ' + year;
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

    // The callback function of the addEventListener method always has access to this event object.
    document.addEventListener('keypress', function (keyPressEvent) {
      if (keyPressEvent.keyCode === 13 || keyPressEvent.which === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOM.container)
      .addEventListener('click', ctrlDeleteItem);
  };

  var updateBudget = function () {
    var budget;
    // 1. Calculate the budget.
    budgetCtrl.calculateBudget();

    // 2. Return the budget.
    budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI.
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = () => {
    // 1. Calculate percentages
    budgetCtrl.calculatePercentages();

    // 2. Read from budget controller
    var percentages = budgetCtrl.getPercentages();

    // 3. Update UI with new percentages
    UICtrl.dispayPercentages(percentages);
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

      // 6. Calculate and update percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = (event) => {
    var itemID, splitID, type, ID;
    // event is used as a paramenter of this function because we want to know what the target element of the event is.
    // look at the target property of the event
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      // inc-1
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. deete the item from the datas structure
      budgetCtrl.deleteItem(type, ID);

      // 2. Delete the item from the UI
      UICtrl.deleteListItem(itemID);

      // 3. Update and show the new budget
      updateBudget();

      // 4. Calculate and update percentages
      updatePercentages();
    }
  };

  /**
   * GLOBAL APP CONTROLLER PUBLIC FUNCTIONS
   */

  return {
    init: function () {
      setUpEventListeners();
      //Reset display values to 0
      const emptyBudgetObj = {
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      };
      UICtrl.displayBudget(emptyBudgetObj);
      UICtrl.displayMonth();
    },
  };
})(budgetController, UIController);

controller.init();
