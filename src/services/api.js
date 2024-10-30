export const fetchProducts = async () => {
    return [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        category: "Electronics",
        image: "https://picsum.photos/id/13/2500/1667",
        description: "High-quality wireless headphones with noise cancellation"
      },
      {
        id: 2,
        name: "Cotton T-Shirt",
        price: 24.99,
        category: "Clothing",
        image: "https://picsum.photos/id/20/3670/2462",
        description: "Comfortable cotton t-shirt available in multiple colors"
      },
      {
        id: 3,
        name: "Smart Watch",
        price: 199.99,
        category: "Electronics",
        image: "https://picsum.photos/id/26/4209/2769",
        description: "Feature-rich smartwatch with health tracking"
      }
    ];
  };
  
  export const fetchCategories = async () => {
    const products = await fetchProducts();
    const uniqueCategories = ["All", ...new Set(products.map((product) => product.category))];
    return uniqueCategories;
  };