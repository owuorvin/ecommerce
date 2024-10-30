import { useRecoilState, useRecoilValue } from 'recoil';
import { cartItemsState, cartTotalState } from '../../atoms/cartState';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from './CartItem';
import { notify, notifyErr } from '../General/Notification';
import '../../Cart.css'; // Ensure your CSS file is imported

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const persistedCartItems = useSelector((state) => state.cart.items);

  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const total = useRecoilValue(cartTotalState);

  // Set initial state if Recoil's cartItems are empty but Redux has persisted data
  if (cartItems.length === 0 && persistedCartItems.length > 0) {
    setCartItems(persistedCartItems);
  }

  const updateQuantity = (productId, quantity) => {
    setCartItems((items) =>
      items.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
    notify('Item quantity updated in cart!');
    dispatch({ type: 'cart/updateQuantity', payload: { productId, quantity } });
  };

  const removeItem = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
    notifyErr('Item quantity removed from cart!');
    dispatch({ type: 'cart/removeItem', payload: productId });
  };

  const handleClearCart = () => {
    setCartItems([]);
    dispatch({ type: 'cart/clearCart' });
    notify('Cart cleared!');
  };

  return (
    <div className="cart-container bg-white rounded-lg shadow p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <CartItem
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="mt-4 text-right">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Clear Cart
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
