import React, { Component } from "react";
import dbRef from './firebase';
import Result from './Result'

class Column extends Component {
  handleDelete = (event) => {
    dbRef.child(event.target.id).remove();
  }

  handleSubtotal = (array) => {
    return array.reduce((a,b) => 
      parseFloat(a) + parseFloat(b), 0
    ).toFixed(2)
  }

  render() {
    return (
      <div>
        <div className="flexParent">
          <div>
            <h2> Income </h2>
            <ul>
              {this.props.transList.map((trans, i) => {
                const {type, description, amount} = trans.transObject;               
                return (
                  (type === "income") ?

                    <li key={i}> 
                    <i className="fa fa-minus-circle" aria-hidden="true" 
                    id={trans.transKey} onClick={this.handleDelete}> </i>  {description
                    } : {amount} </li>

                    : null
                )
              })}
            </ul>
            <h4 className="colorPop"> Total : $ {this.handleSubtotal(this.props.incomeAmountArray)} </h4>
          </div>
          <div>
            <h2> Expenses </h2>
            <ul>
              {this.props.transList.map((trans, i) => {
                const { type, description, amount } = trans.transObject; 
                return (
                  (type === "expense") ?

                    <li key={i}> 
                    <i className="fa fa-minus-circle" aria-hidden="true" id={trans.transKey} onClick={this.handleDelete}></i>  {description
                    } : {amount} </li>

                    : null
                )
              })}
            </ul>
            <h4 className="colorPop"> Total: $ {this.handleSubtotal(this.props.expenseAmountArray)} </h4>
          </div>
        </div>
        <Result 
          incomeArray = {this.props.incomeArray}
          expenseArray={this.props.expenseArray} 
          transList = {this.props.transList}
          incomeAmountArray={this.props.incomeAmountArray}
          expenseAmountArray={this.props.expenseAmountArray}
          expenseCat={this.props.expenseCat}/>
      </div>
    )
  }
}

export default Column;