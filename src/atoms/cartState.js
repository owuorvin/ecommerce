import { atom, selector } from 'recoil';

export const cartItemsState = atom({
  key: 'cartItemsState',
  default: [],
});

export const cartTotalState = selector({
  key: 'cartTotalState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },
});
