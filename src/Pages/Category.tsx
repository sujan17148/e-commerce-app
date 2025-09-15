import { useParams,Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import CategoryCard from "../Components/CategoryCard";
import { useEffect } from "react";
import { type productsProps } from "../store/CartSlice";

export default function Category() {
  useEffect(()=>{
window.scrollTo(0,0)
  },[])
  const { productCategory } = useParams();
  const { data} = useFetch<productsProps[]>(
    `https://dummyjson.com/products/category/${productCategory}`
  );
  return <div className="min-h-[70dvh] p-5 md:px-10">{data?.map(product=><Link to={`/products/details/${product.id}`} key={product.id}><CategoryCard {...product}/></Link>)}</div>;
}
