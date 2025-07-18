import { useParams,Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import CategoryCard from "../Components/CategoryCard";
import { useEffect } from "react";

export default function Category() {
  useEffect(()=>{
window.scrollTo(0,0)
  },[])
  const { productCategory } = useParams();
  const { data, error, isLoading } = useFetch(
    `https://fakestoreapi.in/api/products/category?type=${productCategory}`
  );
  return <div className="min-h-[70dvh] p-5 md:px-10">{!isLoading && !error && data?.products?.map(product=><Link to={`/products/details/${product.id}`} key={product.id}><CategoryCard details={product}/></Link>)}</div>;
}
