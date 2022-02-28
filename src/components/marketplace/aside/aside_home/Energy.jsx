import React from 'react';

const Energy = () => {
	const energy = ['Паки энергии от разработчиков', 'Предложения от игроков']
  
	return (
    <ul className="aside-mp__lands">
			{
				energy.map((en, index) => {
					return (
						<li className='aside-mp__filter-badge' key={index}>
							{ en }
						</li>
					)
				})
			}
    </ul>
  );
};

export default Energy;