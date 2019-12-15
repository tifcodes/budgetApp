import React, { Component } from 'react';
import "./styles/style.scss"

import Header from "./Header"
import firebase from './firebase'
import ShowColumn from './Column'
import Footer from './Footer'

const dbRef = firebase.database().ref();

class App extends Component {
  constructor() {
    super();
    this.state = {
      transactionList: [],
      incomeArray: [],
      expenseArray: [],
      userInput: "",
      amount: "",
      type: "select",
    }
  }

  // listening to firebase
  componentDidMount() {
    dbRef.on("value", (snapshot) => {
      const transaction = snapshot.val();

      const newTransaction = [];
      const newIncomeArray = [];
      const newExpenseArray = [];

      for (let i in transaction) {
        const individualTransactions = {
          transactionKey: i,
          transactionObject: transaction[i],
        }
        newTransaction.push(individualTransactions)

        if (individualTransactions.transactionObject.type === "income") {
          newIncomeArray.push(individualTransactions.transactionObject.amount)
        }

        if (individualTransactions.transactionObject.type === "expense") {
          newExpenseArray.push(individualTransactions.transactionObject.amount)
        }
      }

      this.setState({
        transactionList: newTransaction,
        incomeArray: newIncomeArray,
        expenseArray: newExpenseArray,
      })
    })
  }

  // changing the income and expense drop down
  handleChangeType = (event) => {
    this.setState({
      type: event.target.value
    })
  }

  // listening to changes in the description
  handleUserInputChange = (event) => {
    this.setState({
      userInput: event.target.value,
    })
  }

  // listening to changes in the amount
  handleAmountChange = (event) => {
    this.setState({
      amount: event.target.value,
    })
  }

  // submit 
  handleSubmit = (event) => {
    event.preventDefault();

    const transactionToBeAdded = {
      userInput: this.state.userInput,
      amount: this.state.amount,
      type: this.state.type
    }

    if (transactionToBeAdded.userInput !== "" && transactionToBeAdded.amount !== "" && transactionToBeAdded.type !== "") {
      dbRef.push(transactionToBeAdded)
      this.setState({
        userInput: "",
        amount: "",
      })
    }
  }

  handleReset = (event) => {
    this.setState({
      userInput: "",
      amount: "",
      type: ""
    })
  }

  render() {
    const { userInput, amount } = this.state
    const isEnabled = userInput.length > 0 && amount.length > 0
    return (
      <div className="wrapper">
        <Header />
        {/* dropdown menu */}
        <main>
          <select onChange={this.handleChangeType} value={this.state.type}>
            <option value="" > select </option>
            <option value="income"> income </option>
            <option value="expense"> expense </option>
          </select>
          {/* form */}
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="transactionType" className="visuallyHidden"></label>
            <input id="transactionType" type="text" placeholder="description" value={this.state.userInput} onChange={this.handleUserInputChange} />
            <label htmlFor="transactionAmount" className="visuallyHidden"></label>
            <input id="transactionAmount" type="number" placeholder="amount" min="0" step=".01" value={this.state.amount} onChange={this.handleAmountChange} />
            <button disabled={!isEnabled} type="submit"> Add Transaction to List</button>
            <button type="button" onClick={this.handleReset} > Reset </button>
          </form>
          {/* column */}
          <ShowColumn arrayIncome={this.state.incomeArray} arrayExpense={this.state.expenseArray} listTransaction={this.state.transactionList} delete={this.state.handleDelete} />
        </main>
        <Footer />
      </div>
    )
  }
}

export default App;
