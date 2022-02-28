import React, { useState } from 'react'

import Button from './Button.jsx'

import IconAttack from '../../assets/marketplace/icons/icon_attack.svg'
import IconMagic from '../../assets/marketplace/icons/icon_magic.svg'
import IconShield from '../../assets/marketplace/icons/icon_shield.svg'

import Bot from '../../assets/marketplace/marketplace_bot.png'
import Coin from '../../assets/marketplace/coin.png'

function Card({ imageUrl, botName, dps, shield, magic, bot_id, rarity, priceCoin, priceUSD, openItem, withPrice, setItemType, openToSell, activeItemToSell }) {
// setItemType methods specifies block in Item component. Whatewer we want to buy or sell bot
  return (
    <div className={ activeItemToSell && activeItemToSell.bot_id === bot_id ? 'card card_active-to-sell' : 'card' } onClick={!withPrice ? () => { openToSell();  setItemType('ToSell') } : null }>
      <div className={rarity === 'Rare' ? 'card__image_rare' : rarity === 'Epic' ? 'card__image_epic' : rarity === 'Legend' ? 'card__image_legend' : 'card__image_true'}></div>
      <img src={Bot} alt="Character image" className='card__image'/>
      <div className='card__body'>
        <div className='card__name'>
          <span>#{bot_id}</span>
          <span>{botName}</span>
        </div>
        <div className='card__stats'>
          <ul className='card__points'>
            <li className='card__point'>
              <img src={IconAttack} alt="attack" className='card__attack-img'/>
              <span>{dps}</span>
            </li>
            <li className='card__point'>
              <img src={IconShield} alt="shield" className='card__armor-img'/>
              <span>{shield}</span>
            </li>
            <li className='card__point'>
              <img src={IconMagic} alt="magic" className='card__magic-img'/>
              <span>{magic}</span>
            </li>
          </ul>
          <span className='card__badge'
						style={{ background: rarity === 'Rare' ? 'rgba(28, 241, 255, 0.1)' : rarity === 'Epic' ? 'rgba(234, 112, 253, 0.1)' : rarity === 'Legend' ? 'rgba(248, 212, 156, 0.1)' : 'rgba(255, 255, 255, 0.1)',
							color: rarity === 'Rare' ? '#1CF1FF' : rarity === 'Epic' ? '#EA70FD' : rarity === 'Legend' ? '#F8D49C' : '#FFFFFF'
							}}
          >
            {rarity}
          </span>
        </div>
      </div>
			{
				withPrice ? 
				<footer className='card__footer'>
        <div className='card__price'>
          <img src={Coin} alt="coin"/>
          <span>{priceCoin}</span>
        </div>
        <div className='card__price-usd'>${priceUSD}</div>
        <Button type='card__button' onClick={() => { openItem(), setItemType('ToBuy') }}>Buy now</Button>
      </footer>
			: null
			}
    </div>
  )
}

export default Card