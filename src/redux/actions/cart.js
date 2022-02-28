export const addItemCart = (payload) => ({
	type: 'ADD_ITEM_CART',
	payload: payload,
})


export const clearCart = () => ({
	type: 'CLEAR_CART',
})


export const removeCartItem = (id) => ({
	type: 'REMOVE_CART_ITEM',
	payload: id,
})

