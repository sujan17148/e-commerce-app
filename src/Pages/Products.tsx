import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader"
import FilterProducts from "../Components/FilterProduct";
import ProductCard from "../Components/ProductCard";
import Pagination from "../Components/Pagination";
import { FaFilter } from "react-icons/fa";
import { useAppSelector } from "../Hooks/storeHook";
export default function Products() {
  const { products} = useAppSelector(state=>state.cart)
  const [filteredProduct, setFilteredProduct] = useState(products);
  const [isMobileFilterVisible,setIsMobileFilterVisible]=useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [lastpage,setlastpage]=useState(1)
  useEffect(()=>{
    setlastpage(Math.ceil(filteredProduct?.length / 21))
  },[filteredProduct])

  return (
    <>
      <div className="Products sm:flex justify-center p-5 lg:px-10 gap-10 ">
      <div className="top-section flex justify-between items-center sm:hidden py-3 text-xl">
             <p className="font-bold ">Products</p>
             <FaFilter onClick={()=>setIsMobileFilterVisible(prev=>!prev)} className="hover:bg-accent hover:text-primary h-10 w-10 px-2 flex items-center justify-center rounded-full"/>
           </div>
        <FilterProducts
           setFilteredProduct={setFilteredProduct}
          setCurrentPage={setCurrentPage}
          className={`sm:inline-block ${isMobileFilterVisible? "" :"hidden"} `}
        />
        <div className="cards-secton min-h-[70dvh] flex flex-wrap justify-center sm:justify-start  gap-2.5  sm:w-3/4">
          {filteredProduct?.length == 0 ? (
            <div className="min-h-[60dvh] w-full flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-2xl sm:text-4xl font-bold text-secondary">No Products Found 😕</h2>
            <p className="text-gray-600 font-medium mt-2 mb-4 text-center">
              We couldn’t find any products matching your filters.
            </p>
          </div>
          ) : (
           <div className="grid  gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-7">
            {filteredProduct
              ?.slice(currentPage * 21 - 21, currentPage * 21)
              .map((product) => (
                <Link
                  className="custom-flexible-cards"
                  to={`/products/details/${product.id}`}
                  key={product.id}
                >
                  <ProductCard
                    {...product}
                  />
                </Link>
              ))}
           </div>
           
          )}
          {<Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lastPage={lastpage}
          />}
        </div>
      </div>
    </>
  );
}

