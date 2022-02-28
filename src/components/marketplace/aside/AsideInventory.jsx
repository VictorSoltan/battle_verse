import React, { useState } from 'react';
import Button from '../../marketplace/Button.jsx'

import Circle from '../../../assets/marketplace/icon__circle.png'
import IconArrowLeft from '../../../assets/marketplace/icons/icon_arrow-left.svg'

function AsideInventory({setComponent}) {
	const [asideItems, setAsideItems] = useState([
		{ id: 0, active: true, name: 'Inventory', items: ['NFT' , 'Lands', 'Productions', 'Resources', 'Energy'] },
		{ id: 1, active: false, name: 'Wishlist', items: ['NFT'] },
		{ id: 2, active: false, name: 'My Offers', items: ['NFT'] },
		{ id: 3, active: false, name: 'Sold', items: ['NFT'] },
	]);

  return (
    <aside className='aside-mp aside-mp__inventory'>
			<Button type='marketplace-back__btn' onClick={() => {setComponent('Home')}}>
				<img src={IconArrowLeft} className="marketplace-back__btn-img" alt="back"/>Back
			</Button>
			<h5 className='aside-mp__inventory_title'>My Items</h5>
			{
				asideItems.map((item) => (
					<div className='aside-mp__inventory_block' key={item.id}>
						<div className='aside-mp__inventory_block_top' style={{ background: item.active ? '#20313A' : '' }}
							onClick={() => {item.active = !item.active; setAsideItems([...asideItems]); }} 
						>
							<img src={Circle} alt="circle" />
							<div>{ item.name }</div>
						</div>
						{
							item.active && 
							<div className="aside-mp__inventory_block_content">
								{
									item.items && item.items.map((el, index) => (
										<div key={index} className='aside-mp__inventory_block_badge'>
											{el}
										</div>
									))
								}
							</div>
						}
					</div>
				))
			}
    </aside>
  )
}

export default AsideInventory