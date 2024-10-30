import React from 'react';
import { useSpring, animated } from 'react-spring';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={props} className="flex items-center gap-4 py-2 border-b">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 bg-gray-100 rounded"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          className="px-2 py-1 bg-gray-100 rounded"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded"
          onClick={() => onRemoveItem(item.id)}
        >
          Remove
        </button>
      </div>
    </animated.div>
  );
};

export default CartItem;
