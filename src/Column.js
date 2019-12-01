import React, { Component } from "react";
import dbRef from './firebase'

class Column extends Component {
  handleDelete = (event) => {
    dbRef.child(event.target.id).remove();
  }

  render() {
    const finalIncomeTotal = this.props.arrayIncome.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    const finalExpenseTotal = this.props.arrayExpense.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    const finalTotal = finalIncomeTotal - finalExpenseTotal;
    return (
      <div>
        <div className="flexParent">
          <div>
            <h2> Income </h2>
            <ul>
              {this.props.listTransaction.map((transaction, i) => {
                const isType = transaction.transactionObject.type === "income"
                return (
                  (isType) ?

                    <li key={i}> <i className="fa fa-minus-circle" aria-hidden="true" id={transaction.transactionKey} onClick={this.handleDelete}> </i>{transaction.transactionObject.userInput
                    } : {transaction.transactionObject.amount} </li>

                    : null
                )
              })}
            </ul>
            <h4 className="colorPop"> Total : {finalIncomeTotal.toFixed(2)} </h4>
          </div>
          <div>
            <h2> Expenses </h2>
            <ul>
              {this.props.listTransaction.map((transaction, i) => {
                const isType = transaction.transactionObject.type === "expense"
                return (
                  (isType) ?

                    <li key={i}> <i className="fa fa-minus-circle" aria-hidden="true" id={transaction.transactionKey} onClick={this.handleDelete}></i>  {transaction.transactionObject.userInput
                    } : {transaction.transactionObject.amount} </li>

                    : null
                )
              })}
            </ul>
            <h4 className="colorPop"> Total: {finalExpenseTotal.toFixed(2)} </h4>
          </div>
        </div>
        <h3 className="colorPop"> Balance: {finalTotal.toFixed(2)} </h3>
      </div>
    )
  }
}

export default Column;