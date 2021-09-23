const initialState = {
    cart: [],
    cartCount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'REMOVE_CART':
            return {
                ...state,
                cartCount : state.cartCount - action.payload.count,
                cart: state.cart.filter((item) => item.name !== action.payload.name)
            };
        case 'ADD_CART':
            const inCart = state.cart.find((item) =>
                item.name === action.payload.name ? true : false
            );
            return { ...state, 
                cartCount: state.cartCount + 1,
                cart: inCart
                    ? state.cart.map((item) =>
                        item.name === action.payload.name
                        ? { ...item, count: item.count + 1 }
                        : item
                    ) 
                    : [...state.cart, { ...action.payload, count: 1 }],
            };
        default:
            return state;
    }
}