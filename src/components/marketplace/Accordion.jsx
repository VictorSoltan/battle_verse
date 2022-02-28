import React, { useState } from 'react';

import Arrow from '../../assets/marketplace/icons/icon_arrow-top.svg'

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion__title" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div style={{ cursor: "pointer" }}>
					{
						isActive ? <img src={Arrow} alt="arrow" />  : <img src={Arrow} alt="arrow" style={{transform: "rotate(180deg)" }}/>
				 	}
				</div>
      </div>
      {
				isActive && 
				<div className="accordion__content">
					{ content }
				</div>
			}
    </div>
  );
};

export default Accordion;