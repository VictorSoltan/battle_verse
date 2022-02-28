import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Header, SubHeader } from '../components/marketplace'
import AsideHome from '../components/marketplace/aside/AsideHome.jsx'
import AsideInventory from '../components/marketplace/aside/AsideInventory.jsx'
import Cart from './Cart.jsx'
import Home from './Home.jsx'
import Item from './Item.jsx'
import Inventory from './Inventory.jsx'
import '../styles/marketplace.scss'

function Marketplace() {
	const dispatch = useDispatch()

  const mockCards = [
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 1', bot_id: 4342, dps: '27', shield: '23', magic: '42', rarity: 'Rare', priceCoin: 0.23, priceUSD: 297
    },
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 2', bot_id: 4346, dps: '27', shield: '23', magic: '42', rarity: 'Epic', priceCoin: 0.14, priceUSD: 874
    },
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 3', bot_id: 4341, dps: '22', shield: '21', magic: '12', rarity: 'Legend', priceCoin: 0.43, priceUSD: 299
    },
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 4', bot_id: 4111, dps: '12', shield: '11', magic: '12', rarity: 'Legend', priceCoin: 0.19, priceUSD: 466
    },
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 90', bot_id: 113, dps: '30', shield: '11', magic: '12', rarity: 'True', priceCoin: 0.57, priceUSD: 1200
    },
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 5', bot_id: 799, dps: '21', shield: '11', magic: '12', rarity: 'Epic', priceCoin: 0.31, priceUSD: 900
    },
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 12', bot_id: 63521, dps: '30', shield: '11', magic: '12', rarity: 'Rare', priceCoin: 0.21, priceUSD: 430
    },
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 111', bot_id: 5341, dps: '30', shield: '11', magic: '12', rarity: 'Rare', priceCoin: 0.19, priceUSD: 235
    },
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 111', bot_id: 315, dps: '30', shield: '11', magic: '12', rarity: 'True', priceCoin: 0.61, priceUSD: 985
    },
		{ 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 90', bot_id: 113, dps: '30', shield: '11', magic: '12', rarity: 'True', priceCoin: 0.57, priceUSD: 1200
    },
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 5', bot_id: 3323, dps: '21', shield: '11', magic: '12', rarity: 'Epic', priceCoin: 0.31, priceUSD: 900
    },
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 12', bot_id: 3089, dps: '30', shield: '11', magic: '12', rarity: 'Rare', priceCoin: 0.21, priceUSD: 430
    },
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 111111', bot_id: 457, dps: '30', shield: '11', magic: '12', rarity: 'Rare', priceCoin: 0.19, priceUSD: 235
    },
    { 
      imageUrl: "../../assets/marketplace/marketplace_bot.png",
      botName: 'Baby Combat Bot 111', bot_id: 105, dps: '30', shield: '11', magic: '12', rarity: 'True', priceCoin: 0.61, priceUSD: 985
    },
  ]

	const tabs = ["NFT Chars", "Lands", "Productions", "Resources", "Energy", "Tickets"];
	
	// Header tabs 
	const [active, setActive] = useState(tabs[0]);

	// Filter cards on Home screnn
	const [filteredCards, setFilteredCards] = useState(mockCards)

	// Change current component
	const [component, setComponent] = useState('Home');

	// Set open Item (bot)
	const [openedItem, setOpenedItem] = useState(null);

	// To check type of bot, toBuy or toSell. Depending on type we render component in Item
	const [itemType, setItemType] = useState('ToBuy');

	// Wathcing effect of openedItem
	useEffect(() => {
		if (openedItem !== null) {
			setComponent('Item');
			console.log(openedItem);
		}
	}, [openedItem])
	// Tab active only when we on Home page
	useEffect(() => {
		if (component !== 'Home') {
			setActive('');
		} else setActive(tabs[0]);
	}, [component])

	// Filtering mock cards
  const handleFiltering = (option) => {
    setFilteredCards(
      mockCards.filter(card => {
        if (card.rarity === option) {
          return true
        }
      })
    )
  }

	// Subheader tab changing
	const handleTabChange = (tab) => {
		setActive(tab)
	}

	// Adding item to the cart
	const onAddItemToTheCard = obj => {
		dispatch({
			type: 'ADD_ITEM_CART',
			payload: obj,
		});
	}

  return (
    <section className='marketplace'>
      <Header tabs={tabs} setActive={setActive} onClick={handleTabChange} setComponent={setComponent} component={component} active={active} />
      <div className='marketplace__container'>
				{
					component === 'Home' ? <AsideHome onClick={handleFiltering} currentTab={active} /> : 
					component === 'Inventory' ? <AsideInventory currentTab={active} setComponent={setComponent} /> : null 
				}
        <div className='marketplace__body'>
					{
						component === 'Home' ?  <SubHeader ammount={'4000'}/> : 
						component === 'Inventory' ?  <SubHeader ammount={'20'}/> : null
					}
					{
						component === 'Cart' ? <Cart setComponent={setComponent} setOpenedItem={setOpenedItem} /> :
						component === 'Home' ? <Home setItemType={setItemType} filteredCards={filteredCards} setOpenedItem={setOpenedItem} openedItem={openedItem}/> : 
						component === 'Item' ? <Item {...openedItem} itemType={itemType} setComponent={setComponent} setOpenedItem={setOpenedItem} onAddItemToTheCard={onAddItemToTheCard}/> : 
						component === 'Inventory' ? <Inventory setItemType={setItemType} setComponent={setComponent} setOpenedItem={setOpenedItem} mockCards={mockCards} /> : null
					}
        </div>
      </div>
    </section>
  )
}

export default Marketplace
