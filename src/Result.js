import React, { Component } from "react";

class Result extends Component {
  handleSubtotal = (array) => {
    return array.reduce((a, b) =>
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
          {this.handleTotal() >= 0 ?

            <h3 className="colorPositive"> Balance: $ {this.handleTotal()} </h3>

            :

            <h3 className="colorNegative"> Balance: $ {this.handleTotal()} </h3>}
        </div>
    )
  }
}

export default Result;