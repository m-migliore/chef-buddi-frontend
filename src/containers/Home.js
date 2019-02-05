import React, { Component } from 'react';
import Login from '../components/Login'

class Home extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Login />
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
