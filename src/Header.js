// import React, {Component} from 'react';
// import firebase from './firebase'

// const dbRef = firebase.database().ref();
// const provider = new firebase.auth.GoogleAuthProvider();
// const auth = firebase.auth();

// class Header extends Component {
//   constructor() {
//     super();
//     this.state= {
//       user: null
//     }
//   }

//   componentDidMount() {
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         this.setState ({
//           user
//         })
//       }
//     })
//   }

//   login = () => {
//     auth.signInWithPopup(provider).then((result) => {
//       const user = result.user;
//       this.setState({
//         user
//       })
//     })
//   }

//   logout = () => {
//     auth.signOut().then(() => {
//       this.setState({
//         user: null
//       })
//     })
//   }

// function Header() {
//   render() {
//       return (
//         <header>
//           <h1> budget app</h1>
//             {this.state.user ? <button onClick={this.logout}> Log Out </button> : <button onClick={this.login}> Log In </button>}
//         </header>
//       )
//   }
// }

// export default Header;

import React from 'react';

function Header() {
      return (
        <header>
          <h1> budget app</h1>
        </header>
      )
}

export default Header;