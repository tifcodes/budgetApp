import React, { Component } from 'react';
import "./styles/style.scss"

import Header from "./Header"
import dbRef from './firebase'
import Column from './Column'

class App extends Component {
  constructor() {
    super();
    this.state = {
      transactionList: [],
      incomeArray: [],
      expenseArray: [],
      userInput: "",
      amount: "",
      type: "",
      selectedValue: "",
    }
  }

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

  handleChangeType = (event) => {
    this.setState({
      type: event.target.value
    })
  }

  handleUserInputChange = (event) => {
    this.setState({
      userInput: event.target.value,
    })
  }

  handleAmountChange = (event) => {
    this.setState({
      amount: event.target.value,
    })
  }

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

    if (transactionToBeAdded.type === "") {
      alert("missing type")
    }

    if (transactionToBeAdded.userInput === "") {
      alert("missing description")
    }

    if (transactionToBeAdded.amount === "") {
      alert("missing amount")
    }
  }

  // handleDelete = (event) => {
  //   dbRef.child(event.target.id).remove();
  // }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <select onChange={this.handleChangeType} value={this.state.value}>
          <option value=""> select </option>
          <option value="income"> income </option>
          <option value="expense"> expense </option>
        </select>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="transactionType" className="visuallyHidden"></label>
          <input id="transactionType" type="text" placeholder="description" value={this.state.userInput} onChange={this.handleUserInputChange} />
          <label htmlFor="transactionAmount" className="visuallyHidden"></label>
          <input id="transactionAmount" type="number" placeholder="amount" min = "0" step = ".01" value={this.state.amount} onChange={this.handleAmountChange} />
          <button type="submit"> Add Transaction to List</button>
        </form>
        <Column arrayIncome={this.state.incomeArray} arrayExpense={this.state.expenseArray} listTransaction={this.state.transactionList} delete={this.state.handleDelete}/>
      </div>
    )
  }
}

export default App;
