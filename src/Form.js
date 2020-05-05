import React, { Component } from 'react';

import dbRef from './firebase'

class Form extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      amount: "",
      type: "",
      categories: "",
    }
  }

  // changing the income and expense drop down
  handleChangeType = (event) => {
    this.setState({
      type: event.target.value
    })
  }

  // changing the categories drop down
  handleChangeCategories = (event) => {
    this.setState({
      categories: event.target.value
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
      type: this.state.type,
      categories: this.state.categories
    }

    if (transToBeAdded.description !== "" && transToBeAdded.amount !== "" && transToBeAdded.type !== "" && transToBeAdded.catgories !== "") {
      dbRef.push(transToBeAdded)
      this.setState({
        description: "",
        amount: "",
        type: "",
        categories: ""
      })
    }
  }

  handleReset = () => {
    this.setState({
      description: "",
      amount: "",
      type: "",
      categories: ""
    })
  }

  render() {
    const { description, amount, type, categories} = this.state
    const isEnabled = description.length > 0 && amount.length > 0 && type.length > 0 &&
    categories.length > 0
    return (
      <div>
        {/* dropdown menu */}
          <select
            onChange={this.handleChangeType} value={type}>
            <option value="" > select </option>
            <option value="income"> 💰 Income </option>
            <option value="expense"> 💸 Expense </option>
          </select>
        <select onChange={this.handleChangeCategories} value={categories}>
          <option value=""> category </option>
            <option value="housing">
              🏡 Housing
            </option>
          <option value="transportation">
            🚗 Transportation
            </option>
          <option value="food">
            🍱 Food
          </option>
          <option value="utilities">
            💡 Utilities
          </option>
          <option value="insurance">
            👩‍⚕️ Insurance
          </option>
          <option value="medical">
            🩺 Medical & HealthCare
          </option>
          <option value="personal">
            🧖‍♀️ Personal
          </option>
          <option value="saving">
            💵 Saving
          </option>
          <option value="debt">
            💸 Debt
          </option>
          <option value="retirement">
            👵 Retirement
          </option>
          <option value="education">
            📚 Education
          </option>
          <option value="gifts">
            🧧 Gifts
          </option>
          <option value="entertainment">
            🎬 Entertainment
          </option>

          </select>
          {/* form */}
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="transType" className="visuallyHidden"></label>
            <input id="transType" type="text" placeholder="description"
              value={description} onChange={this.handleDescription} />
            <label htmlFor="transAmount"className="visuallyHidden"></label>
            <input id="transAmount" type="number" placeholder="amount" min="0" step=".01"
              value={amount}
              onChange={this.handleAmountChange} />
            <button disabled={!isEnabled} type="submit"> Add Transaction to List</button>
            <button type="button" onClick={this.handleReset} > Reset </button>
          </form>
      </div>
    )
  }
}

export default Form;

// show all expenses; show each category
// balance (results)
// show a graph with the expenses (bar, pie)