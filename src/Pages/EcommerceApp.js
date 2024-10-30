import React, { Suspense } from 'react';
import ProductCard from '../components/Products/ProductCard';
import ShoppingCart from '../components/Cart/ShoppingCart';
import FilterBar from '../components/Products/FilterBar';
import { useProducts } from '../utils/useProducts';
import { useRecoilState } from 'recoil';
import { cartItemsState } from '../atoms/cartState';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { notify } from '../components/General/Notification';

const EcommerceApp = () => {

  const { data: products } = useProducts();
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const dispatch = useDispatch();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const onAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let updatedItems;
      if (existingItem) {
        notify('Item quantity increased in cart!');
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      notify('Item added to cart!');
      updatedItems = [...prevItems, { ...product, quantity: 1 }];
      // Dispatch the action to Redux
      dispatch(addToCart(product));
      return updatedItems;

    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Catalog</h1>
      <FilterBar
        categories={['All', ...new Set(products.map((product) => product.category))]}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
        <ShoppingCart />
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EcommerceApp />
  </Suspense>
);

export default AppWrapper;
