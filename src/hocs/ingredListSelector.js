import React, { Component } from 'react';

function ingredListSelector(WrappedComponent, ingredients) {
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

export default ingredListSelector
