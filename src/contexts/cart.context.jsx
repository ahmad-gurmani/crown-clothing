import { createContext, useReducer } from 'react';

import createAction from '../utils/reducer/reducer.utils.js';

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemToCart: () => { },
  clearItemFromCart: () => { },
  cartCount: 0,
  cartTotal: 0
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandeled type of ${type} in cartReducer`)
  }

}

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newcartItems) => {
    // generate newCartCount
    const newCartCount = newcartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

    // generate newCartTotal
    const newCartTotal = newcartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

    // dispatch new action with payload = { newCartItems, newCartTotal, newCartCount }
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newcartItems, cartCount: newCartCount, cartTotal: newCartTotal }));
  };

  const addItemToCart = (productToAdd) => {
    const newcartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newcartItems);
  }

  const removeItemToCart = (cartItemToRemove) => {
    const newcartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newcartItems);
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newcartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newcartItems);
  }

  const setIsCartOpen = (bool) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartCount,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
