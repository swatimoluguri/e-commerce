import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductView = () => {
  const productId = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = (productId) => {
    fetch("http://localhost:3000/products/" + productId.productId)
      .then((res) => res.json())
      .then((result) => {
        setProduct(result);
      })
      .catch((err) => console.log("Error fetching product:", err));
  };

  return (
    <div className="flex">
      <div>
        <img
          className="object-contain w-full h-full rounded-3xl"
          src={product.image}
          alt={product._id}
        />
      </div>
      <div className="flex flex-col">
        <p>{product.category}</p>
        <div className="flex items-center">
        <h1>{product.title}</h1>
        <div className="mx-4 rounded-full border border-green-500 text-green-500 bg-green-50 px-2 py-1">In Stock</div>
        </div>
        
      </div>
    </div>
  );
};
export default ProductView;
