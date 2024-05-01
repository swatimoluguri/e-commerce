import React, { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };
  return (
    <div>
      <h2>All Products</h2>
      {products.length > 0 ? (
        products.map(product => (
          <h3 key={product.id} className="title">{product.title}</h3>
        ))
      ) : (
        <p>There are no products to display...</p>
      )}
    </div>
  );
}

export default Products;
