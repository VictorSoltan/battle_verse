import React from 'react'

import Button from '../components/marketplace/Button.jsx'
import { CartItem, CartCheckout } from '../components/marketplace/cart'

import { useDispatch, useSelector } from 'react-redux'

import IconBasket from '../assets/marketplace/icons/icon_basket.svg'
import IconArrowLeft from '../assets/marketplace/icons/icon_arrow-left.svg'

function Cart({setComponent, setOpenedItem}) {

	const state = useSelector(({ cart }) => {
		return {
			items: cart.items
		}
	});

	const cartItems = Object.keys(state.items).map(key => {
		return state.items[key].items[0];
	});

  return (
    <section className='marketplace-cart'>
			<div className='marketplace-cart__left-block'>
				<Button type='marketplace-back__btn' onClick={() => {setComponent('Home'); setOpenedItem(null)}}>
					<img src={IconArrowLeft} className="marketplace-back__btn-img" alt="back"/>Back
				</Button>
			</div>
			<main className='marketplace-cart__main'>
				<span className='marketplace-cart__header'>
					<img src={IconBasket} className="header-mp__icon" alt="basket" onClick={() => {setComponent('Cart')}}/>
					shopping cart
				</span>
				<ul className='marketplace-cart__list'>
					{
						cartItems.map((item, index) => (
							<CartItem key={index} bot_id={item.bot_id} imageUrl={item.imageUrl} botName={item.botName} dps={item.dps}
								shield={item.shield} magic={item.magic} rarity={item.rarity} priceCoin={item.priceCoin} priceUSD={item.priceUSD}
							/>
						))
					}
				</ul>
			</main>
			<aside className='marketplace-cart__aside'>
				<CartCheckout  />
			</aside>
    </section>
  )
}

export default Cart


