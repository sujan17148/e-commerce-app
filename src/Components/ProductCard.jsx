import { useContext, useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import { ProductsContext } from "../Context/ProductsContext";

export default function ProductCart({ productId }) {
  const { data, error, isLoading } = useContext(ProductsContext);
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (!isLoading && !error) {
      setProduct(data?.products?.find((product) => product.id == productId) || {});
    }
  }, [data, error, isLoading, productId]);

  return (
    <div className="w-full aspect-[12/16] rounded-xl bg-primary hover:scale-105 transition duration-200 ease-linear shadow-[6px_6px_12px_#c5c5c5] p-2 flex flex-col">
      <div className="h-3/5 w-full">
        <img
          src={product.image}
          alt="Product"
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 mt-1">
        <div>
          <p className="title font-semibold text-black text-base leading-5 line-clamp-2">
            {product.title}
          </p>
          <div className="price-details flex gap-2 mt-2">
            <span className="text-sm text-black">${product.price}</span>
            {product.onSale && (
              <span className="text-sm text-red-500 font-medium">On Sale</span>
            )}
            {product.popular && (
              <span className="text-sm text-red-500 font-medium">Popular</span>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="mt-2">
          <AddToCartButton id={productId} />
        </div>
      </div>
    </div>
  );
}
