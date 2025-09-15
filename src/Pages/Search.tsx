import { useContext, useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { useLocation, Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { useAppSelector } from "../Hooks/storeHook";
import { productsProps } from "../store/CartSlice";

export default function Search() {
  const { products } = useAppSelector(state=>state.cart)
  const [searchResults, setSearchResults] = useState<productsProps[]>([]);
  let location = useLocation();
  const param = new URLSearchParams(location.search);
  const query = param.get("q");
  useEffect(() => {
    window.scrollTo(0,0)
    if (!products) return;
    if(typeof query=="string"){
      setSearchResults(
        products?.filter(
          (product) =>
            product.title?.toLowerCase().includes(query.toLowerCase()) ||
            product.brand?.toLowerCase().includes(query.toLowerCase()) ||
            product.category?.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [location.key]);
  return (
    <div className="min-h-[60dvh] p-5 md:px-10">
      <h1 className="font-bold text-xl">Search results for:{query}</h1>
      {searchResults.length == 0 ? (
        <div className="no-products min-h-[50dvh] w-full flex flex-col justify-center items-center gap-3 text-center">
            <h1 className="text-secondary font-bold text-2xl md:text-4xl">OOPs! 😕</h1>
          <h1 className="text-clack font-bold text-2xl md:text-4xl">
            We couldn't find anything related to your query
          </h1>
        </div>
      ) : (
        <div className="cart-section md:w-3/4 mx-auto min-h-[60dvh] flex flex-wrap gap-5 justify-center">
          {searchResults.map((product) => (
            <Link
              className="max-w-[185px] w-[calc(50%-10px)] sm:w-[calc(33.333%-13.33px)] lg:w-[calc(25%-15px)] xl:w-[calc(20%-16px)]"
              to={`/product/details/${product.id}`}
              key={product.id}
            >
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
