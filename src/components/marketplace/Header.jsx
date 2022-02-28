import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import IconBasket from '../../assets/marketplace/icons/icon_basket.svg'
import IconSquare from '../../assets/marketplace/icons/icon_square.svg'


function Header({ tabs, onClick, setComponent, setActive, active, component }) {
	const [menu, setMenu] = useState(false)
	const state = useSelector(({ cart }) => {
		return {
			totalCount: cart.totalCount,
		}
	})

  return (
    <header className='header-mp'>
			<div className={!menu ? 'header-mp__content' : 'header-mp__content header-mp__content_active'}>
				<ul className='header-mp__tabs-list'>
					{
						tabs.map((tab) => 
						<li className='header-mp__tab' 
							key={tab} 
							onClick={() => { setActive(tab); onClick(tab); }}
							style={{ background: active === tab ? '#0D2330' : '' }}
						>
							<span className='header-mp__tab-circle'></span>
							{tab}
						</li>
						)
					}
				</ul>
				<div className='header-mp__actions'>
					<div className='header-mp__container' style={{ background: component === 'Inventory' ? '#0D2330' : '' }}>
						<img src={IconSquare} className="header-mp__icon" alt="square" onClick={() => {setComponent('Inventory')}} />
					</div>
					<div className='header-mp__container' style={{ background: component === 'Cart' ? '#0D2330' : '' }}>
						{
							state.totalCount > 0 ? <span className="header-mp__icon-new"></span> : null
						}
						<img src={IconBasket} className="header-mp__icon" alt="basket" onClick={() => {setComponent('Cart')}} />
					</div>
				</div>
			</div>
			<div className={!menu ? "header-mp__burger" : "header-mp__burger header-mp__burger_active"} onClick={() => setMenu(!menu)}>
				<div/>
				<div/>
				<div/>
			</div>
    </header>
  )
}

export default Header