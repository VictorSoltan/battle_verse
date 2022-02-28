import React, { useState, useEffect, Fragment } from 'react'
import { Card } from '../components/marketplace'

import Coin from '../assets/header/coin.png'

function Home({ mockCards, setOpenedItem, setItemType }) {
	const [activeItemToSell, setActiveItemToSell] = useState(null);
	const [price, setPrice] = useState(1);

	const onlyNumberCheck = (e) => {
		if (!/[0-9]/.test(e.key)) {
			e.preventDefault();
		}
	}

	const maxLengthCheck = (object) => {
		if (object.target.value.length > object.target.maxLength) {
			object.target.value = object.target.value.slice(0, object.target.maxLength)
		}
	}

	// useEffect(() => {
	// 	console.log(activeItemToSell);
	// }, [activeItemToSell])

  return (
		<section className='inventory'>
			<ul className='inventory__cards-container'>
				{
					mockCards.map((card, index) => {
						return (
							<li className='marketplace__card-item' key={index}>
								<Card {...card} openItem={() => setOpenedItem(card)} openToSell={() => setActiveItemToSell(card)} activeItemToSell={activeItemToSell} withPrice={false} setItemType={setItemType} />
							</li>
						)
					})
				}
			</ul>
				{
				activeItemToSell !== null &&
				<div className='inventory__aside'>
					<div className='inventory__aside_price-block'>
						<div className='inventory__aside_top'>
							<span className='inventory__aside_id'>{activeItemToSell.bot_id}</span>
							<span className='inventory__aside_name'>{activeItemToSell.botName}</span>
							<span className='inventory__aside_rarity'
								style={{ background: activeItemToSell.rarity === 'Rare' ? 'rgba(28, 241, 255, 0.1)' : activeItemToSell.rarity === 'Epic' ? 'rgba(234, 112, 253, 0.1)' : activeItemToSell.rarity === 'Legend' ? 'rgba(248, 212, 156, 0.1)' : 'rgba(255, 255, 255, 0.1)',
									color: activeItemToSell.rarity === 'Rare' ? '#1CF1FF' : activeItemToSell.rarity === 'Epic' ? '#EA70FD' : activeItemToSell.rarity === 'Legend' ? '#F8D49C' : '#FFFFFF'
									}}
								>
									{activeItemToSell.rarity}
							</span>
						</div>
						<div className='inventory__aside_price'>
							<img src={Coin} alt="icon coin" />
							<div>{price}</div>
							<span>Floor price</span>
						</div>
						<div className='inventory__aside_input'>
							<span>Price</span>
							<div className='inventory__aside_input-block'>
								<img src={Coin} alt="icon coin"></img>
								<input type="number" min="1" max="2000" maxLength="4" 
									onKeyPress={(event) => {
										onlyNumberCheck(event)
									}}
									onInput={maxLengthCheck}
									onChange={e => setPrice(e.target.value)}
								/>
							</div>
							
							<button>Post your listing</button>
						</div>
					</div>
					<div className='inventory__aside_fees'>
						<h6>Fees</h6>
						<div className='inventory__aside_fees-fee'>
							<span>To BattleVerse (5%)</span>
							<span>56,2 QZQ</span>
						</div>
						<div className='inventory__aside_fees-fee'>
							<span>Other (5%)</span>
							<span>56,2 QZQ</span>
						</div>
						<div className='inventory__aside_fees-total'>
							<span>Total</span>
							<span>112,4 QZQ</span>
						</div>
					</div>
				</div>
			}
		</section>
  )
}

export default Home