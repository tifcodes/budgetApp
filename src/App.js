import React, { Component } from 'react';
import "./styles/style.scss"

import Header from "./Header"
import Form from "./Form"
import dbRef from './firebase'
import Column from './Column'
import Result from './Result'
import Footer from './Footer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      transList: [],
      incomeAmountArray: [],
      expenseAmountArray: [],
      incomeArray: [],
      expenseArray: [],
      expenseCat: []
    }
  }

  // listening to firebase
  componentDidMount() {
    dbRef.on("value", (snapshot) => {
      const trans = snapshot.val();

      const newTrans = [];
      const newIncomeArray = [];
      const newExpenseArray = [];
      const newIncomeAmountArray = [];
      const newExpenseAmountArray = [];
      const newExpenseCat = [];

      for (let i in trans) {
        const singleTrans = {
          transKey: i,
          transObject: trans[i],
        }
        newTrans.push(singleTrans)

        if (singleTrans.transObject.type === "Income") {
          newIncomeArray.push(singleTrans.transObject)
          newIncomeAmountArray.push(singleTrans.transObject.amount)
        }

        if (singleTrans.transObject.type === "Expense") {
          newExpenseArray.push(singleTrans.transObject)
          newExpenseAmountArray.push(singleTrans.transObject.amount)
          newExpenseCat.push(singleTrans.transObject.categories)
        }
      }

      this.setState({
        transList: newTrans,
        incomeArray: newIncomeArray,
        expenseArray: newExpenseArray,
        incomeAmountArray:
        newIncomeAmountArray,
        expenseAmountArray:
        newExpenseAmountArray,
        expenseCat:
        newExpenseCat,
      })
    })
  }

  render() {
    const {incomeArray, expenseArray, transList, incomeAmountArray,
    expenseAmountArray, expenseCat} = this.state
    return (
      <div className="wrapper">
        <Header />
        {/* dropdown menu */}
        <main>
          <div className = "inputResult">
            {/* form */}
            <Form />
            {/* column */}
            <Column 
            transList=
            {transList}
            incomeArray={incomeArray} 
            expenseArray={expenseArray}
            incomeAmountArray = {incomeAmountArray}
            expenseAmountArray={expenseAmountArray}
            expenseCat={expenseCat} />
          </div>
          <Result
            incomeArray={incomeArray}
            expenseArray={expenseArray}
            transList={transList}
            incomeAmountArray={incomeAmountArray}
            expenseAmountArray={expenseAmountArray}
            expenseCat={expenseCat} />
        </main>
        <Footer />
      </div>
    )
  }
}

export default App;
