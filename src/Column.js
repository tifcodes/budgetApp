import React, { Component } from "react";

class Column extends Component {
  render() {
    const finalIncomeTotal = this.props.arrayIncome.reduce((a, b) => parseInt(a) + parseInt(b), 0)
    const finalExpenseTotal = this.props.arrayExpense.reduce((a, b) => parseInt(a) + parseInt(b), 0)
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
            <h4 className="colorPop"> Total : {finalIncomeTotal} </h4>
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
            <h4 className="colorPop"> Total: {finalExpenseTotal} </h4>
          </div>
        </div>
        <h3 className="colorPop"> Balance: {finalTotal} </h3>
      </div>
    )
  }
}

export default Column;