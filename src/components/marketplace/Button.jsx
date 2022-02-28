import React from 'react';

const Button = (props) => {
  const myClass = `${props.type}`

    return (
      <button onClick={props.onClick} className={myClass}>{props.children}</button>
    )
}

export default Button