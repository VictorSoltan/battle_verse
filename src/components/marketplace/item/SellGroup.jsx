import React from 'react'

import Button from '../Button.jsx'

import Coin from '../../../assets/header/coin.png'
import Ava from '../../../assets/marketplace/item__owner.png'


function SellGroup({ priceCoin, bot_id, botName, rarity }) {
  return (
		<div className="sell-group">
			<div className='sell-group__header'>
				<span className='sell-group__bot_id'>#{bot_id}</span>
				<span className='sell-group__bot_name'>{botName}</span>
				<span className='sell-group__bot_rarity'
					style={{ background: rarity === 'Rare' ? 'rgba(28, 241, 255, 0.1)' : rarity === 'Epic' ? 'rgba(234, 112, 253, 0.1)' : rarity === 'Legend' ? 'rgba(248, 212, 156, 0.1)' : 'rgba(255, 255, 255, 0.1)',
						color: rarity === 'Rare' ? '#1CF1FF' : rarity === 'Epic' ? '#EA70FD' : rarity === 'Legend' ? '#F8D49C' : '#FFFFFF'
						}}
          >
            {rarity}
				</span>
			</div>
			<div className='sell-group__body'>
				<img src={Coin} alt="coin image" />
				<span className='sell-group__price'>{}</span>
				<span></span>
			</div>
		</div>	
  )
}

export default SellGroup