import AvailableStock from '../helpers/AvailableStock';

const cartReducer = async (state, action) => {
    if (action.type === "ADD_TO_CART") {
        let { productId, color, size, amount, price } = action.payload;

        // Fetch maximum quantity available for the product with specified color and size
        const maxStock = await AvailableStock({ productId, color, size });

        let existingProduct = state.cart?.find(
            (curItem) => curItem.id === productId + color + size
        );

        if (existingProduct) {
            let updatedProduct = state.cart.map((curElem) => {
                if (curElem.id === productId + color + size) {
                    let newAmount = curElem.amount + amount;

                    if (newAmount >= maxStock) {
                        newAmount = maxStock;
                    }
                    return {
                        ...curElem,
                        amount: newAmount,
                    };
                } else {
                    return curElem;
                }
            });
            return {
                ...state,
                cart: updatedProduct,
            };
        } else {
            let cartProduct = {
                id: productId + color + size,
                color,
                size,
                amount,
                price,
                max: maxStock
            };

            return {
                ...state,
                cart: [...state.cart, cartProduct],
            };
        }
    }

    // to set the increment and decrement
    if (action.type === "SET_DECREMENT") {
        let updatedProduct = state.cart.map((curElem) => {
            if (curElem.id === action.payload) {
                let decAmount = curElem.amount - 1;

                if (decAmount <= 1) {
                    decAmount = 1;
                }

                return {
                    ...curElem,
                    amount: decAmount,
                };
            } else {
                return curElem;
            }
        });
        return { ...state, cart: updatedProduct };
    }

    if (action.type === "SET_INCREMENT") {
        let { productId, color, size } = action.payload;
        // Fetch maximum quantity available for the product with specified color and size
        const maxStock = await AvailableStock({ productId, color, size });

        let updatedProduct = state.cart.map((curElem) => {
            if (curElem.id === productId) {
                let incAmount = curElem.amount + 1;

                if (incAmount >= maxStock) {
                    incAmount = maxStock;
                }

                return {
                    ...curElem,
                    amount: incAmount,
                };
            } else {
                return curElem;
            }
        });
        return { ...state, cart: updatedProduct };
    }

    if (action.type === "REMOVE_ITEM") {
        let updatedCart = state.cart.filter(
            (curItem) => curItem.id !== action.payload
        );
        return {
            ...state,
            cart: updatedCart,
        };
    }

    // to empty or to clear to cart
    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            cart: [],
        };
    }

    // if (action.type === "CART_TOTAL_ITEM") {
    //   let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
    //     let { amount } = curElem;

    //     initialVal = initialVal + amount;
    //     return initialVal;
    //   }, 0);

    //   return {
    //     ...state,
    //     total_item: updatedItemVal,
    //   };
    // }

    // if (action.type === "CART_TOTAL_PRICE") {
    //   let total_price = state.cart.reduce((initialVal, curElem) => {
    //     let { price, amount } = curElem;

    //     initialVal = initialVal + price * amount;

    //     return initialVal;
    //   }, 0);

    //   return {
    //     ...state,
    //     total_price,
    //   };
    // } 

    // if (action.type === "CART_ITEM_PRICE_TOTAL") {
    //     let { total_item, total_price } = state.cart.reduce(
    //         (accum, curElem) => {
    //             let { price, amount } = curElem;

    //             accum.total_item += amount;
    //             accum.total_price += price * amount;

    //             return accum;
    //         },
    //         {
    //             total_item: 0,
    //             total_price: 0,
    //         }
    //     );
    //     return {
    //         ...state,
    //         total_item,
    //         total_price,
    //     };
    // }

    return state;
};

export default cartReducer;
