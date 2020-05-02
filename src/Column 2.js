import React, { Component } from "react";
import firebase from './firebase'

const dbRef = firebase.database().ref();

class ShowColumn extends Component {
  handleDelete = (event) => {
    dbRef.child(event.target.id).remove();
  }

  handleSubtotal = (array) => {
    return array.reduce((a,b) => 
      parseFloat(a) + parseFloat(b), 0
    ).toFixed(2)
  }

  handleTotal = () => {
    const arr1 = this.handleSubtotal(this.props.incomeArray);
    const arr2 = this.handleSubtotal(this.props.expenseArray);
    return (arr1 - arr2).toFixed(2)
  }

  render() {
    return (
      <div>
        <div className="flexParent">
          <div>
            <h2> Income </h2>
            <ul>
              {this.props.listTrans.map((trans, i) => {
                const isType = trans.transObject.type === "income"
                return (
                  (isType) ?

                    <li key={i}> 
                    <i className="fa fa-minus-circle" aria-hidden="true" 
                    id={trans.transKey} onClick={this.handleDelete}> </i>  {trans.transObject.description
                    } : {trans.transObject.amount} </li>

                    : null
                )
              })}
            </ul>
            <h4 className="colorPop"> Total : $ {this.handleSubtotal(this.props.incomeArray)} </h4>
          </div>
          <div>
            <h2> Expenses </h2>
            <ul>
              {this.props.listTrans.map((trans, i) => {
                const isType = trans.transObject.type === "expense"
                return (
                  (isType) ?

                    <li key={i}> 
                    <i className="fa fa-minus-circle" aria-hidden="true" id={trans.transKey} onClick={this.handleDelete}></i>  {trans.transObject.description
                    } : {trans.transObject.amount} </li>

                    : null
                )
              })}
            </ul>
            <h4 className="colorPop"> Total: $ {this.handleSubtotal(this.props.expenseArray)} </h4>
          </div>
        </div>
        <div>
          {this.handleTotal() >= 0 ?

            <h3 className="colorPositive"> Balance: $ {this.handleTotal()} </h3>

            :

            <h3 className="colorNegative"> Balance: $ {this.handleTotal()} </h3>}
        </div>
      </div>
    )
  }
}

export default ShowColumn;