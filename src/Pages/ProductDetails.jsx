import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import AddToCartButton from "../Components/AddToCartButton"
import Loader from "../Components/Loader"

export default function ProductDetails() {
  const { data, error, isLoading } = useContext(ProductsContext);
  let { productId } = useParams();
  const [product, setProduct] = useState({});
  let [productDiscount,setProductDiscount]=useState(0)
  const [quantity,setQuantity]=useState(1)
  useEffect(() => {
    window.scrollTo(0,0)
    if (!data?.products) return;
    let requiredProduct =
      data.products.find((product) => product.id === Number(productId)) || {};
      setProductDiscount(requiredProduct.discount || 0)
    setProduct(requiredProduct);
  }, [data]);
  return (
    <>
      {isLoading ? <Loader className="h-screen w-screen"/>: !error && (
        <div className="p-5 md:px-10 h-fit ">
          <h1 className="font-bold text-lg md:text-xl my-10">
            Home/Products/Details/{product.title}
          </h1>
          <div className="product-section md:flex py-5 gap-2.5 mx-auto w-[90%]">
            <div className="left-section md:w-1/2 flex items-center justify-center">
            <img src={product.image} alt="product" className="w-full max-w-lg md:max-w-xl" />
            </div>
            <div className="right-section md:w-1/2">
              <h1 className="title font-bold text-lg md:text-xl my-4">
                {product.title}
              </h1>
              <p className="details capitalize text-lg font-medium">
                {product.brand}/{product.category}/{product.model}
              </p>
              <div className="discount-box flex items-center gap-2.5 my-3">
                <span className="discount">
                  ${product.price - productDiscount}
                </span>
                {productDiscount!=0 && <span className="price line-through text-red-600">
                  ${product.price}
                </span>}
               {productDiscount!=0 &&  <span className="discount-percentage custom-button bg-secondary"> {Math.round((product.price-product.discount)/product.price) || 0}% discount</span>}
                {product.onSale && <span className=" font-semibold text-red-500 ">On Sale</span> }
                 {product.popular && <span className=" font-semibold text-red-500 ">Popular</span> }
              </div>
              <p className="description text-gray-600">{product.description}</p>
                <div className="cart mt-3 mb-5 space-x-2">
                  <span>Quantity:</span>
                  <input type="number" value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))} className="outline-none bg-secondary text-primary px-2 text-center py-2 rounded max-w-16 "/>
                </div>
                <AddToCartButton  id={product.id} quantity={quantity} className="py-3  inline-block w-44"/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
