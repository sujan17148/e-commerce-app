import { useState,useContext, useEffect } from "react"
import {ProductsContext} from "../Context/ProductsContext"
import useDebounce from "../Hooks/useDebounce"
import { IoSearchSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
export default function SearchBar({}){
    let navigate=useNavigate()
    const [searchValue,setSearchValue]=useState("")
    const [suggestions,setSuggestions]=useState([])
    const {debouncedValue}=useDebounce(searchValue)
    function handleClickSearch(){
      if(debouncedValue.trim()!=""){
        navigate(`/search?q=${searchValue}`);
        setSuggestions([])
        setSearchValue("");
      }
    }
    function handleSearch(e) {
        if (e.key == "Enter" && searchValue.length > 0) {
          navigate(`/search?q=${searchValue}`);
          setSuggestions([])
          setSearchValue("");
        }
      }
    return <div className=" relative min-w-60 shadow-xl sm:shadow-none bg-primary  flex items-center justify-between p-2 focus-within:border-accent  focus-within:border-2 rounded">
    <input
    onKeyDown={(e)=>handleSearch(e)}
      className="w-full outline-none  "
      type="text"
      placeholder="Search Products..."
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
    <IoSearchSharp onClick={handleClickSearch}  className="text-xl text-gray-400 " />

     <ShowSuggestion debouncedValue={debouncedValue} setSearchValue={setSearchValue} suggestions={suggestions} setSuggestions={setSuggestions}/>
    
  </div>
}
function ShowSuggestion({debouncedValue,setSearchValue,suggestions,setSuggestions}){
    const {data,isLoading}=useContext(ProductsContext)
    useEffect(()=>{
      if(!data || !data.products) return;
      if(debouncedValue.trim()!==""){
        const suggestedProducts=data?.products?.filter(product=>product.title.toLowerCase().includes(debouncedValue.toLowerCase())|| product.brand.toLowerCase().includes(debouncedValue.toLowerCase()) || product.category.toLowerCase().includes(debouncedValue.toLowerCase()))
        setSuggestions(suggestedProducts)
      }
      else{
        setSuggestions([])
      }
    },[data,debouncedValue])
    return   <div className={`suggestion absolute z-10 top-11 right-1 w-[95%] rounded-t-xl pt-1 bg-primary  shadow-[6px_6px_12px_#c5c5c5]  ${suggestions.length==0 ? "hidden":""}`}>
           {!isLoading && suggestions?.slice(0,5).map(product=>(<Link  onClick={()=>{
            setSuggestions([])
            setSearchValue("")
           }} key={product.id} to={`/products/details/${product.id}`}>  <p 
                className="p-2 py-1 border-b  border-b-secondary line-clamp-2"
              >
                {product.title}
              </p></Link> ))}
    </div>
}