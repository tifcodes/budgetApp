//budget app
// dropdown menu with options of income and expense
// list all the input that user types
// shows the balance w/ every single input 
// can delete transactions
// if empty don't add

// stretch goal
// can edit transactions
// categorize let's say budget for rent is $1000 and you paid $800 left $200
// if debit of around $5000, maybe alert user to not buy anymore
// if the balance is close to 0, and the user buys $200 maybe say should not buy any more shoes

// pseudocode

// create a module with firebase in it and export dbRef

// create constructor 
// userName = ""
// selectedInput for income and expenses
// that will hold the an array of objects of type text and numbers
// and a userInput of empty string

// componentDidMount()
// dbRef will be on so every time the user inputs things it will store on the database
// log all the value into a const
// create a empty array and for in loop to loop through all the inputs the users put in
// push the newInput into the array
// change the setState of the empty array with the new array

// create a function/method that will prompt the user its name and show it on the page and change state of the userName

// create an function/method with onchange so it will listen to everytime the user inputs things on the form input box
// change the set state to the target value

// create a function/method on submit so that it get added to the database and change the input to empty once it is done
// check when the text input is empty, if empty don't add to set state

// create a function that will listen to what the user chose(income/expenses) on the dropdown menu using onChange

// create a function/method that will delete that transactions when the user does click delete

// create a function/method that will calculate the income and expenses based on all the data that user inputs

// render

// prompt the user of their name so that it will be personalized
// create a form and store the inputs to the a database
// the input would be text and numbers and a submit button 
// create a dropdown for income and expenses
// add the component here

// COMPONENT
// one div will hold all the income and the other will hold all the expenses (I will try to make it only one component and pass on different props)
// show the input and amount
// and the balance