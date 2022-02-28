const initialState = {
	items: {},
	totalPriceCoins: 0,
	totalPriceUSD: 0,
	totalCount: 0
};

const getTotalPriceUSD = arr => arr.reduce((sum, obj) => Number.parseFloat(obj.priceUSD) + Number.parseFloat(sum), 0);
const getTotalPriceCoin = arr => arr.reduce((sum, obj) => Number.parseFloat(obj.priceCoin) + Number.parseFloat(sum), 0);

const cart = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_ITEM_CART': {
			const currentItems = !state.items[action.payload.bot_id]
				? [action.payload]
				: [...state.items[action.payload.bot_id].items, action.payload];


			const newItems = {
				...state.items,
				[action.payload.bot_id]: {
					items: currentItems,
					totalPriceUSD: getTotalPriceUSD(currentItems),
					totalPriceCoins: getTotalPriceCoin(currentItems)
				}
			}

			const items = Object.values(newItems).map(obj => obj.items)
			const allItems = [].concat.apply([], items)
			const totalPriceUSD = getTotalPriceUSD(allItems)
			const totalPriceCoins = getTotalPriceCoin(allItems)

			return {
				...state,
				items: newItems,
				totalCount: allItems.length,
				totalPriceUSD: totalPriceUSD,
				totalPriceCoins: totalPriceCoins
			}
		}

		case 'REMOVE_CART_ITEM': {

			const newItems = {
				...state.items
			}
			const currentTotalPriceUSD = newItems[action.payload].totalPriceUSD
			const currentTotalPriceCoins = newItems[action.payload].totalPriceCoins
			const currentTotalCount = newItems[action.payload].items.length
			delete newItems[action.payload];

			return {
				...state,
				items: newItems,
				totalPriceUSD: state.totalPriceUSD - currentTotalPriceUSD,
				totalPriceCoins: state.totalPriceCoins - currentTotalPriceCoins,
				totalCount: state.totalCount - currentTotalCount,
			};
		}

		case 'CLEAR_CART': {
			return {
					...state,
					totalPriceUSD: 0,
					totalPriceCoins: 0,
					totalCount: 0,
					items: {},
			}
		}

		default:
			return state;
	}
}


export default cart