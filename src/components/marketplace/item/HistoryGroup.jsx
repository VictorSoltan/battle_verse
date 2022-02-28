import React, { useState } from 'react'

import Button from '../Button.jsx'
import Accordion from '../Accordion.jsx';

import Coin from '../../../assets/header/coin.png'


function historyGroup() {
	const [mockData, setMockData] = useState([
		{id: 0, buyer: 'CryptoMOM3', seller: 'Alyosha', priceCoin: '0,09', time: '2 hours ago', buyerId: '(ronin: 84cdscd...43242323)', sellerId: '(ronin: 432sd...43242323)'},
		{id: 1, buyer: 'CryptoMOM3', seller: 'Alyosha', priceCoin: '0,09', time: '2 hours ago', buyerId: '(ronin: 84cdscd...43242323)', sellerId: '(ronin: 432sd...43242323)'},
		{id: 2, buyer: 'CryptoMOM3', seller: 'Alyosha', priceCoin: '0,09', time: '2 hours ago', buyerId: '(ronin: 84cdscd...43242323)', sellerId: '(ronin: 432sd...43242323)'},
	])

  return (
			<div className='history-group'>
				<div className='history-group__title'>Sale history</div>
				{
					mockData.map((data) => {
						return (
							<div className='history-group__row' key={data.id}>
								<div className='history-group__row-item'>
									<div className='history-group__row-item_up'>
										<span className='history-group__name'>Buyer</span>
										<span className='history-group__data'>{data.buyer}</span>
									</div>
									<div className='history-group__row-item_down'>
										{data.buyerId}
									</div>
								</div>
								<div className='history-group__row-item'>
									<div className='history-group__row-item_up'>
										<span className='history-group__name'>Seller</span>
										<span className='history-group__data'>{data.seller}</span>
									</div>
									<div className='history-group__row-item_down'>
										{data.sellerId}
									</div>								
								</div>
								<div className='history-group__row-item history-group__row-item_price-block'>
									<div className='history-group__row-item_up'>
										<img src={Coin} alt="coin image" />
										<span className='history-group__data_price'>{data.priceCoin}</span>
									</div>
									<div className='history-group__row-item_down'>
										{data.time}
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
  )
}

export default historyGroup