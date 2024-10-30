import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-200 px-4 py-2">Image</th>
          <th className="border border-gray-200 px-4 py-2">Name</th>
          <th className="border border-gray-200 px-4 py-2">Price</th>
          <th className="border border-gray-200 px-4 py-2">Category</th>
          <th className="border border-gray-200 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="border border-gray-200 px-4 py-2">
              <img src={product.image} alt={product.name} className="h-16 w-16 object-cover" />
            </td>
            <td className="border border-gray-200 px-4 py-2">{product.name}</td>
            <td className="border border-gray-200 px-4 py-2">${product.price}</td>
            <td className="border border-gray-200 px-4 py-2">{product.category}</td>
            <td className="border border-gray-200 px-4 py-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => onEdit(product)}>Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => onDelete(product.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
