import React from 'react';

const Resources = () => {
	const resources = ['Паки ресов от разрабов', 'Наборы ресов', 'Руда', 'Переработанная руда/слитки ресов', 'Компаненты для строительства', 'Артефакты', 'Набор сборочный цех', 'Чертежи чипов', 'Чипы для ботов', 'Питомцы для грибов']
  
	return (
    <ul className="aside-mp__lands">
			{
				resources.map((res, index) => {
					return (
						<li className='aside-mp__filter-badge' key={index}>
							{ res }
						</li>
					)
				})
			}
    </ul>
  );
};

export default Resources;