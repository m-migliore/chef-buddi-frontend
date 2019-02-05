import React, { Component } from 'react';
import Login from '../components/Login'

class Home extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <Login />
        </div>
      </div>
    );
  }

}

export default Home;
