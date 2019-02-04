import React from 'react';

const Loader = props => {
  return(
    <div className="loader">
      <h2>Loading {props.title}</h2>
      <img src={require('../img/cooking.svg')} alt="Chef" className="loader animated infinite pulse"/>
    </div>
  )
}

export default Loader
