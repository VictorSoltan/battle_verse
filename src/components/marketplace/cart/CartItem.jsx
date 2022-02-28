import React from 'react'
import { removeCartItem } from '../../../redux/actions/cart'
import { useDispatch } from 'react-redux'

import IconAttack from '../../../assets/marketplace/icons/icon_attack.svg'
import IconMagic from '../../../assets/marketplace/icons/icon_magic.svg'
import IconShield from '../../../assets/marketplace/icons/icon_shield.svg'
import IconCross from '../../../assets/marketplace/icons/icon_cross.svg'

import Bot from '../../../assets/marketplace/marketplace_bot.png'
import Coin from '../../../assets/header/coin.png'

function CartItem({ imageUrl, botName, dps, shield, magic, bot_id, rarity, priceCoin, priceUSD }) {
	const dispatch = useDispatch()

	const onDeleteItem = () => {
		dispatch(removeCartItem(bot_id))
	}

  return (
    <div className='marketplace-cart__card'>
      <div className={rarity === 'Rare' ? 'marketplace-cart__card-image_rare' : rarity === 'Epic' ? 'marketplace-cart__card-image_epic' : rarity === 'Legend' ? 'marketplace-cart__card-image_legend' : 'marketplace-cart__card-image_true'}></div>
      <img src={Bot} alt="Character image" className='marketplace-cart__card-image'/>
			<div className='marketplace-cart__card-main'>
				<div className='marketplace-cart__card-id'>
					#{bot_id}
					<span className='marketplace-cart__card-name'>
					{botName}
					</span>
				</div>
				<div className='marketplace-cart__card-badge'
					style={{ background: rarity === 'Rare' ? 'rgba(28, 241, 255, 0.1)' : rarity === 'Epic' ? 'rgba(234, 112, 253, 0.1)' : rarity === 'Legend' ? 'rgba(248, 212, 156, 0.1)' : 'rgba(255, 255, 255, 0.1)',
								color: rarity === 'Rare' ? '#1CF1FF' : rarity === 'Epic' ? '#EA70FD' : rarity === 'Legend' ? '#F8D49C' : '#FFFFFF'
								}}
				>
					{rarity}
				</div>
				<div className='marketplace-cart__card-stats'>
					Base stats
					<ul className='marketplace-cart__card-stats-list'>
            <li className='marketplace-cart__card-point'>
              <img src={IconAttack} alt="attack" className='card__attack-img'/>
              <span>{dps}</span>
            </li>
            <li className='marketplace-cart__card-point'>
              <img src={IconShield} alt="shield" className='card__armor-img'/>
              <span>{shield}</span>
            </li>
            <li className='marketplace-cart__card-point'>
              <img src={IconMagic} alt="magic" className='card__magic-img'/>
              <span>{magic}</span>
            </li>
          </ul>
				</div>
				<div className='marketplace-cart__card-actions'>
					<img src={IconCross} alt="Delete image" onClick={onDeleteItem} />
					Delete
				</div>
			</div>
			<div className='marketplace-cart__card-price'>
				<div className='marketplace-cart__card-price_coin'>
					<img src={Coin} alt="coin" />
					<span>{priceCoin}</span>
				</div>
				<div className='marketplace-cart__card-price_usd'>${priceUSD}</div>
			</div>
    </div>
  )
}

export default CartItem