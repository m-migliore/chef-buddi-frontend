import React, { Component } from 'react';

function ingredSelector(WrappedComponent, ingredients) {
  return class ingredWrap extends Component {
    render() {
      return (
        <>
          <WrappedComponent {...this.props} ingredients={ingredients} />
        </>

      )
    }
  }
}

export default ingredSelector
