import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import ProductCard from "../Components/ProductCard";
import { useLocation, Link } from "react-router-dom";
import Loader from "../Components/Loader";

export default function Search() {
  const { data, isLoading } = useContext(ProductsContext);
  const [searchResults, setSearchResults] = useState([]);
  let location = useLocation();
  const param = new URLSearchParams(location.search);
  const query = param.get("q");
  useEffect(() => {
    if (!data || !data.products) return;
    setSearchResults(
      data?.products?.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
    );
  }, [data, location.key]);
  return (
    <div className="min-h-[60dvh] p-5 md:px-10">
      <h1 className="font-bold text-xl">Search results for:{query}</h1>
      {isLoading ? (
        <Loader />
      ) : searchResults.length == 0 ? (
        <div className="no-products min-h-[50dvh] w-full flex flex-col justify-center items-center gap-3">
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
              <ProductCard productId={product.id} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
