import React, { Component } from 'react';

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      displayMenu: false,
    }
  }

  showDropdownMenu = (event) => {
    event.preventDefault();

    this.setState({
      displayMenu: true
    }, () => {
      document.addEventListener('click', this.hideDropdownMenu)
    })
  }

  hideDropdownMenu = () => {
    this.setState({
      displayMenu: false
    }, () => {
      document.removeEventListener('click', this.hideDropdownMenu)
    })
  }

  render() {
    return (
      <div>
        <div onClick={this.showDropdownMenu}> Types </div>
        {this.state.displayMenu ?
          (
            <ul>
              <li> Income </li>
              <li> Expenses </li>
            </ul>
          ) :
          (
            null
          )
        }
      </div>
    )
  }
}

export default Dropdown
