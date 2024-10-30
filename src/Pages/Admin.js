import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import ProductTable from '../components/Admin/ProductTable'; 
import Modal from '../components/Admin/Modal'; 
import '../styles.css'; 

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };

    const loadCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    loadProducts();
    loadCategories();
  }, []);

  const handleAddProduct = async (values, { resetForm }) => {
    try {
      await addDoc(collection(db, 'products'), values);
      setProducts((prev) => [...prev, { ...values, id: Date.now() }]); 
      alert('Product added successfully!');
      resetForm();
      setIsModalOpen(false); 
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  const handleEditProduct = async (values) => {
    try {
      const productDoc = doc(db, 'products', editingProduct.id);
      await updateDoc(productDoc, values);
      setProducts((prev) =>
        prev.map((product) => (product.id === editingProduct.id ? { ...values, id: editingProduct.id } : product))
      );
      alert('Product updated successfully!');
      setEditingProduct(null);
      setIsModalOpen(false); 
    } catch (error) {
      console.error('Error updating product: ', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const productDoc = doc(db, 'products', productId);
      await deleteDoc(productDoc);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={openModal}>Add Product</button>
      </div>

      <ProductTable products={products} onEdit={handleEditClick} onDelete={handleDeleteProduct} />

      {/* Reusable Modal for Add/Edit Product */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        onSubmit={(values, { resetForm }) => {
          editingProduct ? handleEditProduct(values) : handleAddProduct(values, { resetForm });
        }}
        initialValues={{
          name: editingProduct ? editingProduct.name : '',
          price: editingProduct ? editingProduct.price : '',
          category: editingProduct ? editingProduct.category : '',
          image: editingProduct ? editingProduct.image : '',
          description: editingProduct ? editingProduct.description : '',
        }}
        categories={categories} // Pass categories here
      />
    </div>
  );
};

export default AdminDashboard;
