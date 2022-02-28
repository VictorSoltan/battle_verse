import React from 'react'
import { useDispatch } from 'react-redux'

import { HistoryGroup, PriceGroup, StatisticsGroup, SellGroup } from '../components/marketplace/item'
import Button from '../components/marketplace/Button.jsx'

import IconAttack from '../assets/marketplace/icons/icon_attack.svg'
import IconMagic from '../assets/marketplace/icons/icon_magic.svg'
import IconShield from '../assets/marketplace/icons/icon_shield.svg'
import IconArrowLeft from '../assets/marketplace/icons/icon_arrow-left.svg'

import Bot from '../assets/marketplace/item__bot.png'
import IconBodypart from '../assets/marketplace/icon_bodypart.png'


const bodyparts = [
	{ id: 0, name: 'Double Spike', type: 'Weapon', icon: IconBodypart},
	{ id: 1, name: 'Bottle', type: 'Item', icon: IconBodypart},
	{ id: 2, name: 'Bottle', type: 'Item', icon: IconBodypart},
	{ id: 3, name: 'Bottle', type: 'Item', icon: IconBodypart},
	{ id: 4, name: 'Bottle', type: 'Item', icon: IconBodypart},
	{ id: 5, name: 'Bottle', type: 'Item', icon: IconBodypart},
]

function Item({ imageUrl, botName, dps, shield, magic, bot_id, rarity, priceCoin, priceUSD, setComponent, setOpenedItem, onAddItemToTheCard, itemType }) {
	const handleAddItem = () => {
		const obj = {
			imageUrl,
			botName,
			dps, 
			shield, 
			magic,
			bot_id, 
			rarity, 
			priceCoin, 
			priceUSD,
		};
		onAddItemToTheCard(obj);
	}

  return (
    <section className='marketplace-item'>
			<div className='marketplace-item__left-block'>
				<Button type='marketplace-back__btn' onClick={() => {setComponent('Home'); setOpenedItem(null)}}>
					<img src={IconArrowLeft} className="marketplace-back__btn-img" alt="back"/>Back
				</Button>
			</div>
			<div className='marketplace-item__main'>
				<div className='marketplace-item__data'>
					<span className='marketplace-item__name'>
						{botName}
					</span>
					<span className='marketplace-item__id'>
						#{bot_id}
					</span>
					<div className='marketplace-item__rarity'
						style={{ background: rarity === 'Rare' ? 'rgba(28, 241, 255, 0.1)' : rarity === 'Epic' ? 'rgba(234, 112, 253, 0.1)' : rarity === 'Legend' ? 'rgba(248, 212, 156, 0.1)' : 'rgba(255, 255, 255, 0.1)',
						color: rarity === 'Rare' ? '#1CF1FF' : rarity === 'Epic' ? '#EA70FD' : rarity === 'Legend' ? '#F8D49C' : '#FFFFFF'
						}}>
						{rarity}
					</div>
					<div className={rarity === 'Rare' ? 'marketplace-item__image_rare' : rarity === 'Epic' ? 'marketplace-item__image_epic' : rarity === 'Legend' ? 'marketplace-item__image_legend' : 'marketplace-item__image_true'}></div>
					<img src={Bot} className="marketplace-item__image" alt="bot image"/>
				</div>
				<div className='marketplace-cart__card-stats marketplace-item-stats'>
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
					<span className='marketplace-item__bodyparts-title'>Body parts</span>
					<ul className='marketplace-item__bodyparts-list'>
						{
							bodyparts.map((bodyPart) => (
								<li className='marketplace-item__bodypart' key={bodyPart.id}>
									<div className='marketplace-item__bodypart_image'>
										<img src={bodyPart.icon} alt="bodypart image"/>
									</div>
									<span className='marketplace-item__bodypart_type'>{bodyPart.type}</span>
									<span className='marketplace-item__bodypart_name'>{bodyPart.name}</span>
								</li>
							))
						}
					</ul>
				</div>
				<div className='marketplace-item__price'>
					{
						itemType === 'ToBuy' ? <PriceGroup handleAddItem={handleAddItem} priceCoin={priceCoin} priceUSD={priceUSD}/> :
						itemType === 'ForSale' ? <SellGroup  priceCoin={priceCoin} rarity={rarity} botName={botName} bot_id={bot_id} /> : null
					}
					<HistoryGroup />
					<StatisticsGroup /> 
				</div>
			</div>
    </section>
  )
}

export default Item