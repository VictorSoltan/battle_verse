import React from 'react';

const Lands = () => {
	const lands = ['Lands and territories', 'Plot + building', 'Territories with production']
  
	return (
    <ul className="aside-mp__lands">
			{
				lands.map((land, index) => {
					return (
						<li className='aside-mp__filter-badge' key={index}>
							{ land }
						</li>
					)
				})
			}
    </ul>
  );
};

export default Lands;