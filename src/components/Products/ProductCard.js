
  const ProductCard = ({ product, onAddToCart }) => {
    return (
      <div className="flex flex-col bg-white rounded-lg shadow p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <div className="mt-2">
          <span className="inline-block bg-gray-100 rounded px-3 py-1 text-sm text-gray-700">
            {product.category}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{product.description}</p>
        <button
          className="mt-4 w-full bg-blue-500 text-white font-medium p-2 rounded hover:bg-blue-600"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    );
  };
  export default ProductCard;