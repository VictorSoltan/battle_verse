import React from 'react';

const Tickets = () => {
	const tickets = ['Билеты на участие в чемпионате', 'Разрешение на строительство базы и создание клана', 'Мультипассы для перелёта', 'Акции кланов']
  
	return (
    <ul className="aside-mp__lands">
			{
				tickets.map((ticket, index) => {
					return (
						<li className='aside-mp__filter-badge' key={index}>
							{ ticket }
						</li>
					)
				})
			}
    </ul>
  );
};

export default Tickets;