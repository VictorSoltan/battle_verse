import React from 'react'

import Button from '../Button.jsx'

import Coin from '../../../assets/header/coin.png'
import Ava from '../../../assets/marketplace/item__owner.png'


function PriceGroup({ handleAddItem, priceCoin, priceUSD }) {
  return (
		<div className="marketplace-priceGroup">
			<span>Current price</span>
			<div className="marketplace-priceGroup__price">
				<div className='marketplace-priceGroup__price-coin'>
          <img src={Coin} alt="coin"/>
          <span>{priceCoin}</span>
        </div>
        <div className='marketplace-priceGroup__price-usd'>${priceUSD}</div>
			</div>
			<div className='marketplace-priceGroup__owned'>
				<span>Owned by</span>
				<img src={Ava} alt="avatar"/>
				<span className='marketplace-priceGroup__owner'>Owner</span>
			</div>
			<div className='marketplace-priceGroup__actions'>
				<Button type="marketplace-priceGroup__actions_buy">Buy now</Button>
				<Button type="marketplace-priceGroup__actions_card" onClick={() =>  handleAddItem() }>Add to card</Button>
			</div>
		</div>	
  )
}

export default PriceGroup