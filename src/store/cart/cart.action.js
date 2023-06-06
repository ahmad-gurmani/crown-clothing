import { CART_ACTION_TYPES } from "./cart.type";
import createAction from '../../utils/reducer/reducer.utils';


// add cartItems 1st helper function
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};


//remove cartItems 2nd helper function
const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart items to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    )
}


// clear cart item 3rd helper function 
const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);


export const addItemToCart = (cartItems, productToAdd) => {
    const newcartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newcartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newcartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newcartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newcartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newcartItems);
}