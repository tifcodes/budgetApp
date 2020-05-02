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
      transList: [],
      incomeArray: [],
      expenseArray: [],
      description: "",
      amount: "",
      type: "select",
    }
  }

  // listening to firebase
  componentDidMount() {
    dbRef.on("value", (snapshot) => {
      const trans = snapshot.val();

      const newTrans = [];
      const newIncomeArray = [];
      const newExpenseArray = [];

      for (let i in trans) {
        const singleTrans = {
          transKey: i,
          transObject: trans[i],
        }
        newTrans.push(singleTrans)

        if (singleTrans.transObject.type === "income") {
          newIncomeArray.push(singleTrans.transObject.amount)
        }

        if (singleTrans.transObject.type === "expense") {
          newExpenseArray.push(singleTrans.transObject.amount)
        }
      }

      this.setState({
        transList: newTrans,
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
  handleDescription = (event) => {
    this.setState({
      description: event.target.value,
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

    const transToBeAdded = {
      description: this.state.description,
      amount: this.state.amount,
      type: this.state.type
    }

    if (transToBeAdded.description !== "" && transToBeAdded.amount !== "" && transToBeAdded.type !== "") {
      dbRef.push(transToBeAdded)
      this.setState({
        description: "",
        amount: "",
      })
    }
  }

  handleReset = () => {
    this.setState({
      description: "",
      amount: "",
      type: ""
    })
  }

  render() {
    const { description, amount } = this.state
    const isEnabled = description.length > 0 && amount.length > 0
    return (
      <div className="wrapper">
        <Header />
        {/* dropdown menu */}
        <main>
          <select 
          onChange={this.handleChangeType} value={this.state.type}>
            <option value="" > select </option>
            <option value="income"> income </option>
            <option value="expense"> expense </option>
          </select>
          {/* form */}
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="transType" className="visuallyHidden"></label>
            <input id="transType" type="text" placeholder="description" 
            value={this.state.description} onChange={this.handleDescription} />
            <label htmlFor="transAmount" className="visuallyHidden"></label>
            <input id="transAmount" type="number" placeholder="amount" min="0" step=".01" 
            value={this.state.amount} 
            onChange={this.handleAmountChange} />
            <button disabled={!isEnabled} type="submit"> Add Transaction to List</button>
            <button type="button" onClick={this.handleReset} > Reset </button>
          </form>
          {/* column */}
          <ShowColumn 
          incomeArray={this.state.incomeArray} expenseArray={this.state.expenseArray}
          listTrans={this.state.transList} />
        </main>
        <Footer />
      </div>
    )
  }
}

export default App;
