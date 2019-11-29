import React, { Component } from 'react';
import "./styles/style.scss"

import Header from "./Header"
import dbRef from './firebase'

class App extends Component {
  constructor() {
    super();
    this.state = {
      transactionList: [],
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
      for (let i in transaction) {
        const individualTransactions = {
          transactionKey: i,
          transactionObject: transaction[i],

        }
        newTransaction.push(individualTransactions)
      }

      this.setState({
        transactionList: newTransaction
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
      amount: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const transactionToBeAdded = {
      userInput: this.state.userInput,
      amount: this.state.amount,
      type: this.state.type
    }

    if (transactionToBeAdded !== "") {
      dbRef.push(transactionToBeAdded)
      this.setState({
        userInput: "",
        amount: "",
        type: ""
      })
    }
  }

  handleDelete = (event) => {
    dbRef.child(event.target.id).remove();
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <select onChange={this.handleChangeType} value={this.state.value}>
          <option value="select"> select </option>
          <option value="income"> income </option>
          <option value="expenses"> expenses</option>
        </select>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="transactionType"></label>
          <input id="transactionType" type="text" value={this.state.userInput} onChange={this.handleUserInputChange} />
          <label htmlFor="transactionAmount"></label>
          <input id="transactionAmount" type="number" value={this.state.amount} onChange={this.handleAmountChange} />
          <button type="submit"> Add Transaction to List</button>
        </form>
        <div className="flexParent">
          <div>
            <h2> Income </h2>
            <ul>
              {this.state.transactionList.map((transaction, i) => {
                const isType = transaction.transactionObject.type === "income"
                return (
                  (isType) ?

                    <li key={i}> <i className="fa fa-minus-circle" id={transaction.transactionKey} onClick={this.handleDelete}> </i>{transaction.transactionObject.userInput
                    } {transaction.transactionObject.amount} </li>

                    : null
                )
              })}
            </ul>
            <h4> Total : {this.state.amount} </h4>
          </div>
          <div>
            <h2> Expenses </h2>
            <ul>
              {this.state.transactionList.map((transaction, i) => {
                const isType = transaction.transactionObject.type === "expenses"
                return (
                  (isType) ?

                    <li key={i}> <i className="fa fa-minus-circle" id={transaction.transactionKey} onClick={this.handleDelete}></i>  {transaction.transactionObject.userInput
                    } {transaction.transactionObject.amount} </li>

                    : null
                )
              })}
            </ul>
            <h4> Total : {this.state.amount} </h4>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
