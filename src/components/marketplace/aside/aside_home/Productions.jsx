import React from 'react';

const Productions = () => {
	const productions = ['Буровая установка', 'Завод переработки', 'Сборочный цех', 'Клановый бар', 'Акции для пользователей и их персонажей NFT', 'Набор для предпринимательства', 'Набор сборочный цех', 'Набор завод переработки']
  
	return (
    <ul className="aside-mp__lands">
			{
				productions.map((prod, index) => {
					return (
						<li className='aside-mp__filter-badge' key={index}>
							{ prod }
						</li>
					)
				})
			}
    </ul>
  );
};

export default Productions;