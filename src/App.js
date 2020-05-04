import React, { Component } from 'react';
import "./styles/style.scss"

import Header from "./Header"
import Form from "./Form"
import dbRef from './firebase'
import ShowColumn from './Column'
import Footer from './Footer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      transList: [],
      incomeArray: [],
      expenseArray: [],
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

  render() {
    const {incomeArray, expenseArray, transList} = this.state
    return (
      <div className="wrapper">
        <Header />
        {/* dropdown menu */}
        <main>
          {/* form */}
          <Form />
          {/* column */}
          <ShowColumn 
          incomeArray={incomeArray} 
          expenseArray={expenseArray}
          transList=
          {transList} />
        </main>
        <Footer />
      </div>
    )
  }
}

export default App;
