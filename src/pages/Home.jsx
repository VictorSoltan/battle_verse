import React from 'react'
import { Card } from '../components/marketplace'

function Home({ filteredCards, setOpenedItem, openedItem, setItemType }) {
  return (
		<ul className='marketplace__cards-container'>
			{
				filteredCards.map((card, index) => {
					return (
						<li className='marketplace__card-item' key={index}>
							<Card {...card} openItem={() => setOpenedItem(card)} withPrice={true} setItemType={setItemType}/>
						</li>
					)
				})
			}
		</ul>
  )
}

export default Home