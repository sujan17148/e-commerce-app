import {useState,useEffect, SetStateAction} from "react"
import useDebounce from "../Hooks/useDebounce";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { useAppSelector } from "../Hooks/storeHook";
import { productsProps } from "../store/CartSlice";

export default function FilterProducts({ setFilteredProduct,className,setCurrentPage}:{setFilteredProduct:React.Dispatch<React.SetStateAction<productsProps[]>>,className:string,setCurrentPage:React.Dispatch<SetStateAction<number>>}) {
  const { products, error, loading } = useAppSelector(state=>state.cart);
  //search section
  const [searchValue, setSearchValue] = useState("");
  const { debouncedValue } = useDebounce(searchValue);
  //category section
  const [selectedcategory, setSelectedCategory] = useState("all");
  //brands
  const [selectedBrand, setSelectedBrand] = useState("all");

  //pricerange
  const [rangeValue, setRangeValue] = useState(37000);

  //filtering products
  useEffect(() => {
    if (!products) return;
    let tempFilteredProducts=products
    tempFilteredProducts = tempFilteredProducts.filter(
      (product) => product.price <= rangeValue
    );
    if (selectedcategory !== "all") {
      tempFilteredProducts = tempFilteredProducts.filter(
        (product) => product.category === selectedcategory
      );
    }
    if (selectedBrand !== "all") {
      tempFilteredProducts = tempFilteredProducts.filter(
        (product) => product.brand === selectedBrand
      );
    }
    if (debouncedValue.trim() !== "") {
      const search = debouncedValue.trim().toLowerCase();
      tempFilteredProducts = tempFilteredProducts.filter(
        (product) =>
          product.title?.toLowerCase().includes(search) ||
          product.category?.toLowerCase().includes(search) ||
          product.brand?.toLowerCase().includes(search)
      );
    }
    setFilteredProduct(() => {
      setCurrentPage(1);
      return tempFilteredProducts;
    });
  }, [products, rangeValue, selectedBrand, selectedcategory, debouncedValue]);

  function handleReset(e:React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setRangeValue(37000);
    setSelectedBrand("all");
    setSelectedCategory("all");
    setSearchValue("")
  }
  return (
    <>
      {!loading && !error && (
        <div
          className={`${className} filter-section  min-h-[40dvh] h-fit rounded text-black bg-[#EEF0F1] sm:w-62 p-3`}
        >
          <p className="font-bold mb-2">Filter</p>
          <SearchBar searchValue={ searchValue} setSearchValue={ setSearchValue } />
          <Category
            selectedcategory={ selectedcategory} setSelectedCategory={ setSelectedCategory }
          />
          <BrandsDropDown
            products={products}
            selectedBrand={ selectedBrand} setSelectedBrand={ setSelectedBrand }
          />
          <PriceRange rangeValue={ rangeValue} setRangeValue= { setRangeValue } />
          <button
            onClick={handleReset}
            className="bg-accent px-3 py-2 w-2/3 font-bold text-lg text-primary rounded hover:scale-105 transition duration-200 ease-linear mt-5"
          >
            Reset
          </button>
        </div>
      )}
    </>
  );
}

 function SearchBar({ searchValue,setSearchValue }:{searchValue:string,setSearchValue:React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <div className="flex items-center justify-between p-2 focus-within:border-accent  focus-within:border-2 rounded">
      <input
        className="w-full outline-none  "
        type="text"
        placeholder="Search Products..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <IoSearchSharp className="text-xl text-gray-400 " />
    </div>
  );
}
function Category({selectedcategory,setSelectedCategory }:{selectedcategory:string,setSelectedCategory:React.Dispatch<SetStateAction<string>>}) { 
const categoryList=useAppSelector(state=>state.cart.categoryList)
  return (
    <div className="w-full">
      <p className="my-2 font-bold">Categories</p>
      <div className="flex items-center">
        <input
          type="radio"
          name={`category`}
          id="all"
          value="all"
          checked={selectedcategory ==="all"}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mr-2  appearance-none h-3 w-3 ring-secondary checked:bg-secondary  ring-2 rounded-full"
        />
        <label className="capitalize" htmlFor="all">
          all
        </label>
      </div>

      {/* //rendering categoryies  */}
      {categoryList.slice(0,15).map((category, index) => (
        <div key={index} className="flex items-center">
          <input
            type="radio"
            name={`category`}
            id={category}
            value={category}
            checked={selectedcategory === category}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mr-2 appearance-none h-3 w-3 ring-secondary checked:bg-secondary  ring-2 rounded-full"
          />
          <label className="capitalize" htmlFor={category}>
            {category}
          </label>
        </div>
      ))}
    </div>
  );
}

function BrandsDropDown({ products,selectedBrand, setSelectedBrand}:{products:productsProps[],selectedBrand:string,setSelectedBrand:React.Dispatch<SetStateAction<string>>}) {
  const brands = [...new Set(products.map((product) => product.brand))];
  return (
    <div className="brands mt-5">
      <p className="font-bold my-2">Brands</p>
      <div className="options relative ">
        <IoIosArrowDown className="absolute text-xl text-primary  top-3 right-2" />
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="inline-block bg-secondary text-primary font-semibold outline-none w-full p-2 appearance-none rounded"
        >
          <option value="all">All</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand} className="capitalize">
              {brand}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function PriceRange({ rangeValue,setRangeValue}:{rangeValue:number,setRangeValue:React.Dispatch<SetStateAction<number>>}) {
  return (
    <div className="price-range mt-7">
      <p className="font-bold my-2">Price Range</p>
      <p className="text-base">Price Range:$0-${rangeValue}</p>
      <input
        type="range"
        min="0"
        max="37000"
        value={rangeValue}
        onChange={(e) => setRangeValue(Number(e.target.value))}
        className="appearance-none bg-secondary rounded-xl w-full h-2 outline-none accent-accent"
      />
    </div>
  );
}