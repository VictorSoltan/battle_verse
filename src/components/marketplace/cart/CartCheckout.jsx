import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Coin from '../../../assets/header/coin.png'

import Button from '../Button.jsx'

function CartCheckout({  }) {

	const state = useSelector(({ cart }) => {
		return {
			totalPriceCoins: cart.totalPriceCoins,
			totalPriceUSD: cart.totalPriceUSD,
			totalCount: cart.totalCount,
		}
	})

  return (
    <div className='marketplace-cart__checkout'>
			<Button>Proceed to checkout</Button>
			<div className='marketplace-cart__checkout-total'>
				<span>Subtotal</span>
				<div className="marketplace-priceGroup__price">
					<div className='marketplace-priceGroup__price-coin'>
						<img src={Coin} alt="coin"/>
						<span>{state.totalPriceCoins}</span>
					</div>
        	<div className='marketplace-priceGroup__price-usd'>${state.totalPriceUSD}</div>
				</div>
			</div>
			<span className="marketplace-cart__checkout-total-goods">Total goods: {state.totalCount}</span>
    </div>
  )
}

export default CartCheckout
